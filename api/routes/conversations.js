const router = require('express').Router();
const Conversation = require("../models/Conversation");
const bcrypt = require("bcrypt");

// new conv
router.post("/", async (req,res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId]
    })

    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all conversations of user
router.get("/:userId", async (req,res) => {
    console.log(req.params.userId)
    try{
        const conversation = await Conversation.find({
            members:{$in: [req.params.userId]},
        })
        res.status(200).json(conversation) 
    }catch(err){
        res.status(500).json(err.message)
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
module.exports = router;