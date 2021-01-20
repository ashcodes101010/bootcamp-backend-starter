const Item = require('../../models/Book')
const Review = require('../../models/Review')
const Tag = requre('../../models/Tag')


const allItems = async () => {
    try {
        const users = await Item.query()
        return users
    } catch (err) {
        console.log(err)
        throw new Error('Failed to get users')
    }
}

const item = async (obj, { sellerId }, context) => {
    const itemInfo = await Item.query().findOne('id', sellerId)
    return itemInfo
}

const reviews = async ({ id }, params, context) => {
    const ratingAndReview = await Review.query().where('itemId', id)
    return ratingAndReview
}

const tags = async ({ id }, params, context) => {
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
    }
}

module.exports = resolver
