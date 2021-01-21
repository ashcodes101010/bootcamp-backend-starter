const Cart = require('../../models/Cart')
const Item = require('../../models/Item')
const User = require('../../models/User')

const addCartItem = async (obj, { input: { userId, itemId } }) => {
  const itemExists = await Item.query().findById(itemId)
  if (!itemExists) {
    throw new Error('Item does not exist')
  }
  const userExists = await User.query().findById(userId)
  if (!userExists) {
    throw new Error('User does not exist')
  }

  const addToCart = await Cart.query().insert({
    userId,
    itemId,
  }).returning('*')

  return addToCart
}

const removeCartItem = async (obj, { id }) => {
  const removeFromCart = await Cart
    .query()
    .delete()
    .where('id', id)
    .returning('*')
  return removeFromCart
}

const resolver = {
  Mutation: { addCartItem, removeCartItem },
}

module.exports = resolver
