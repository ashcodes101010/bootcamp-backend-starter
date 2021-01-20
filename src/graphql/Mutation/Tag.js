const Tag = require('../../models/Item')

const addTag = async (obj, { itemId, tag }) => {
    const addATag = await Tag.query().insert({
        itemId,
        tag
    })
    return { addATag }
}

const removeTag = async (obj, { itemId, tag }) => {
    const removeATag = await Tag.query().delete().where('itemId', itemId).andWhere('tag', tag)
    return { removeATag }
}

const resolver = {
    Mutation: { addTag, removeTag },
  }

module.exports = resolver