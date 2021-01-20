const itemData = require('../../../data/item')


exports.seed = knex => knex('items').del()
  .then(() => knex('items').insert(itemData))
