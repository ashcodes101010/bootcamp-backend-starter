const Item = require('../../models/Item')
const Review = require('../../models/Review')
const Tag = require('../../models/Tag')


const allItems = async () => {
  try {
    const users = await Item.query()
    return users
  } catch (err) {
    console.log(err)
    throw new Error('Failed to get users')
  }
}

const item = async (obj, { id }) => {
  const itemInfo = await Item.query().findOne('id', id)
  return itemInfo
}

const reviews = async ({ id }) => {
  const ratingAndReview = await Review.query().where('itemId', id)
  return ratingAndReview
}

const tags = async ({ id }) => {
  const tags = await Tag.query().where('itemId', id)
  return tags
}

const resolver = {
  Query: {
    allItems,
    item,
  },
  Item: {
    reviews,
    tags,
  },
}

module.exports = resolver
