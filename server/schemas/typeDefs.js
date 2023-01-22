const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: string
    email: string
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID!
    title: String!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
}

input savedBook {
    title: String!
    authors: [String]
    description: String!
    bookId: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    deleteBook(bookId: ID!): User
}
`;

module.exports = typeDefs;