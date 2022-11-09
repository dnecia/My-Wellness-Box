const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const subSchema = new Schema ({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    sub_date: {
        type: Date,
        required: true,
    },
    paid_amount: {
        type: Number,
    },
    //sub: [{type: Schema.Types.ObjectId, ref: "Product"}],

});

const Sub = model("Sub", subSchema);

module.exports = Sub;