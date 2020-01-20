require('./../models/Room')
require('./../models/Hotel')

module.exports = {
  async up(db, client) {
    const hotel = await db
      .collection('hotels')
      .findOne({ city: { $eq: 'Hong Kong' } })

    await db.collection('rooms').insertOne({
      photos: [
        'https://images.unsplash.com/photo-1432303492674-642e9d0944b2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9'
      ],
      bookings: [],
      price: 100,
      name: 'maroon',
      hotel: hotel._id,
      type: 1
    })
  },

  async down(db, client) {
    await db.collection('rooms').deleteOne({ name: { $eq: 'maroon' } })
  }
}
