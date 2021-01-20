const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')

const updatePass = async (obj, { id, password }) => {
  const user = await User.query().findById(id)
  if (!user) {
    throw new UserInputError('User does not exist')
  }
  const passwordHash = await hashPassword(password)
  const update = await User.query().findById(id).patch({
    password: passwordHash,
  }).returning('*')
  return update
}

const login = async (obj, { email, password }) => {
  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new UserInputError('Invalid email or password')
  }

  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) {
    throw new UserInputError('Invalid email or password')
  }


  // If successful login, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)

  return { user, token }
}

const register = async (obj, { input: { email, password } }) => {
  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new UserInputError('Email is already in use')
  }

  const passwordHash = await hashPassword(password)
  const user = await User.query().insertAndFetch({
    email,
    password: passwordHash,
  })

  // If successful registration, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)

  return { user, token }
}

const resolver = {
  Mutation: { login, register, updatePass },
}

module.exports = resolver
