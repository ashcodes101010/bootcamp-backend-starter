const Item = require('../../models/Item')
const Review = require('../../models/Review')
const Tag = require('../../models/Tag')
const User = require('../../models/User')


const allItems = async () => {
  try {
    const items = await Item.query()
    return items
  } catch (err) {
    throw new Error('Failed to get item')
  }
}

// previously called searchItemsNoTag, now this is the only search method
const searchItems = async (obj, { input }) => {
  const items = await Item
    .query()
    .where('name', 'like', `%${input}%`)
    .andWhere('deleted', false)
    .orderBy('name')
    .orderBy('description')
  return items
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
    searchItems,
    item,
  },
  Item: {
    reviews,
    tags,
    seller,
  },
}

module.exports = resolver
