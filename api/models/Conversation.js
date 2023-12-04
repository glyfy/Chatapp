const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        }, 
        newestCommentTime: {
            type: Date,
            default: Date.now()
        }   
    }, 
    {timestamps: true}
); 

module.exports = mongoose.model("Conversation", ConversationSchema); 