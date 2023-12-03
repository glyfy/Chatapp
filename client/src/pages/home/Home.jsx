import "./home.css"
import Topbar from "../../components/topbar/Topbar.jsx"
import Conversation from "../../components/conversation/Conversation.jsx"
import Message from "../../components/message/Message.jsx"
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import { axiosInstance } from "../../axios.js"
import { io } from "socket.io-client"

export default function Home() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {user} = useContext(AuthContext);
    const scrollRef = useRef(null);
    const socket = useRef();

    // set up socket connection
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        return () => socket.current?.disconnect(); 
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", {userId: user._id, username: user.username}) // add user on socket server
        socket.current.on("getUsers", users =>{
            // console.log(users)
            // setOnlineFriends(user.following.filter((u) => users.some(socketUser => u === socketUser.userId))); // get all online followings
            setOnlineFriends(users.filter((u) => user.following.includes(u.userId)))
        })
    }, [user])

    // get conversations
    useEffect(()=>{
        const getConversations = async () => { 
            try {
                const res = await axiosInstance.get(`/conversations/${user._id}`)
                setConversations(res.data)
            } catch(err){
                console.log("Failed to fetch data")
            }
        };
        getConversations()
    }, [user._id])

    // get messages for current conversation
    useEffect(() => {
        const getMessages = async () => {
            console.log(currentChat)
            const res = await axiosInstance(`/messages/${currentChat?._id}`);
            // console.log(res.data)
            setMessages(res.data)
        };
        getMessages();
    }, [currentChat])

    // scroll down chat messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [currentChat])

    // send message
    const handleSubmit = async () => {
        try{
            if (newMessage){
                const message = {
                    conversationId : currentChat._id,
                    sender : user._id,
                    text: newMessage    
                }
                const res = await axiosInstance.post("/messages/", message)
                socket.current.emit("sendMsg", ({
                    receiverId: currentChat.members.filter(member => member.user_id !== user.user_id),
                    msg: newMessage
                }))
                setMessages([...messages, res.data])
                setNewMessage("")
            } 
        }catch(err){
            console.log(err.message)
        }
       
    } 
    
    return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)} className="a">
                            <Conversation conversation={c} currentUser={user} key={c._id}/>
                        </div>
                        ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat?
                        <>
                        <div className="chatBoxTop">
                            { messages.map((m) => (
                                <div ref={scrollRef}>
                                    <Message message={m} own={m.sender === user._id} key={m._id}/>
                                </div>
                            ))
                            }
                        </div>
                        <div className="chatBoxBottom">
                            <textarea 
                                className="chatBoxInput" 
                                placeholder="Write something back..."
                                onChange={(e) => setNewMessage(e.target.value)}
                            ></textarea>
                            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                        </div></> : 
                        (<span className="noConversationText">Open a conversation to start a chat</span>)
                    }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineFriends={onlineFriends} currentUserId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
    </>
    )
}