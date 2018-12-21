const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true
  },
  password: String,
  createdAt: Date,
  phone: String,
  city: String,
  zipCode: String,
  address: String,
  firstName: String,
  lastName: String,
  reviews: [
    {
      type: ObjectId,
      ref: 'review'
    }
  ],
  avatar: {
    small: String,
    medium: String,
    large: String
  }
});

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('users', userSchema);
