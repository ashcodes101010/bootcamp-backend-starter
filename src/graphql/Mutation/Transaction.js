const knex = require('../../lib/knex')
const Transaction = require('../../models/Transaction')

const addTransactions = async (obj, { id, items }) => {
  try {
    const trans = await knex.transaction(async trx => {
      await Promise.all(items.map(async itemId => {
        await Transaction.query(trx).insert({
          buyerId: id,
          itemId,
        })
      }))
      return 'Data added'
    })
    return trans
  } catch (err) {
    throw new Error('Could not add transactions')
  }
}

const resolver = {
  Mutation: { addTransactions },
}

module.exports = resolver
