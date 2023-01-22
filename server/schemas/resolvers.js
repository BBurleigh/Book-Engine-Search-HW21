const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, _id , context) => {
            if (context.user) {
            const searchId = await User.findOne({ _id: context.user._id })
            .select("-__v -password");
            return searchId;
            }
        throw new AuthenticationError('You need to be logged in!');
        }
    },
    
    Mutation: {

    }
}



module.exports = resolvers;