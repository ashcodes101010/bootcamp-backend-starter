const User = require('../../models/User')

const addMoney = async (obj, { id, money }) => {
  try {
    const user = await User.query().findById(id)
    if (!user) {
      throw new Error('User does not exist')
    }
    const updatedMoney = Number(user.money) + money
    const update = await User.query().findById(id).patch({
      money: updatedMoney,
    }).returning('*')
    return update
  } catch (err) {
    throw new Error('Could not add funds')
  }
}

const removeMoney = async (obj, { id, money }) => {
  try {
    const user = await User.query().findById(id)
    if (!user) {
      throw new Error('User does not exist')
    }
    const updatedMoney = Number(user.money) - money
    const update = await User.query().findById(id).patch({
      money: updatedMoney,
    }).returning('*')
    return update
  } catch (err) {
    throw new Error('Could not remove funds')
  }
}
const resolver = {
  Mutation: { addMoney, removeMoney },
}

module.exports = resolver
