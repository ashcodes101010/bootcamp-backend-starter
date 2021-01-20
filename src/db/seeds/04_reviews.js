const reviewData = require('../../../data/review')


exports.seed = knex => knex('reviews').del()
  .then(() => knex('reviews').insert(reviewData))
