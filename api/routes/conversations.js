const router = require('express').Router();
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// new conv
router.post("/", async (req,res)=>{
    try{
        const existingConversation = await Conversation.find({ members: { $all: [req.body.userId1, req.body.userId2] }})
        console.log(existingConversation.length)
        if (existingConversation.length > 0){ // if there is existing conversation
            return res.status(200).json("Conversation already exists")
        } else{
            const newConversation = new Conversation({
                members:[req.body.userId1, req.body.userId2]
            })
            const savedConversation = await newConversation.save()
            return res.status(200).json(savedConversation)
        }

    }catch(err){
        return res.status(500).json(err)
    }
})

//get all conversations of user
router.get("/:userId", async (req,res) => {
    try{
        if (req.query.searchInput){ // find users that currentUser is following
            const users = await User.find({ 
                username: new RegExp(req.query.searchInput, 'i'), 
                followed: { $in: [req.params.userId]} 
            });
            if (users.length !== 0){
                const userIds = users.map(user => user._id.toString()); 
                console.log(userIds)
                const conversations = await Conversation.find({members: {$in: userIds}}).sort({newestCommentTime: -1});
                console.log(conversations)
                return res.status(200).json(conversations);
            } else{
                return res.status(404).json("No friends matching search query")
            }
        } else{
            const conversation = await Conversation.find({
                members:{$in: [req.params.userId]},
            }).sort({newestCommentTime: -1}).limit(10);
            return res.status(200).json(conversation);
        }
 
    }catch(err){
        res.status(500).json(err.message);
    }
})

//get one specific conversation between two users
router.get("/:Id1/:Id2", async (req,res) => {
    try{
        const conversation = await Conversation.find({
            members:{$in: [req.params.Id1, req.params.Id2]},
        })
        res.status(200).json(conversation) 
    }catch(err){
        res.status(500).json(err.message)
    }
})

// update conversation to latest time stamp
router.put("/updateTime/:conversationId/:time", async (req,res) =>{
    console.log(req.params.time)
    try{
        const conversation = await Conversation.findOneAndUpdate(
            {_id: req.params.conversationId}, 
            {newestCommentTime: req.params.time},
            {new: true});
        console.log(conversation.newestCommentTime);
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err.message)
    }
})
module.exports = router;