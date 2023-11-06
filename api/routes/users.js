const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// get user
router.get("/:userId", async (req,res) =>{
    try{
        const user = await User.findOne({
            _id: req.params.userId
        })
        if (user){
            return res.status(200).json(user)
        } else{
            return res.status(404).json("User not found!")
        }
    }catch(err){
        res.status(500).json(err)
    }

})

module.exports = router