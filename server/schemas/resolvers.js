const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        }
    }
}

module.exports = resolvers;