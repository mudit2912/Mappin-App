const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//register new user

router.post("/register", async (req, res)=> {
    try {
        // generate new passowrd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch(err) {
        res.status(500).json(err)
    }
});

router.post("/login", async( req, res) => {
    try {
        // Find User
        const user = await User.findOne({username: req.body.username})
        !user &&  res.status(400).json("Wrong Username or password");
        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validpassword && res.status(400).json("Wrong username or password");

        //send res
        res.status(200).json({ _id: user._id, username: username})
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router;



//login