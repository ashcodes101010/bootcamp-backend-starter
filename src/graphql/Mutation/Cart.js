const Cart = require('../../models/Cart')
const Item = require('../../models/Item')
const User = require('../../models/User')

const addCartItem = async (obj, { input: { userId, itemId } }) => {
    const itemExists = await Item.query().findById({ itemId })
    if (!itemExists) {
        throw new UserInputError('Item does not exist')
    }
    const userExists = await User.query().findById({ userId })
    if (!userExists) {
        throw new UserInputError('User does not exist')
    }

    const addToCart = await Cart.query().insert({
        userId,
        itemId
    })

    return { addToCart }
}

const removeCartItem = async (obj, { input: { userId, itemId } }) => {
    const itemExists = await Cart.query().where('userId', userId).andWhere('itemId', itemId)
    if (!itemExists) {
        throw new UserInputError('Item does not exist')
    }
    const userExists = await User.query().findById({ userId })
    if (!userExists) {
        throw new UserInputError('User does not exist')
    }
    const removeFromCart = await Cart.query().delete().where('userId', userId).andWhere('itemId', itemId)
    return { removeFromCart }
}

const resolver = {
    Mutation: { addCartItem, removeCartItem },
  }

module.exports = resolver