const mongoose = require('mongoose')
const Booking = mongoose.model('bookings')
const Room = mongoose.model('rooms')

const checkAvailability = async (hotel, from, to, roomType) => {
  const roomIDsList = hotel.roomList
  const fromDate = new Date(from)
  const toDate = new Date(to)
  if (toDate <= fromDate) return false

  let roomList = await Room.find({
    _id: { $in: roomIDsList },
    type: parseInt(roomType)
  }).lean()

  for (let room of roomList) {
    //find all bookings colliding with dates from query
    const collidingBooking = await Booking.findOne({
      _id: { $in: room.bookings },
      $or: [
        { from: { $gte: fromDate, $lt: toDate } },
        { to: { $lte: toDate, $gt: fromDate } }
      ]
    }).lean()

    //if no colliding bookings are found, room is availible
    if (!collidingBooking) {
      return room
    }

    //otherwise check next room
  }

  return false
}

module.exports = checkAvailability
