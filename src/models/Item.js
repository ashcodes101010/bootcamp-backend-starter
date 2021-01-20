const { BelongsToOneRelation, HasManyRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const User = require('./User')
const Transaction = require('./Transaction')
const Tag = require('./Tag')
const Cart = require('./Cart')

class Item extends BaseModel {
  static get tableName() {
    return 'items'
  }

  static get relationMappings() {
    return {
      user:  {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'items.id',
          to: 'users.sellerId'
        }
      },
      transactions: {
          relation: HasManyRelation,
          modelClass: Transaction,
          from: 'items.id',
          to: 'transactions.itemId'
      },
      tags: {
          relation: HasManyRelation,
          modelClass: Tag,
          from: 'items.id',
          to: 'tags.itemId'
      },
      cart: {
          relation: HasManyRelation,
          modelClass: Cart,
          from: 'items.id',
          to: 'cart.itemId'
      }
    }
  }
}

module.exports = Item