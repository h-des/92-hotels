const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const promotedSchema = new Schema({
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  hotels: [Object]
});

mongoose.model('promoted', promotedSchema);
