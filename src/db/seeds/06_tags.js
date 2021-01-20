const tagData = require('../../../data/tag')


exports.seed = knex => knex('tags').del()
  .then(() => knex('tags').insert(tagData))
