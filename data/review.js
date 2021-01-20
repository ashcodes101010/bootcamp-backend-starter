const casual = require('casual')
const userData = require('./user')
const itemData = require('./item')

casual.define('review', (buyerId, itemId) => ({
  id: casual.uuid,
  buyerId,
  itemId,
  review: casual.description,
  rating: casual.integer(from = 1, to = 10),
  createdAt: casual.moment,
  updatedAt: casual.moment,
}))

const reviewData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  const itemId = casual.random_element(itemData).id
  reviewData.push(casual.review(userId, itemId))
}

module.exports = reviewData