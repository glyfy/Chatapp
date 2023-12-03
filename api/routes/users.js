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

//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userID !== req.params.id){
        try {
            const currID = req.body.userID;
            const otherID = req.params.id;
            const otherUser = await User.findById(otherID);
            const currUser = await User.findById(currID);
            if (!otherUser.followers.includes(currID)){
                await otherUser.updateOne({$push:{ followers: req.body.userID }});
                await currUser.updateOne({$push:{ following: req.params.id }});
                res.status(200).json("user has been followed")
            } else{
                res.status(403).json("you already follow this user");
            }
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("you cant follow yourself");
    }
})

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userID !== req.params.id){
        try {
            const currID = req.body.userID;
            const otherID = req.params.id;
            const otherUser = await User.findById(otherID);
            const currUser = await User.findById(currID);
            if (otherUser.followers.includes(currID)){
                await otherUser.updateOne({$pull:{ followers: req.body.userID }});
                await currUser.updateOne({$pull:{ following: req.params.id }});
                res.status(200).json("user has been unfollowed")
            } else{
                res.status(403).json("you already dont follow this user");
            }
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("you cant unfollow yourself");
    }
})
module.exports = router