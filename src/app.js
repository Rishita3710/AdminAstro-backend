const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');


//Create server instanse
const app = express();
app.use(cors())


require('./db/conn');
const User = require("./models/users");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// API to habdle user registration
app.post("/register", async (req, res) => {
    try {
        const id = req.body.loginId;
        const password = req.body.password;

        //Check for invalid id
        if (!id) {
            throw new Error('Invalid user id')
        }

        //Check for invalid password
        if (!password ||
            isNaN(password) ||
            password.length != 10) {
            throw new Error('Invalid user password')
        }

        //Check if user with this id already exits
        const user = await User.findOne({loginId : id}).exec();
        if(user){
            throw new Error("User details exits");
        }

        //Save entry to DB
        const registrationData = new User({
            loginId: id,
            password: password
        });
        const registered = await registrationData.save();
        console.log(`registred data is::`, registered);

        //Return success
        res.status(201).send();
    } catch (error) {
        console.log('Error while registering user', error);
        res.status(400).send({"error": error?.message});
    }
});

//API to handle user login
app.post("/login", async (req, res) => {
    try {
        const id = req.body.loginId;
        const password = req.body.password;

        //Check for invalid id
        if (!id) {
            throw new Error('Invalid user id')
        }

        //Check if user with this id not exits
        const user = await User.findOne({loginId : id}).exec();

        if(!user){
            throw new Error("This user is not registred");
        }

        if(user.password != password){
            throw new Error("Invalid password. Please try again");
        }

        //Return success
        res.status(200).send();
    } catch (error) {
        console.log('Error while login user', error);
        res.status(400).send({"error": error?.message});
    }
});


//Listen for server
app.listen(port, () => {
    console.log(`server is running at port no:: ${port}`);
})