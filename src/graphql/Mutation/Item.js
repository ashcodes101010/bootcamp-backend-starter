const Item = require('../../models/Item')
const Tag = require('../../models/Tag')
const knex = require('../../lib/knex')
const Review = require('../../models/Review')
const Cart = require('../../models/Cart')

const decrementStock = async (obj, { id }) => {
  try {
    const item = await Item.query().findById(id)
    const update = await Item.query().findById(id).patch({
      stock: Number(item.stock) - 1,
    }).returning('*')
    return update
  } catch (err) {
    throw new Error(err)
  }
}

const incrementStock = async (obj, { id }) => {
  try {
    const item = await Item.query().findById(id)
    const update = await Item.query().findById(id).patch({
      stock: Number(item.stock) + 1,
    }).returning('*')
    return update
  } catch (err) {
    throw new Error(err)
  }
}

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

const deleteItem = async (obj, { id }) => {
  try {
    const item = await Item.query().findById(id)
    if (!item) {
      throw new Error('Item does not exist')
    }
    const trans = await knex.transaction(async trx => {
      await Review.query(trx).delete().where('itemId', id)
      await Cart.query(trx).delete().where('itemId', id)
      const remove = await Item.query(trx).findById(id).patch({
        deleted: true,
      }).returning('*')
      await Tag.query(trx).delete().where('itemId', id)
      return remove
    })
    return trans
  } catch (err) {
    throw new Error(err)
  }
}

const resolver = {
  Mutation: {
    updateItem,
    createItem,
    deleteItem,
    decrementStock,
    incrementStock,
  },
}

module.exports = resolver
