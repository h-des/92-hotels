const keys = require('./config/keys')

const config = {
  mongodb: {
    url: keys.mongoURI,
    databaseName: 'test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog'
}

module.exports = config
