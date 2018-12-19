const mongoose = require('mongoose');
const omit = require('object.omit');

module.exports = app => {
  app.get('/api/profile', (req, res) => {
    if (!req.user) {
      res.status(401).send('You must log in');
    }
    res.send(omit(req.user.toJSON(), ['password', '__v']));
  });
};
