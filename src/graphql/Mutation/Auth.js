const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const Address = require('../../models/Address')
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

const register = async (obj, { input: { username, email, password, age, address: { street, city, state, zip, country } }}) => {
  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new UserInputError('Email is already in use')
  }
  const passwordHash = await hashPassword(password)

  const user = await User.query().insertAndFetch({
    email,
    username,
    password: passwordHash,
    age,
  }).returning('id')

  const addressDetails = await Address.query().insertAndFetch({
    street,
    city,
    state,
    zip,
    country,
    user: user
  }).returning('id')

  const addAddressId = await User.query().patch({
    address: addressDetails
  })

  // If successful registration, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)




  // try {
  //   const trans = await knex.transaction(async trx => {
  //     const create = await Address.query(trx).insert({
  //       street,
  //       city,
  //       state,
  //       zip,
  //       country
  //     }).returning('*')
  //     await Promise.all(tags.map(async tag => {
  //       await User.query(trx).insert({
  //         addressId: create.id,
  //         tag: tag.tag,
  //       })
  //     }))
  //     return create
  //   })
  //   return trans
  // } catch (err) {
  //   throw new Error(err)
  // }








  return { user, addressDetails, addAddressId, token }
}

const resolver = {
  Mutation: { login, register, updatePass },
}

module.exports = resolver
