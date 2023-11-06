const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res)=> {
    try { 
        console.log(req.body)
        const salt = await bcrypt.genSalt(10); 
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
    
        const username = await User.findOne({username: req.body.username}).exec();

        if (username) {
            res.status(404).json("Username already taken")
        }
        else{
            const newUser = new User({
                username: req.body.username,
                password: hashedpassword
            }) 
            await newUser.save()
            res.status(200).json("User registered!")
        }
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        user = await User.findOne({username: req.body.username})
        let valid_password = ''
        if (user){
            valid_password = await bcrypt.compare(req.body.password, user?.password)
        }
        if (!user){
            return res.status(404).json("User not found")
        }
        if (!valid_password){
            return res.status(404).json("Wrong password")
        }
        if (user && valid_password){
            console.log("HERE")
            req.session.user = user
            return res.status(200).json(user)
        }
    } catch(err) {
        console.log(err)
        res.status(500).json("Server error")
    }
})

module.exports = router;