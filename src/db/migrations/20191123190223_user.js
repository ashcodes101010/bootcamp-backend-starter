const { createTableIfNotExists } = require('../helpers')

exports.up = async knex => createTableIfNotExists(knex, 'users', table => {
  table
    .uuid('id')
    .notNullable()
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))

  table
    .string('email')
    .unique()
    .notNullable()

  table
    .string('username')
    .unique()
    .notNullable()
    
  table.string('password').notNullable()

  table.integer('age').notNullable()

  table.decimal('money').defaultTo(0)

  table.string('bio', 500).defaultTo('Welcome!')

  table
    .uuid('addressId')
    .references('addresses.id')

  table.timestamp('dateJoined').defaultTo(knex.fn.now())
  table.timestamp('updatedAt').defaultTo(knex.fn.now())
})

exports.down = async knex => knex.schema.dropTableIfExists('users')
