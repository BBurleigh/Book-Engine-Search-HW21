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

}

type Mutation {

}
`;

module.exports = typeDefs;