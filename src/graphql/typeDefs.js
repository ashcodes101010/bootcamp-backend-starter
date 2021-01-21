const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    login(email: String!, password: String!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
    updatePass(id: ID!, password: String!): User!
    addMoney(id: ID!, money: Float!): User!

    addCartItem(input: CartInput): Cart!
    removeCartItem(id: ID!): Cart!

    decrementStock(id: ID!): Item!
    updateItem(id: ID!, input: ItemInput!): Item!
    createItem(input: ItemInput!): Item!
    deleteItem(id: ID!): Item!
  }

  type Query {
    allUsers: [User!]!
    allItems: [Item!]!
    transaction(id: ID!): Transaction!
    user(id: ID!): User!
    item(id: ID!): Item!
    cart(id: ID!): [Cart!]! 
    searchItems(input: String!): [Item!]! 
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    age: Int!
    dateJoined: String!
    updatedAt: String!
    money: Float!
    cart: [Item!]
    itemsSelling: [Item!]
    transactions: [Transaction!]
    reviewsWritten: [Review!]
    reviewsReceived: [Review!]!
    address: Address
  }
 
  type Item {
    id: ID!
    seller: User!
    name: String!
    imgUrl: String!
    description: String!
    price: Float!
    tags: [Tag!]!
    soldOut: Boolean!
    stock: Int!
    deleted: Boolean!
    createdAt: String!
    updatedAt: String!
    reviews: [Review!]
  }
 
  type Tag {
    tag: String!
  }

  input TagInput {
    tag: String!
  }
 
  type Review {
    id: ID!
    buyer: User!
    item: Item!
    comment: String!
    rating: Int!
  }
 
  type Transaction {
    id: ID!
    item: Item!
    boughtAt: String!
    buyer: User!
  }
 
  type Cart {
    id: ID!
    user: User!
    item: Item!
  }
 
  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: String!
  }
 
  input ItemInput {
    sellerId: String!
    name: String!
    imgUrl: String!
    description: String!
    price: Float!
    tags: [TagInput!]!
    stock: Int!
  }
 
  input CartInput {
    userId: ID!
    itemId: ID!
  }
 
  input ReviewInput {
    buyerId: String!
    itemId: String!
    comment: String!
    rating: Int!
  }
 
  input TransactionInput {
    itemId: String!
    buyerId: String!
    sellersId: [String!]!
  }
 
  type AuthReturn {
    token: String!
    user: User!
  }
 
  input AddressInput {
    street: String!
    city: String!
    state: String
    zip: String
    country: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    age: Int!
    password: String!
    address: AddressInput!
  }
`
