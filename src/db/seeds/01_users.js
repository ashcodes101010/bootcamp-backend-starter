const userData = require('../../../data/user')


exports.seed = knex => knex('users').del()
  .then(() => knex('users').insert(userData))
