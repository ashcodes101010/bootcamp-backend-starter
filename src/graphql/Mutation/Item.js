const Item = require('../../models/Item')
const User = require('../../models/Item')


const updateItem = async (obj, { input: { id, sellerId, name, imgUrl, description, price, tags, soldOut, stock }}) => {
    const itemExists = await Item.query().findById({ id })
    if (!itemExists) {
        throw new UserInputError('Item does not exist')
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

const createItem = async (obj, { input: { sellerId, name, imgUrl, description, price, tags, soldOut, stock }}) => {
    const create = await Item.query().insert({
        sellerId,
        name,
        imgUrl,
        description,
        price,
        tags,
        soldOut,
        stock
      })
    return { create }
}

const deleteItem = async (obj, { input: { id }}) => {
    const itemExists = await Item.query().findById({ id })
    if (!itemExists) {
        throw new UserInputError('Item does not exist')
    }
    const remove = await User.query().delete().findById(id)
    return { remove }
}

const resolver = {
    Mutation: { updateItem, createItem, deleteItem },
  }

module.exports = resolver