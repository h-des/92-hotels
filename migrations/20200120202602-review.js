require('../models/User')
require('../models/Review')
require('../models/Hotel')

module.exports = {
  async up(db, client) {
    const user = await db
      .collection('users')
      .findOne({ email: { $eq: 'admin@example.com' } })
    const hotel = await db
      .collection('hotels')
      .findOne({ city: { $eq: 'Hong Kong' } })

    const review = await db.collection('reviews').insertOne({
      body:
        'Repellendus voluptatem magnam ullam et aspernatur aut quidem. Aut velit soluta sed quo.',
      rate: 5,
      hotel: hotel._id,
      user: user._id
    })

    await db
      .collection('users')
      .updateOne(
        { email: { $eq: 'admin@example.com' } },
        { $set: { reviews: [review.insertedId] } }
      )
  },

  async down(db, client) {}
}
