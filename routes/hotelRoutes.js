const mongoose = require('mongoose');
const Hotel = mongoose.model('hotels');
const Promoted = mongoose.model('promoted');
const pick = require('object.pick');
const omit = require('object.omit');
const checkAvailability = require('../utils/checkAvailability');

module.exports = app => {
  //return details about specific hotel
  app.get('/api/hotel/:id', async (req, res) => {
    const { id } = req.params;

    Hotel.findById(id)
      .lean()
      .exec((err, hotel) => {
        if (err) {
          return res.status(400).send({ error: 'Hotel does not exist.' });
        }
        //calculate rating
        const rating = calcHotelRating(hotel);
        res.send({ ...hotel, reviews: hotel.reviews.splice(0, 10), rating });
      });
  });

  //return list of 10 hotels without filtering
  app.get('/api/hotel/', async (req, res) => {
    const { page } = req.query;
    const result = await Hotel.paginate(
      {},
      {
        page,
        lean: true,
        limit: 10
      }
    );

    //format output data
    let hotels = result.docs;
    hotels = hotels.map(hotel => {
      const rating = calcHotelRating(hotel);
      return { ...pick(hotel, ['name', 'city', 'stars', 'image']), rating };
    });

    res.send({ ...result, docs: hotels });
  });

  //return list of hotels, apply filtering
  app.post('/api/hotel/', async (req, res) => {
    const { city, roomType, from, to, page } = req.body;
    if (!city || !from || !to || !roomType) {
      return res.status(400).send({ error: 'Missing parameters' });
    }

    const result = await Hotel.paginate(
      {
        city: city,
        roomTypes: roomType
      },
      {
        page,
        lean: true,
        limit: 10
      }
    );
    let hotels = result.docs;

    //filter unavailable hotels
    hotels = hotels.filter(
      async hotel => await checkAvailability(hotel, from, to, roomType)
    );

    //format output data
    hotels = hotels.map(hotel => {
      const rating = calcHotelRating(hotel);
      return { ...pick(hotel, ['name', 'city', 'stars', 'image']), rating };
    });

    res.send({ ...result, docs: hotels });
  });

  app.get('/api/hotel/availability/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, roomType } = req.query;
    if (!id || !from || !to || !roomType) {
      return res.status(400).send({ error: 'Missing parameters' });
    }

    const hotel = await Hotel.findById(id);
    const availableRoom = await checkAvailability(hotel, from, to, roomType);
    if (availableRoom) {
      return res.send('Available');
    }

    //none of rooms is available
    res.status('400').send({ error: 'Room not available' });
  });

  app.get('/api/promoted/', async (req, res) => {
    const promoted = await Promoted.findOne({});

    if (!promoted) {
      let newPromoted = new Promoted();
      newPromoted.hotels = await getBestHotels(4);
      try {
        await newPromoted.save();
        return res.send(newPromoted.hotels);
      } catch (err) {
        return res.status(400).send({ error: 'Cannot get promoted hotels.' });
      }
    }

    //update promoted list if the old one is older than 6 hours
    const lastUpdate = (new Date() - promoted.updatedAt) / (60 * 60 * 1000);
    if (lastUpdate < 6) {
      return res.send(promoted.hotels);
    }

    promoted.hotels = await getBestHotels(4);
    promoted.updatedAt = new Date();

    try {
      await promoted.save();
      res.send(promoted.hotels);
    } catch (err) {
      return res.status(400).send({ error: 'Cannot get promoted hotels.' });
    }
  });
};

const calcHotelRating = hotel => {
  const len = hotel.reviews.length;
  const rating = Math.floor((hotel.rating / len) * 10) / 10;
  return rating;
};

const getBestHotels = async len => {
  let hotels = await Hotel.find({}).lean();
  hotels = hotels.map(hotel => {
    const rating = calcHotelRating(hotel);
    return {
      ...omit(hotel, ['roomList', 'reviews', 'roomTypes']),
      rating,
      reviewsCount: hotel.reviews.length
    };
  });
  hotels = hotels.sort((a, b) => b.rating - a.rating);
  hotels = hotels.slice(0, len);
  return hotels;
};
