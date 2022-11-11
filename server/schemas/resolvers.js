const {User} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken}= require('../utils/auth');

const resolvers = {
    Query: {
      //get logged in user data.
      me: async (parent, args, context)=>{
        if(context.user){
          const userData = await User.findOne({ _id: context.user._id})
          .select('-__v -password')
          return userData
        }
        throw new AuthenticationError('not logged in')
      },
      // get all users.
      users: async()=>{
        return User.find()
          .select('-__v -password')
      },
      //get single user by username.
      user: async (parent, {username})=>{
        return User.findOne({username})
          .select('-__v -password');
      }
    },
    Mutation:{
      addUser: async (parent, args)=>{
        const user =await User.create(args);
        const token= signToken(user);

        return{token,user}
      }
    }
  };
  
  module.exports = resolvers;

