const db = require("../config/connection");
const { Review, User } = require("../models");
const faker = require('faker');

db.once('open', async () => {
 await Review.deleteMany({});
 await User.deleteMany({});

  const userData = [];

    for (let i = 0; i < 50; i += 1) {
     const username = faker.internet.userName();
     const email = faker.internet.email(username);
     const password = faker.internet.password();

     userData.push({ username, email, password });
    }

    //creating friends
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];
    
        let friendId = userId;
    
        while (friendId === userId) {
          const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
          friendId = createdUsers.ops[randomUserIndex];
        }
    
        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
    }
    
    //creating the reviews
    let createdReviews = [];
    for (let i = 0; i <100; i += 1) {
        const reviewText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];
        const createdReview = await Review.create({ reviewText, username});

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { reviews: createdReview._id } }
        );

        createdReviews.push(createdReview);

    }
    //creating comments

   
})