const {User, Review} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken}= require('../utils/auth');

const resolvers = {
  Query: {
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
    user: async (parent, {username})=>{
      return User.findOne({username})
        .select('-__v -password')
        .populate("friends")
        .populate("reviews");
    },
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    review: async (parent, { _id }) => {
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
    login: async (parent, {email, password})=>{
      const user= await User.findOne({email});
      //if no user found with that email, then throw error.
      if (!user){
        throw new AuthenticationError('Wrong credentials')
      }

      const correctPw=await user.isCorrectPassword(password);
      //if password isn't correct, then throw error.
      if(!correctPw){
        throw new AuthenticationError('Wrong credentials')
      }

      const token= signToken(user);
      return{token,user}
    },
    addReview: async (parent, args, context) => {
      if (context.user) {
        const review = await Review.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          {_id: context.user._id},
          { $push: { reviews: review._id } },
          { new: true }
        );

        return review;
      } 

      throw new AuthenticationError ('Please Log In');
    },
    addComment: async (parent, { reviewId, commentBody }, context) => {
      if (context.user) {
        const updateReview = await Review.findOneAndUpdate(
          {_id: reviewId },
          { $push: { comments: { commentBody, username: context.user.username }}},
          { new: true, runValidators: true }
        );

        return updatedReview;
      }

      throw new AuthenticationError('Please Log in');
                
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;

      }
      throw new AuthenticationError('Please Log in');
       
     
    }


  }
};
  
module.exports = resolvers;

