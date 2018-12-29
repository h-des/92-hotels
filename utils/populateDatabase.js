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
const Review = mongoose.model('reviews');
const Room = mongoose.model('rooms');
const Booking = mongoose.model('bookings');
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
    let imageURL = await axios.get(
      `https://source.unsplash.com/600x200/?${city}`
    );
    imageURL = imageURL.request.responseURL;

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

const populateReviews = async () => {
  const users = await User.find();
  const hotels = await Hotel.find();
  hotels.forEach(async hotel => {
    users.forEach(async user => {
      if (Math.random() > 0.25) {
        let review = new Review();
        rate = Math.ceil(Math.random() * 5);
        review.body = faker.lorem.sentences();
        review.createdAt = faker.date.past(1);
        review.rate = rate;
        review.hotel = hotel._id;
        review.user = user._id;

        try {
          await Hotel.findOneAndUpdate(
            { _id: hotel._id },
            {
              $addToSet: { reviews: review._id },
              $inc: { rating: rate }
            }
          );

          await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { reviews: review._id } }
          );
          await review.save();
          console.log('%s created a review for %s', user.firstName, hotel.city);
        } catch (err) {
          console.log(err);
        }
      }
    });
  });
};

const populateRooms = async () => {
  const hotels = await Hotel.find();
  const prices = [50, 80, 100, 150, 200];
  const multiplyBy = [1, 1.5, 2, 2.5];
  const getPhotos = arr => {
    let res = [];
    for (let i = 0; i < 3; i++) {
      let id = Math.floor(Math.random() * arr.length);
      res.push(arr[id]);
      arr = [...arr.splice(0, id), ...arr.splice(id - 1)];
    }
    return res;
  };

  hotels.forEach(async hotel => {
    hotel.roomTypes.forEach(async type => {
      const count = Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        let room = new Room();
        room.price = prices[hotel.stars - 1] * multiplyBy[type - 1];
        room.name = faker.commerce.color();
        room.hotel = hotel._id;
        room.type = type;
        room.photos = getPhotos(photos);

        try {
          await room.save();
          await Hotel.findByIdAndUpdate(hotel._id, {
            $addToSet: { roomList: room._id }
          });
          console.log('Created room for %s', hotel.city);
        } catch (err) {
          console.log(err);
        }
      }
    });
  });
};

const populateBookings = async () => {};

const updatePhotos = async () => {
  const hotels = await Hotel.find({});

  for (let hotel of hotels) {
    let imageURL = await axios.get(
      `https://source.unsplash.com/600x200/?${hotel.city}`
    );
    hotel.image = imageURL.request.res.responseUrl;

    try {
      await hotel.save();
      console.count('saved hotel: ');
    } catch (err) {
      console.log(err);
    }
  }
};

const addInteriorPhotos = async () => {
  const hotels = await Hotel.find({});
  const getPhotos = arr => {
    arr = [...arr];
    let res = [];
    for (let i = 0; i < 3; i++) {
      let id = Math.floor(Math.random() * arr.length);
      res.push(arr[id]);
      arr.splice(id, 1);
    }
    return res;
  };

  for (let hotel of hotels) {
    let photosArr = getPhotos(photos);
    hotel.interiorPhotos = photosArr;
    try {
      await hotel.save();
      console.count('saved hotel: ');
    } catch (err) {
      console.log(err);
    }
  }
};

// addInteriorPhotos();
// updatePhotos();
// populateUsers();
// populateHotels();
// populateReviews();
// populateBookings();
// populateRooms();

module.exports = {
  populateUsers,
  populateHotels,
  populateReviews,
  populateRooms,
  populateBookings
};

const photos = [
  'https://images.unsplash.com/photo-1523688471150-efdd09f0f312?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1527248808242-9887f8abccb4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1484995978482-cf913162930c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1527675003271-c97d65cd58d0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1466770402907-bddc096cf4a9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1509927639005-b822b0b5b750?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1432303492674-642e9d0944b2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1521607630287-ee2e81ad3ced?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1521147044359-e6c12eb7a189?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9'
];
