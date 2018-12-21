const mongoose = require('mongoose');
const User = mongoose.model('users');
const Hotel = mongoose.model('hotels');
const omit = require('object.omit');
const pick = require('object.pick');

module.exports = app => {
  app.get('/api/hotel/:id', async (req, res) => {
    const { id } = req.params;

    Hotel.findById(id)
      .lean()
      .exec((err, hotel) => {
        if (err) {
          return res.status(400).send({ error: 'Hotel does not exist.' });
        }
        //calculate rating
        const len = hotel.reviews.length;
        const rating = Math.floor((hotel.rating / len) * 10) / 10;
        res.send({ ...hotel, reviews: hotel.reviews.splice(0, 10), rating });
      });
  });

  app.get('/api/hotel/', async (req, res) => {
    const result = await Hotel.paginate({}, { lean: true, page: 1, limit: 10 });
    let hotels = result.docs;
    hotels = hotels.map(hotel => {
      const len = hotel.reviews.length;
      const rating = Math.floor((hotel.rating / len) * 10) / 10;
      return { ...pick(hotel, ['name', 'city', 'stars', 'image']), rating };
    });
    res.send(hotels);
  });
};
