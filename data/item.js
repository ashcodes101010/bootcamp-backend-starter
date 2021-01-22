/* eslint-disable no-return-assign */
const casual = require('casual')
const userData = require('./user')

casual.define('item', sellerId => ({
  id: casual.uuid,
  sellerId,
  name: casual.random_element([
    'Coats',
    'Shirt',
    'School supplies',
    'Shoes',
    'Electronic',
  ]),
  price: Math.round(casual.double(from = 0, to = 1000) * 100) / 100,
  imgUrl: casual.random_element([
    'https://i0.wp.com/blog.armoire.style/wp-content/uploads/2020/02/IMG_3469.jpg',
    'https://mms-images-prod.imgix.net/mms/images/catalog/3a52bc974e22dab11435fb6241b11ce7/styles/175800/catalog_detail_image_large.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/51p9Db%2BvSoL._AC_SY355_.jpg',
    'https://images.vans.com/is/image/Vans/D3HY28-HERO',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-201911_FMT_WHH?wid=2000&hei=2000&fmt=jpeg',
  ]),
  description: casual.sentence,
  soldOut: false,
  stock: casual.integer(from = 1, to = 100),
  createdAt: casual.moment,
  updatedAt: casual.moment,
  deleted: false,
}))

const itemData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  itemData.push(casual.item(userId))
}

module.exports = itemData
