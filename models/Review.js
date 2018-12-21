const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  body: String,
  rate: {
    type: Number,
    min: 0,
    max: 5
  },
  user: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  hotel: {
    type: ObjectId,
    ref: 'Hotel'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('reviews', reviewSchema);
