const express = require("express");
const app = express();
const port = process.env.PORT || 3001; 
const mongoose = require('mongoose'); //interacting with mongoDB 
const dotenv = require("dotenv"); 
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const userRoute = require('./routes/users');
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const path = require("path");
const multer = require("multer");
const { json, cookie } = require("express/lib/response");
//for creating session inside client browser
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


dotenv.config();
// console.log(process.env.MONGO_URL)
mongoose.connect( process.env.MONGO_URL, 
  {useNewURLParser: true}, 
  (err) => {
    if (err){
      console.log("Failed to connect")
    }
    else {
      console.log("Connected to MongoDB");
    }
});
console.log(mongoose.connection.readyState)
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());

//create sessions
app.use(cors({
  origin:
  ["http://localhost:3000"],
  methods:["GET", "POST", "PUT"],
  credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  key:"userID",
  secret:"jevi",
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: 60 * 60 * 24 * 1000
  }
}))

//some security stuff
//app.use(helmet());
app.use(morgan("common"));

//routes 
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

//get backend running
var listener = app.listen(port, function(){
  console.log('Listening on port ' + listener.address().port);
});