const BaseModel = require('./BaseModel')
const User = require('./User')
const { BelongsToOneRelation } = require('./BaseModel')

class Address extends BaseModel {
  static get tableName() {
    return 'addresses'
  }
  static get relationMappings() {
    const Author = require('./User')

    return {
      user: {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'addresses.id',
          to: 'users.addressId',
        }
      }
    }
  }
}

module.exports = Address