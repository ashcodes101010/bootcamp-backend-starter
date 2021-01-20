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

const updatePassword
const updateUser = async (obj, { input: { id, username, email, password, age, dateJoined, money, bio, addressId }}) => {
    const userExists = await User.query().findById({ id })
    if (!userExists) {
        throw new UserInputError('User does not exist')
    }
    const update = await User.query().findById({ id }).patch({
        username,
        email,
        password,
        age,
        dateJoined,
        money,
        bio,
        addressId
      })
    return { update }
}

const resolver = {
    Mutation: { createUser, updateUser },
  }

module.exports = resolver