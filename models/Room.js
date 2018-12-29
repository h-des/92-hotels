const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new Schema({
  price: Number,
  name: String,
  type: Number,
  stars: Number,
  bookings: [
    {
      type: ObjectId,
      ref: 'Booking'
    }
  ],
  hotel: {
    type: ObjectId,
    ref: 'Hotel'
  }
});

mongoose.model('rooms', roomSchema);
