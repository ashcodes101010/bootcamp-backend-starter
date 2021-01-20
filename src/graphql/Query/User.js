const User = require('../../models/User')
const Item = require('../../models/Item')
const Cart = require('../../models/Cart')
const Transaction = require('../../models/Transaction')
const Review = require('../../models/Review')

//^ need Cart, Transaction, and Review models to be added to tbe models folder

const allUsers = async () => {
    try {
        const users = await User.query()
        return users
    } catch (err) {
        console.log(err)
        throw new Error('Failed to get users')
    }
}

const user = async (obj, { id }, context) => {
    const userInfo = await User.query().findOne('id', userId)
    return userInfo
}

const itemsBought = async ({ id }, params, context) => {
    const bought = await Transaction.query().where('buyerId', id)
    return bought
}

const itemsSelling = async ({ id }, params, context) => {
    const inUserShop = await Item.query().where('sellerId', id)
    return inUserShop
}

const cart = async ({ id }, params, context) => {
    const itemsInCart = await Cart.query().where('userId', id).groupBy('itemId')
    return itemsInCart
}

const reviewsReceived = async ({ id }, params, context) => {
    const itemReviews = await Review.query().where('sellerId', id).groupBy('itemId')
    return itemReviews
}

const reviewsWritten = async ({ id }, params, context) => {
    const itemReviews = await Review.query().where('buyerId', id).groupBy('itemId')
    return itemReviews
}

const resolver = {
    Query: {
        allUsers,
        user,
    },
    User: {
        itemsSelling,
        itemsBought,
        cart,
        reviewsReceived,
        reviewsWritten,
    }
}

module.exports = resolver