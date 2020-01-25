const bcrypt = require('bcrypt')
require('./../models/User')

module.exports = {
  async up(db, client) {
    await db.collection('users').insertOne({
      email: 'admin@example.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null),
      avatar: {
        small: 'https://randomuser.me/api/portraits/thumb/women/43.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/43.jpg',
        large: 'https://randomuser.me/api/portraits/women/43.jpg'
      },
      firstName: 'Patricia',
      lastName: 'Reyes',
      city: 'Midleton',
      address: '4375 denny street',
      phone: '041-201-9906',
      zipCode: '44140'
    })
  },

  async down(db, client) {
    await db
      .collection('users')
      .deleteOne({ email: { $eq: 'admin@example.com' } })
  }
}
