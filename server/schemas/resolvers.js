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

        addProfile: async (parent, { name, email, password }) => {
            const newUser = await User.create({ name, email, password });
            const token = signToken(newUser);
            return { token, newUser};
        },

        login: async (parent, { email, password }) => {
            const currentUser = await User.findOne({ email });

            if (!profile) {
                throw new AuthenticationError('No user found with this email!');
            }

            const correctPw = await currentUser.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(currentUser);
            return { token, currentUser };
        },

        saveBook: async (parent, { userId, bookData }, context) => {
            if (context.user) {
                return User.findOneAndUpdate( { _id: userId },
                { $addToSet: {book: booData} },
                { new: true, runValidators: true }    
                );
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async (parent, { book }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate( { _id: context.user._id },
                {$pull: {savedBooks: book }},
                {new: true}
                );
                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};



module.exports = resolvers;