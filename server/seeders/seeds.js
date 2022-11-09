const db = require("../config/connection");
const {User, Sub} = require("../models");
const userSeeds = require("./userSeeds.json");
const subSeeds = require("./subSeeds.json");

db.once('open', async () => {
    try {
     await User.deleteMany({});
     await Sub.deleteMany({});
     const users = await User.create(userSeeds);
     subSeeds.map((sub)=> {
        sub.customer = users[0]._id;
        return;
     });
     await Sub.create(subSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
})