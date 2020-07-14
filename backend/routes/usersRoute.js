const router = require("express").Router();
let User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Handle get request for for all users
router.get("/", (req, res) => {
    User.find()
        //Return users in JSON format
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle get GET request for specific id
router.get("/:id", (req,res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle POST request to register a user
router.post("/register", async (req, res) => {
    
    //Create salt and hash password before posting
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    
    const username = req.body.username;
    const password = hashedPass;
    const email = req.body.email.toLowerCase();
    const points = req.body.points;


    //Create the new user with hashed pass
    const newUser = new User(
        {
            username, 
            password, 
            email, 
            points,

         });

         
    //Save the user to the database
    newUser.save()
        .then(() => res.json(newUser.id))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle the login 
router.post("/login",  async (req, res) => {

    //Check to see if the username exists
    const user =  await User.findOne({username: req.body.username})
    //Compare the password the user enters with the actual hashed pass
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(validPass) {
        //Create token to keep track of login
        const token = jwt.sign({username: user.username}, process.env.TOKEN);
        res.header("auth-token", token).send(token);
    }
    else {
        //Send error if it's the wrong password
        return res.status(400).send("Felaktigt lösenord!");

    }
});

//Handle DELETE request for specific id
router.delete("/delete/:id", (req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;