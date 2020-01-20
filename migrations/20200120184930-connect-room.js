require('./../models/Room')
require('./../models/Hotel')

module.exports = {
  async up(db, client) {
    const room = await db
      .collection('rooms')
      .findOne({ name: { $eq: 'maroon' } })

    await db
      .collection('hotels')
      .updateOne(
        { city: { $eq: 'Hong Kong' } },
        { $set: { roomList: [room._id] } }
      )
  },

  async down(db, client) {
    await db
      .collection('hotels')
      .updateOne({ city: { $eq: 'Hong Kong' } }, { $set: { roomList: [] } })
  }
}
