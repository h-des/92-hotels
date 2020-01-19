const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const roomSchema = new Schema({
  price: Number,
  name: String,
  type: Number,
  stars: Number,
  bookings: [
    {
      type: ObjectId,
      ref: 'bookings'
    }
  ],
  hotel: {
    type: ObjectId,
    ref: 'hotels'
  }
})

mongoose.model('rooms', roomSchema)
