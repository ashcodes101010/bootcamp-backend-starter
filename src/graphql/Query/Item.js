const Item = require('../../models/Item')
const Review = require('../../models/Review')
const Tag = require('../../models/Tag')
const User = require('../../models/User')


const allItems = async () => {
  try {
    const users = await Item.query()
    return users
  } catch (err) {
    throw new Error('Failed to get users')
  }
}

const item = async (obj, { id }) => {
  const itemInfo = await Item.query().findOne('id', id)
  return itemInfo
}

const seller = async ({ sellerId }) => {
  const user = await User.query().findById(sellerId)
  return user
}

const reviews = async ({ id }) => {
  const ratingAndReview = await Review.query().where('itemId', id)
  return ratingAndReview
}

const tags = async ({ id }) => {
  const t = await Tag.query().where('itemId', id)
  return t
}

const resolver = {
  Query: {
    allItems,
    item,
  },
  Item: {
    reviews,
    tags,
    seller,
  },
}

module.exports = resolver
