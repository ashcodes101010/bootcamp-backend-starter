const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    login(email: String!, password: String!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
    createItem(input: ItemInput): Item!
    createCart(input: CartInput): Cart!
  }

  type Query {
    allUsers: [User!]!
    allItems: [Item!]!
    user(id: ID!): User!
    item(id: ID!): Item!
    searchItems(input: String!, tags: [String!]!): [Item!]!
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
    itemsBought: [Item!]
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
    createdAt: String!
    updatedAt: String!
    reviews: [Review!]
  }
 
  type Tag {
    tag: String!
  }
 
  type Review {
    id: ID!
    buyer: User!
    item: Item!
    review: String!
    rating: Int!
  }
 
  type Transaction {
    itemsBought: [Item!]!
    timeBought: String!
    buyer: User!
  }
 
  type Cart {
    user: User!
    items: [Item!]!
  }
 
  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: String!
  }
 
  type RegisterInput {
    username: String!
    password: String!
    email: String!
    age: Int!
    money: Float!
  }
 
  type ItemInput {
    sellerId: String!
    name: String!
    imgUrl: String!
    description: String!
    price: Float!
    tags: [String!]
    soldOut: Boolean!
    stock: Int!
  }
 
  type CartInput {
    userId: String!
    itemId: [String!]!
  }
 
  type ReviewInput {
    buyerId: String!
    itemId: String!
    comment: String!
    rating: Int!
  }
 
  type TransactionInput {
    itemsBoughtId: String!
    buyerId: String!
    sellersId: [String!]!
  }
 
  type AuthReturn {
    token: String!
    user: User!
  }
 
  input RegisterInput {
    email: String!
    username: String!
    age: Int!
    password: String!
  }
  input AddressInput {
    street: String!
    city: String!
    state: String
    zip: String
    country: String!
  }
`
