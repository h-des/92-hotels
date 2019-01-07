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
          return res.status(400).send('Hotel does not exist.');
        }
        //calculate rating
        const rating = calcHotelRating(hotel);
        res.send({ ...hotel, reviews: hotel.reviews.splice(0, 10), rating });
      });
  });

  //return list of 10 hotels
  app.get('/api/hotel/', async (req, res) => {
    const { page, city, from, to, roomType } = req.query;
    let hotels;

    if (city && from && to && roomType) {
      // full filtering
      // use city, from, to, roomType
      result = await Hotel.paginate(
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
      //filter unavailable hotels
      hotels = result.docs.filter(
        async hotel => await checkAvailability(hotel, from, to, roomType)
      );
    } else {
      // no filtering or filtering by city
      const query = { ...(city && { city }) };
      result = await Hotel.paginate(query, {
        page,
        lean: true,
        limit: 10
      });
      hotels = result.docs;
    }

    //format output data
    hotels = hotels.map(hotel => {
      const rating = calcHotelRating(hotel);
      return {
        ...pick(hotel, ['_id', 'name', 'city', 'stars', 'image']),
        rating
      };
    });
    if (hotels.length < 1) {
      res.status(400).send('Hotels not found!');
    }

    res.send({ ...result, docs: hotels });
  });

  app.get('/api/hotel/availability/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, roomType } = req.query;
    if (!id || !from || !to || !roomType) {
      return res.status(400).send('Missing parameters');
    }

    const hotel = await Hotel.findById(id);
    const availableRoom = await checkAvailability(hotel, from, to, roomType);
    if (availableRoom) {
      return res.send({ from, to, roomType, id, price: availableRoom.price });
    }

    //not available
    res.status('400').send('Room not available');
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
        return res.status(400).send('Cannot get promoted hotels.');
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
      return res.status(400).send('Cannot get promoted hotels.');
    }
  });

  app.get('/api/cities/', async (req, res) => {
    const hotels = await Hotel.find({}, { city: true }, { lean: true });
    res.send(hotels);
  });

  app.get('/api/city', async (req, res) => {
    const { hotel } = req.query;
    const result = await Hotel.findById(hotel).lean();
    if (!result) {
      res.status(400).send('Cannot find city name.');
    }
    res.send({ city: result.city, hotel: result.name });
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
      ...omit(hotel, ['roomList', 'reviews', 'roomTypes', 'interiorPhotos']),
      rating,
      reviewsCount: hotel.reviews.length
    };
  });
  hotels = hotels.sort((a, b) => b.rating - a.rating);
  hotels = hotels.slice(0, len);
  return hotels;
};
