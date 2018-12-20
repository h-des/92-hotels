const mongoose = require('mongoose');
const Schema = mongoose.Schema.toString;
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new Schema({
  price: Number,
  name: String,
  type: Number,
  stars: Number,
  photos: [String],
  bookings: [
    {
      type: ObjectId,
      ref: 'Booking'
    }
  ],
  hotelID: {
    type: ObjectId,
    ref: 'Hotel'
  }
});

mongoose.model('rooms', roomSchema);
