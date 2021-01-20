const cartItemData = require('../../../data/cartItem')


exports.seed = knex => knex('carts').del()
  .then(() => knex('carts').insert(cartItemData))
