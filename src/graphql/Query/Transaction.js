const Item = require('../../models/Item')
const Transaction = require('../../models/Transaction')
const User = require('../../models/User')

const transaction = async (obj, { id }) => {
  try {
    const trans = await Transaction.query().findById(id)
    return trans
  } catch (err) {
    throw new Error(err)
  }
}

const item = async ({ itemId }) => {
  const it = await Item.query().findById(itemId)
  return it
}

const buyer = async ({ buyerId }) => {
  const user = await User.query().findById(buyerId)
  return user
}

const resolver = {
  Query: {
    transaction,
  },
  Transaction: {
    item,
    buyer,
  },
}

module.exports = resolver
