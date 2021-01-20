const addressData = require('../../../data/address')


exports.seed = knex => knex('addresses').del()
  .then(() => knex('addresses').insert(addressData))
