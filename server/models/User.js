const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Invalid email format"],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
      reviews: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );
  
  // set up pre-save middleware to create password, hashing password in mongoose
  userSchema.pre("save", async function (next) {
    // we check to see if the data is new or if the password has been modified.
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
  const User = model("User", userSchema);
  
  module.exports = User;
  