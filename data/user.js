const casual = require('casual')
const addressData = require('./address')

// 'password' hashed with bcrypt scheme
const password = '$2a$10$rQEY9CNl4OC.UtiyRgKnZeW0KaWnEANMKAxfIpNDQCgiCybm3G1fy'

casual.define('user', addressId => ({
  id: casual.uuid,
  email: casual.email,
  username: casual.username,
  password,
  age: casual.integer(from = 16, to = 99),
  money: Math.round(casual.double(from = 0, to = 10000) * 100) / 100,
  bio: casual.sentence,
  addressId,
  dateJoined: casual.moment,
  updatedAt: casual.moment,
}))

const userData = []

for (let i = 0; i < 20; ++i) {
  const addressId = casual.random_element(addressData).id
  userData.push(casual.user(addressId))
}

module.exports = userData
