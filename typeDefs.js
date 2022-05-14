// Type definitions
const { gql } = require('apollo-server-express');
/**
 *
 * Here `hello` is an endpoint which returns a string.
 * type Query {
 *   hello: String
 * }
 *
 * -----
 *
 * type User {
 *   name: String!
 * }
 *
 * type Mutation {
 *   setMessage(message: String): String
 *   createUser(name: String!): User
 * }
 */
const typeDefs = gql`
  scalar DateTime

  type Post {
    id: ID
    title: String
    description: String
    createdAt: DateTime
  }

  type Query {
    hello: String
    getAllPosts: [Post]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = typeDefs;
