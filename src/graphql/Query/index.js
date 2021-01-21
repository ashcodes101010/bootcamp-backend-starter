const merge = require('lodash.merge')
const User = require('./User')
const Item = require('./Item')
const Transaction = require('./Transaction')
const Cart = require('./Cart')

const resolvers = [User, Item, Transaction, Cart]

module.exports = merge(...resolvers)
