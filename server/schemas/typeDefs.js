// import the gql tagged template function
const { gql } = require('apollo-server-express');


const typeDefs = gql`

    type User {
     username: String
     email: String
     friendCount: Int
     reviews: [Review]
     friends: [User]
    }
    
    type Review {
        _id: ID
        reviewText: String
        createdAt: String
        username: String
        commentCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentBody: String
        createdAt: String
        username: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        reviews(username: String): [Review]
        review(_id: ID!): Review
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addReview(reviewText: String!): Review
        addComment(commentId: ID!, commentBody: String!): Review
        addFriend(friendId: ID!): User
    }
    
`;







module.exports = typeDefs;