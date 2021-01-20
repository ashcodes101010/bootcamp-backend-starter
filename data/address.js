const casual = require('casual')

casual.define('address', () => ({
  id: casual.uuid,
  street: casual.street,
  city: casual.city,
  state: casual.state,
  zip: casual.zip(5),
  country: casual.country,
  createdAt: casual.moment,
  updatedAt: casual.moment,
}))

const addressData = []

for (let i = 0; i < 20; ++i) {
  addressData.push(casual.address)
}

module.exports = addressData
