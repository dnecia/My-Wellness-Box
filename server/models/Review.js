const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');



const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
            required: "Please leave a comment",
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        toJson: {
            getters: true,
        },
    }
);

reviewSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});

const Review = model("Review", reviewSchema);

module.exports = Review;
   