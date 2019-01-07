const mongoose = require('mongoose');
const omit = require('object.omit');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Hotel = mongoose.model('hotels');
const Review = mongoose.model('reviews');

module.exports = app => {
  app.post('/api/review/add', requireLogin, async (req, res) => {
    const { _id, reviews } = req.user;
    const { body, hotel, rate } = req.body;

    //check wheter user already reviewed this hotel
    if (reviews.find(val => val == hotel)) {
      return res.status(400).send('You have already reviewed this hotel.');
    }

    //otherwise create review
    let review = new Review();
    review.body = body;
    review.hotel = hotel;
    review.rate = rate;
    review.user = _id;

    try {
      await review.save();
      await Hotel.findByIdAndUpdate(_id, {
        $addToSet: { reviews: review._id },
        $inc: { rating: rate }
      });

      await User.findByIdAndUpdate(_id, { $addToSet: { reviews: review._id } });
      res.send({ message: 'Review successfully created.' });
    } catch (err) {
      res.status(400).send('Cannot add review.');
    }
  });

  app.get('/api/review/', async (req, res) => {
    //return 10 reviews for a specific hotel
    const { hotel, id: _id } = req.query;

    query = {
      ...(hotel && { hotel }),
      ...(_id && { _id })
    };
    let result;
    if (_id) {
      result = await Review.findOne(query, {}, { lean: true, limit: 10 });
    } else {
      result = await Review.find(query, {}, { lean: true, limit: 10 });
    }

    if (!result || result.length < 1) {
      return res.status(400).send('Cannot find reviews.');
    }
    res.send(result);
  });
};
