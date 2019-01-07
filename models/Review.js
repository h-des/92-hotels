const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  body: { type: String, required: true },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  hotel: {
    required: true,
    type: ObjectId,
    ref: 'hotels'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('reviews', reviewSchema);
