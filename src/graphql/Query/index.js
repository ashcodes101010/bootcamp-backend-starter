const merge = require('lodash.merge')
const User = require('./User')
const Item = require('./Item')

const resolvers = [User, Item]

module.exports = merge(...resolvers)
