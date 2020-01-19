if (process.env.NODE_ENV === 'production') {
  const keys = require('./prod')
  module.exports = keys
} else {
  const keys = require('./dev')
  module.exports = keys
}
