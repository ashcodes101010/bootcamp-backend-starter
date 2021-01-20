const transactionData = require('../../../data/transaction')


exports.seed = knex => knex('transactions').del()
  .then(() => knex('transactions').insert(transactionData))
