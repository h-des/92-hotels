const User = mongoose.model('users');
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
      console.log('saved');
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  populateUsers
};
