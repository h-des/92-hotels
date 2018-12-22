const mongoose = require('mongoose');
const User = mongoose.model('users');
const Booking = mongoose.model('bookings');
const Hotel = mongoose.model('hotels');
const Room = mongoose.model('rooms');
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

  app.post('/api/hotel/', async (req, res) => {
    const filters = { ...req.body };

    const result = await Hotel.paginate(filters, {
      lean: true,
      page: 1,
      limit: 10
    });
    let hotels = result.docs;
    hotels = hotels.map(hotel => {
      const len = hotel.reviews.length;
      const rating = Math.floor((hotel.rating / len) * 10) / 10;
      return { ...pick(hotel, ['name', 'city', 'stars', 'image']), rating };
    });
    res.send(hotels);
  });

  app.get('/api/hotel/availability/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, roomType } = req.query;
    if (!id || !from || !to || !roomType) {
      return res.status(400).send({ error: 'Missing parameters' });
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const hotel = await Hotel.findById(id);
    const roomIDsList = hotel.roomList;

    let roomList = await Room.find({
      _id: { $in: roomIDsList },
      type: parseInt(roomType)
    });

    for (let room of roomList) {
      //find all bookings colliding with dates from query
      const bookingsList = await Booking.findOne({
        _id: { $in: room.bookingsList },
        $and: [{ from: { $gte: fromDate } }, { from: { $lt: toDate } }],
        $and: [{ to: { $lte: toDate } }, { to: { $gt: fromDate } }]
      });

      //if no colliding bookings are found, room is availible
      if (!bookingsList) {
        return res.send('Availible');
      }

      //otherwise check next room
    }

    //none of rooms is available
    res.status('400').send({ error: 'Room not available' });
  });
};
