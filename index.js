const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const logger = require('./utils/logger');
const compression = require('compression');
require('./models/User');
require('./models/Hotel');
require('./models/Bookings');
require('./models/Room');
require('./models/Promoted');
require('./models/Review');
require('./services/passport');

const app = express();
const port = process.env.PORT || 3030;
app.use(compression());
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
  { useNewUrlParser: true },
  err => {
    if (err) {
      logger.error('Cannot connect to database');
    }
  }
);

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/reviewRoutes')(app);
require('./routes/hotelRoutes')(app);
require('./routes/bookingRoutes')(app);

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
