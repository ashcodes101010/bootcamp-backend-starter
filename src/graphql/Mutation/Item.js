const Item = require('../../models/Item')
const User = require('../../models/User')
const Tag = require('../../models/Tag')
const knex = require('../../lib/knex')

const updateItem = async (obj, {
  id,
  input: {
    sellerId, name, imgUrl, description, price, tags, stock,
  },
}) => {
  try {
    const item = await Item.query().findById(id)
    if (!item) {
      throw new Error('Item does not exist')
    }
    const trans = await knex.transaction(async trx => {
      const update = await Item.query(trx).findById(id).patch({
        sellerId,
        name,
        imgUrl,
        description,
        price,
        stock,
      }).returning('*')
      await Tag.query(trx).delete().where('itemId', id)

      await Promise.all(tags.map(async tag => {
        await Tag.query(trx).insert({
          itemId: id,
          tag: tag.tag,
        })
      }))
      return update
    })
    return trans
  } catch (err) {
    throw new Error(err)
  }
}

const createItem = async (obj, {
  input: {
    sellerId, name, imgUrl, description, price, tags, stock,
  },
}) => {
  try {
    const trans = await knex.transaction(async trx => {
      const create = await Item.query(trx).insert({
        sellerId,
        name,
        imgUrl,
        description,
        price,
        stock,
      }).returning('*')
      await Promise.all(tags.map(async tag => {
        await Tag.query(trx).insert({
          itemId: create.id,
          tag: tag.tag,
        })
      }))
      return create
    })
    return trans
  } catch (err) {
    throw new Error(err)
  }
}

const deleteItem = async (obj, { input: { id } }) => {
  const itemExists = await Item.query().findById(id)
  if (!itemExists) {
    throw new Error('Item does not exist')
  }
  const remove = await User.query().delete().findById(id).returning('*')
  return remove
}

const resolver = {
  Mutation: { updateItem, createItem, deleteItem },
}

module.exports = resolver
