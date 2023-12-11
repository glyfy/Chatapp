const io = require("socket.io")(8900,{
    cors:{
        origin:"https://chatapp-glyfy.netlify.app"
    }
});

console.log("Socket working!")

let users = []
// add users function
const addUser = (userId, socketId, username) => {
    !users.some((user) => user.userId === userId) && 
    users.push({socketId, userId, username})
}

// remove users function
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId != socketId)
}

// get a user's socketID
const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    console.log("a user connected")
    // new user comes online 
    socket.on("addUser", (data) => {
        console.log("adding new user")
        console.log(data)
        addUser(data.userId, socket.id, data.username)
        io.emit("getUsers", users)
    })
    // user disconnects 
    socket.on("disconnect", (data) => {
        console.log("removing user")
        removeUser(socket.id)
        console.log("a user disconnected");
        io.emit("getUsers", users)
    });
    // user sends message to another user
    socket.on("sendMsg", ({receiverId, msg}) => {
        const receiver = getUser(receiverId)
        if (receiver){
            receiverSocketId = receiver.socketId
            console.log(`sending message to ${receiver.username}`)
            io.to(receiverSocketId).emit("receiveMsg", msg)
        }
    })
});

