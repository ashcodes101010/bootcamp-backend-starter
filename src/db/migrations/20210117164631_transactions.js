exports.up = knex => knex.schema.createTable('transactions', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .uuid('itemId')
    .references('items.id')

  table
    .uuid('buyerId')
    .references('users.id')

  table.timestamp('boughtAt').defaultTo(knex.fn.now())
})

exports.down = async knex => knex.schema.dropTableIfExists('transactions')
