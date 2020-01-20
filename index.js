const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const compression = require('compression')
const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

require('./models/User')
require('./models/Hotel')
require('./models/Bookings')
require('./models/Room')
require('./models/Promoted')
require('./models/Review')
require('./services/passport')

const app = express()
const port = process.env.PORT || 3030

app.use(compression())
app.use(flash())
app.use(bodyParser.json())
app.use(
  cookieSession({
    //cookie life length - 30 days
    maxAge: [30 * 24 * 60 * 60 * 100],
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())
const run = async () => {
  const connection = await mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
  })

  const AdminBroOptions = {
    databases: [connection],
    rootPath: '/admin',
    branding: {
      companyName: '92-hotels'
    }
  }

  const adminBro = new AdminBro(AdminBroOptions)
  const router = AdminBroExpress.buildRouter(adminBro)
  app.use(adminBro.options.rootPath, router)
}

run()

require('./routes/authRoutes')(app)
require('./routes/userRoutes')(app)
require('./routes/reviewRoutes')(app)
require('./routes/hotelRoutes')(app)
require('./routes/bookingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (_, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
