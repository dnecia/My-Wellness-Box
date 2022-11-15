const {User, Review} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken}= require('../utils/auth');

const resolvers = {
    Query: {
      //get logged in user data.
      me: async (parent, args, context)=>{
        if(context.user){
           const userData = await User.findOne({ _id: context.user._id})
            .select('-__v -password')
            .populate("reviews")
            .populate("friends");

          return userData
        }
        throw new AuthenticationError('not logged in')
      },
      // get all users.
      users: async()=>{
        return User.find()
          .select('-__v -password')
          .populate("reviews")
          .populate("friends");
      },
      //get single user by username.
      user: async (parent, {username})=>{
        return User.findOne({username})
          .select('-__v -password')
          .populate("friends")
          .populate("thoughts");
      },
      reviews: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Review.find(params).sort({ createdAt: -1 });
      },
      thought: async (parent, { _id }) => {
        return Review.findOne({ _id });
      }
    },
    Mutation:{
      //creates new user.
      addUser: async (parent, args)=>{
        const user =await User.create(args);
        const token= signToken(user);

        return{token,user}
      },
      //finds user by email, and checks if password is correct. if both are correct, then login.
      login: async (parent, {email, password})=>{
        const user= await User.findOne({email});
        //if no user found with that email, then throw error.
        if (!user){
          throw new AuthenticationError('wrong credentials')
        }

        const correctPw=await user.isCorrectPassword(password);
        //if password isn't correct, then throw error.
        if(!correctPw){
          throw new AuthenticationError('wrong credentials')
        }

        const token= signToken(user);
        return{token,user}
      }
    }
  };
  
  module.exports = resolvers;

