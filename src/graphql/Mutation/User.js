const User = require('../../models/User')

const createUser = async (obj, { input: { username, email, password, age, dateJoined, money, bio, addressId }}) => {
    const create = await User.query().insert({
        username,
        email,
        password,
        age,
        dateJoined,
        money,
        bio,
        addressId
      })
    return { create }
}

const addMoney = async (obj, { id, money }) => {
  const userExists = await User.query().findById({ id })
  if (!userExists) {
      throw new UserInputError('User does not exist')
  }
  const update = await User.query().findById(id).patch({
      money,
  })
  return { update }
}

const changePassword = async (obj, { id, password }) => {
  const userExists = await User.query().findById(id)
  if (!userExists) {
      throw new UserInputError('User does not exist')
  }
  const update = await User.query().findById(id).patch({
      password,
  })
  return { update }
}
const resolver = {
    Mutation: { createUser, addMoney, changePassword },
  }

module.exports = resolver
