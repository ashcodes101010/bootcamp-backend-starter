exports.up = knex => knex.schema.createTable('carts', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('itemId')
    .references('items.id')

  table
    .uuid('userId')
    .references('users.id')

  table.timestamp('createdAt').defaultTo(knex.fn.now())
})

exports.down = async knex => knex.schema.dropTableIfExists('carts')
