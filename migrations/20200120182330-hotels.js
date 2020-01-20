require('./../models/Hotel')

module.exports = {
  async up(db, client) {
    await db.collection('hotels').insertMany([
      {
        roomTypes: [1, 2, 3, 4],
        roomList: [],
        reviews: [],
        image:
          'https://images.unsplash.com/photo-1518169998863-07b9ca9294ea?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        name: 'Zieme',
        city: 'Hong Kong',
        stars: 3,
        rating: 48,
        interiorPhotos: [
          'https://images.unsplash.com/photo-1484995978482-cf913162930c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
          'https://images.unsplash.com/photo-1527675003271-c97d65cd58d0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9'
        ],
        description:
          'Odit accusamus est facere est praesentium saepe. Earum atque quos eligendi nisi blanditiis. Culpa fuga provident ducimus nostrum at sit. Et explicabo ea qui eos amet quaerat modi consequatur provident.\n \rCulpa est totam quia et rerum sed deleniti. Facilis perspiciatis tempore sed. Voluptatem rem temporibus minima est molestiae eaque porro aspernatur eum.\n \rLaboriosam quia voluptas et voluptas eius earum dolor voluptate et. Voluptas asperiores provident eum. Id et earum voluptas atque sit iure est consequatur. Illo asperiores et aut corrupti minus nam unde temporibus quis. Aperiam dolorum sed sint libero unde. Dolores possimus hic enim.'
      },
      {
        roomTypes: [1, 3, 4],
        roomList: [],
        reviews: [],
        image:
          'https://images.unsplash.com/photo-1528720278293-90fc7e59ae77?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=200&fit=crop&ixid=eyJhcHBfaWQiOjF9',
        name: 'Hayes',
        city: 'Wuhan',
        stars: 5,
        rating: 52,
        interiorPhotos: [
          'https://images.unsplash.com/photo-1527675003271-c97d65cd58d0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
          'https://images.unsplash.com/photo-1523688471150-efdd09f0f312?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9',
          'https://images.unsplash.com/photo-1527248808242-9887f8abccb4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1400&h=800&fit=crop&ixid=eyJhcHBfaWQiOjF9'
        ],
        description:
          'Pariatur vel provident et et ipsa aut sunt sed. Qui est exercitationem. Beatae eos reprehenderit odio. Amet fuga qui suscipit unde. Rerum voluptate id. Sint excepturi incidunt sequi quisquam voluptatum.\n \rRepellat quia non iure sed et dolores non. In libero qui. Minus sint dolorem provident autem tempore et ea. Et sapiente sit unde ab minima delectus. In dolore nulla suscipit est laboriosam inventore laborum et voluptatem. Ullam quia ut quos voluptas quidem mollitia tempore sunt perferendis.\n \rEt nihil non sed distinctio. Dolor id in corporis. Rerum accusamus maxime rerum accusamus non tempore officiis velit. Illo iusto quia distinctio aut nisi quod corporis. Esse aut molestias ipsum nisi modi commodi quod enim voluptates.'
      }
    ])
  },

  async down(db, client) {
    await db.collection('hotels').drop()
  }
}
