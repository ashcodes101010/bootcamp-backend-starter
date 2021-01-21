const Cart = require('../../models/Cart')
const Item = require('../../models/Item')

const cart = async (obj, { id }) => {
  try {
    const c = await Cart.query().where('userId', id)
    return c
  } catch (err) {
    throw new Error(err)
  }
}

const item = async ({ itemId }) => {
  const it = await Item.query().findById(itemId)
  return it
}

const resolver = {
  Query: {
    cart,
  },
  Cart: {
    item,
  },
}

module.exports = resolver
