const db = require("../config/connection");
const {User, Sub} = require("../models");

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
        process.exit(0);
    }

    console.log('all done!');
    process.exit(0);
})