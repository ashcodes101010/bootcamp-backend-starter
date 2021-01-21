const { BelongsToOneRelation } = require('./BaseModel')
const BaseModel = require('./BaseModel')
const Item = require('./Item')

class Tag extends BaseModel {
  static get tableName() {
    return 'tags'
  }

  static get relationMappings() {
    return {
      item: {
        relation: BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'tags.itemId',
          to: 'items.id',
        },
      },
    }
  }
}

module.exports = Tag
