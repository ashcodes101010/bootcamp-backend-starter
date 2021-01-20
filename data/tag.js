const casual = require('casual')
const itemData = require('./item')

casual.define('tag', itemId => ({
  itemId,
  tag: casual.word,
  createdAt: casual.moment,
}))

const tagData = []

for (let i = 0; i < 20; ++i) {
  const itemId = casual.random_element(itemData).id
  tagData.push(casual.tag(itemId))
}

module.exports = tagData