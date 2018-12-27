const mongoose = require('mongoose');
const Hotel = mongoose.model('hotels');
const pick = require('object.pick');
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
};

const calcHotelRating = hotel => {
  const len = hotel.reviews.length;
  const rating = Math.floor((hotel.rating / len) * 10) / 10;
  return rating;
};
