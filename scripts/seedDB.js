const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern");

const userSeed = [
    {
        email: "user1@email.com",
        username: "dude",
        role: "guest",
        password: "1234"
    },
    {
        email: "user2@email.com",
        username: "dudette",
        role: "admin",
        password: "1234"
    },
    {
        email: "user3@email.com",
        username: "madeline",
        role: "admin",
        password: "1234"
    },
    {
        email: "user4@email.com",
        username: "johnny",
        role: "guest",
        password: "1234"
    },
    {
        email: "user5@email.com",
        username: "suzy",
        role: "admin",
        password: "1234"
    }
];

db.User
    .remove({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(data => {
            console.log(data.result.length + " records inserted!");
            process.exit(0);
        })
        .catch(err => {
            console.log(error);
            process.exit(1);    
        })