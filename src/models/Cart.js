const { HasManyRelations, BelongsToOneRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const Item = require('./Item')
const User = require('./User')

class Cart extends BaseModel {
  static get tableName() {
    return 'carts'
  }

  static get relationMappings() {
    return {
      items: {
        relation: HasManyRelations,
        modelClass: Item,
        join: {
          from: 'carts.itemId',
          to: 'items.id',
        },
      },
      user: {
        relation: HasManyRelations,
        modelClass: User,
        join: {
          from: 'carts.userId',
          to: 'user.id',
        },
      },
    }
  }
}

module.exports = Cart
