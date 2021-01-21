const { HasManyRelation, BelongsToOneRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const Cart = require('./Cart')
const Item = require('./Item')
const Review = require('./Review')
const Transaction = require('./Transaction')
const Address = require('./Address')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      items:  {
        relation: HasManyRelation,
        modelClass: Item,
        join: {
          from: 'users.id',
          to: 'items.sellerId'
        }
      },
      transactions: {
        relation: HasManyRelation,
        modelClass: Transaction,
        join: {
          from: 'users.id',
          to: 'transactions.buyerId'
        }
      },
      reviews: {
        relation: HasManyRelation,
        modelClass: Review,
        join: {
          from: 'users.id',
          to: 'reviews.buyerId'
        }
      },
      cart: {
        relation: BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: 'users.id',
          to: 'cart.userId'
        }
      },
      address: {
        relation: BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: 'users.addressId',
          to: 'addresses.id'
        }
      }
    }
  }
}

module.exports = User
