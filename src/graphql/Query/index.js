const merge = require('lodash.merge')
const User = require('./User')
const Item = require('./Item')
const Transaction = require('./Transaction')

const resolvers = [User, Item, Transaction]

module.exports = merge(...resolvers)
