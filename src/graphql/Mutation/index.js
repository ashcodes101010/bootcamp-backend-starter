const merge = require('lodash.merge')
const Auth = require('./Auth')
const Cart = require('./Cart')
const Item = require('./Item')
const User = require('./User')
const Transaction = require('./Transaction')

const resolvers = [Auth, Cart, Item, User, Transaction]

module.exports = merge(...resolvers)
