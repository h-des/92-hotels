const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate');

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
hotelSchema.plugin(mongoosePaginate);
mongoose.model('hotels', hotelSchema);
