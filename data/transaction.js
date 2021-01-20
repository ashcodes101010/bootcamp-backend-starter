const casual = require('casual')
const userData = require('./user')
const itemData = require('./item')

casual.define('transaction', (buyerId, itemId) => ({
  id: casual.uuid,
  buyerId,
  itemId,
  boughtAt: casual.moment,
}))

const transactionData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  const itemId = casual.random_element(itemData).id
  transactionData.push(casual.transaction(userId, itemId))
}

module.exports = transactionData