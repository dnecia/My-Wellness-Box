const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match a valid e-mail address"]

    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    address: [{
        address1: {
            type: String,
            required: true,
            trim: true,
        },
        address2: {
            type: String,
            required: false,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        postalcode: {
            type: Number,
            required: true,
            trim: true,
        },
        
    },
    ],
    subscription_option: {
        sub_choice: {
            type: String,
        },
    },
});
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next ();
}); 

userSchema.methods.isCorePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
