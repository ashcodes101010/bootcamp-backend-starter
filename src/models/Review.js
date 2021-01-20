const { BelongsToOneRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const Item = require('./Item')
const User = require('./User')

class Review extends BaseModel {
  static get tableName() {
    return 'reviews'
  }

  static get relationMappings() {
    return {
      item:  {
        relation: BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'reviews.itemId',
          to: 'items.id'
        }
      },
      user: {
          relation: BelongsToOneRelation,
          modelClass: User,
          join: {
              from: 'reviews.buyerId',
              to: 'users.id'
          }
      }
    }
  }
}

module.exports = Review