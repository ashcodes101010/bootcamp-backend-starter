const casual = require('casual')
const userData = require('./user')

casual.define('item', sellerId => ({
  id: casual.uuid,
  sellerId,
  name: casual.word,
  price: Math.round(casual.double(from = 0, to = 1000) * 100) / 100,
  imgUrl: casual.random_element([
    'https://cdn.shopify.com/s/files/1/1078/7442/products/navy_blue_short_sleeve_1024x1024_2x_c6ab766f-8905-4f94-b6d0-a6954591ad5f_grande.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/61uP366HNLL._AC_SY355_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51p9Db%2BvSoL._AC_SY355_.jpg',
    'https://m.media-amazon.com/images/I/71J25IccAdL._AC_SY355_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81UOcL2ZFyL._AC_SY355_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81d7hnqa83L._AC_SX425_.jpg'
  ]),
  description: casual.sentence,
  soldOut: false,
  stock: casual.integer(from = 1, to = 100),
  createdAt: casual.moment,
  updatedAt: casual.moment,
}))

const itemData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  itemData.push(casual.item(userId))
}

module.exports = itemData