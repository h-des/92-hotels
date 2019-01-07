const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const bookingSchema = new Schema({
  from: Date,
  to: Date,
  room: {
    type: ObjectId,
    ref: 'rooms'
  },
  user: {
    type: ObjectId,
    ref: 'users'
  }
});

mongoose.model('bookings', bookingSchema);
