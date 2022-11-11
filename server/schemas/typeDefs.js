// import the gql tagged template function
const { gql } = require('apollo-server-express');


const typeDefs = gql`

type User{
    first_name: String!,
    last_name: String!,
    username: String!,
    email: String!
},
type Query{
    me: User,
    users: [User],
    user(username: String!): User
    
}
type Mutation{

}
`;






module.exports = typeDefs;