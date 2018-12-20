const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookingSchema = new Schema({
  from: Date,
  to: Date,
  room: {
    type: ObjectId,
    ref: 'Room'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

mongoose.model('bookings', bookingSchema);
