const { BelongsToOneRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const User = require('./User')

class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions'
  }

  static get relationMappings() {
    return {
      user:  {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'transactions.buyerId',
          to: 'user.id'
        }
      },
      item: {
          relation: BelongsToOneRelation,
          modelClass: Item,
          join: {
              from: 'transactions.itemId',
              to: 'items.id'
          }
      }
    }
  }
}

module.exports = Transaction