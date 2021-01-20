const merge = require('lodash.merge')
const Auth = require('./Auth')
const Cart = require('./Cart')
const Item = require('./Item')
const User = require('./User')
const Tag = require('./User')

const resolvers = [Auth, Cart, Item, User, Tag]

module.exports = merge(...resolvers)
