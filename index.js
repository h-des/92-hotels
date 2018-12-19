const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('./models/User');
require('./services/passport');

const app = express();
const port = process.env.PORT || 3030;

app.use(flash());
app.use(bodyParser.json());
app.use(
  cookieSession({
    //cookie life length - 30 days
    maxAge: [30 * 24 * 60 * 60 * 100],
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
