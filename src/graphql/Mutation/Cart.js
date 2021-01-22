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
  try {
    const removeFromCart = await Cart.query()
      .delete()
      .findById(id)
      .returning('*')
    return removeFromCart
  } catch (err) {
    throw new Error(err)
  }
}

const resolver = {
  Mutation: { addCartItem, removeCartItem },
}

module.exports = resolver
