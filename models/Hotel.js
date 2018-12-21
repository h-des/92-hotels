const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const hotelSchema = new Schema({
  name: String,
  city: { type: String, trim: true },
  stars: Number,
  image: String,
  roomTypes: [Number],
  roomList: [
    {
      type: ObjectId,
      ref: 'Room'
    }
  ],
  reviews: [
    {
      type: ObjectId,
      ref: 'Review'
    }
  ],
  rating: {
    type: Number,
    default: 0
  }
});

mongoose.model('hotels', hotelSchema);
