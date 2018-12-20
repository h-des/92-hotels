const mongoose = require('mongoose');
const keys = require('../config/keys');
const faker = require('faker');
require('../models/User');
require('../models/Hotel');
require('../models/Bookings');
require('../models/Room');
require('../models/Review');
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const User = mongoose.model('users');
const Hotel = mongoose.model('hotels');
const axios = require('axios');

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const populateUsers = async () => {
  const profiles = await axios
    .get('https://randomuser.me/api/?results=10')
    .then(res => res.data.results);

  await profiles.forEach(async profile => {
    let user = new User();

    user.email = profile.email;
    user.password = user.generateHash('password');
    user.firstName = capitalizeFirstLetter(profile.name.first);
    user.lastName = capitalizeFirstLetter(profile.name.last);
    user.city = capitalizeFirstLetter(profile.location.city);
    user.zipcode = profile.location.postcode;
    user.address = profile.location.street;
    user.createdAt = profile.registered.date;
    user.avatar.small = profile.picture.thumbnail;
    user.avatar.medium = profile.picture.medium;
    user.avatar.large = profile.picture.large;
    user.phone = profile.phone;

    try {
      await user.save();
      console.log(profile.name.first, '--> Success');
    } catch (err) {
      console.log(profile.name.first, err);
    }
  });
};

const populateHotels = async () => {
  const cities = [
    'Hong Kong',
    'New York',
    'Dubai',
    'Shanghai',
    'Tokyo',
    'Chichago',
    'Singapore',
    'Seoul',
    'Bangkok',
    'Toronto',
    'Wuhan',
    'Miami',
    'Istanbul',
    'Melbourne',
    'Osaka',
    'Beijing',
    'Paris',
    'Berlin'
  ];

  await cities.forEach(async city => {
    const imageURL = `https://source.unsplash.com/600x200/?${city}`;
    const stars = Math.ceil(Math.random() * 5);
    const name = faker.company.companyName().split(' ')[0];
    let roomTypes = [];
    for (let i = 1; i <= 4; i++) {
      if (Math.random() > 0.3) {
        roomTypes.push(i);
      }
    }
    let hotel = new Hotel();
    hotel.image = imageURL;
    hotel.name = name;
    hotel.city = city;
    hotel.stars = stars;
    hotel.roomTypes = roomTypes;

    try {
      await hotel.save();
      console.log(city, '--> Success');
    } catch (err) {
      console.log(city, err);
    }
  });
};

// populateUsers();
// populateHotels();

module.exports = {
  populateUsers,
  populateHotels
};
