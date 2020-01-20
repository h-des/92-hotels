const bcrypt = require('bcrypt')
require('./../models/User')

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      email: 'admin@example.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null)
    })
  },

  async down(db, client) {
    await db
      .collection('users')
      .deleteOne({ email: { $eq: 'admin@example.com' } })
  }
}
