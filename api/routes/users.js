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

//get all users who fit a username
router.get("/search/:searchInput", async (req,res) =>{
    try{
        results = await User.find({ username: req.params.searchInput});
        res.status(200).json(results);
    } catch(err){
        res.status(500).json("No possible users");
    }
})

//follow a user
router.put("/:targetId/follow", async (req, res) => {
    console.log(req.body.followerId)
    console.log(req.params.targetId)
    if(req.body.followerId !== req.params.targetId){
        try {
            const followerId = req.body.followerId;
            const targetId = req.params.targetId;
            const target = await User.findById(targetId);
            const follower = await User.findById(followerId);
            if (!target.followers.includes(targetId)){
                await target.updateOne({$push:{ followers: followerId }});
                await follower.updateOne({$push:{ following: targetId }});
                res.status(200).json("user has been followed")
            } else{
                res.status(403).json("you already follow this user");
            }
        } catch(err){
            console.log(err)
            res.status(500).json("Server error");
        }
    } else{
        res.status(403).json("you cant follow yourself");
    }
})

//unfollow a user
router.put("/:targetId/unfollow", async (req, res) => {
    if(req.body.unfollowerId !== req.params.targetId){
        try {
            const unfollowerId = req.body.unfollowerId;
            const targetId = req.params.targetId;
            const target = await User.findById(targetId);
            const unfollower = await User.findById(unfollowerId);
            if (target.followers.includes(unfollowerId)){
                await target.updateOne({$pull:{ followers: unfollowerId }});
                await unfollower.updateOne({$pull:{ following: targetId }});
                res.status(200).json("user has been unfollowed")
            } else{
                res.status(403).json("you already dont follow this user");
            }
        } catch(err){
            res.status(500).json(err);
        }
    } else{
        res.status(403).json("you can't unfollow yourself");
    }
})
module.exports = router