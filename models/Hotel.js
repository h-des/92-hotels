const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate');

const hotelSchema = new Schema({
  name: String,
  city: { type: String, trim: true },
  stars: Number,
  image: String,
  description: String,
  interiorPhotos: [String],
  roomTypes: [Number],
  roomList: [
    {
      type: ObjectId,
      ref: 'rooms'
    }
  ],
  reviews: [
    {
      type: ObjectId,
      ref: 'reviews'
    }
  ],
  rating: {
    type: Number,
    default: 0
  }
});
hotelSchema.plugin(mongoosePaginate);
mongoose.model('hotels', hotelSchema);
