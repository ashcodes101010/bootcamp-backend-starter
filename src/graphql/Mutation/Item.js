const Item = require('../../models/Item')
const User = require('../../models/User')
const Tag = require('../../models/Tag')
const knex = require('../../lib/knex')

const updateItem = async (obj, {
  input: {
    id, sellerId, name, imgUrl, description, price, tags, soldOut, stock,
  },
}) => {
  const itemExists = await Item.query().findById(id)
  if (!itemExists) {
    throw new Error('Item does not exist')
  }
  const update = await User.query().findById(sellerId).patch({
    name,
    imgUrl,
    description,
    price,
    tags,
    soldOut,
    stock,
  })
  return { update }
  /* If user wishes to update an item, query for current data first and have all details
    listed above be patched.
    */
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
          tag,
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
