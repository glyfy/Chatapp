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
    const menuInputRef = useRef("")
    const socket = useRef();
    console.log(conversations)
    console.log(currentChat);
    // set up socket connection
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        return () => socket.current?.disconnect(); 
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", {userId: user._id, username: user.username}) // add user on socket server
        socket.current.on("getUsers", users =>{
            setOnlineFriends(users.filter((u) => user.following.includes(u.userId)))
        })
        socket.current.on("receiveMsg", msg =>{
            console.log(currentChat)
            if (currentChat?._id === msg.conversationId){
                setMessages(prev => [...prev, msg])
            }
        })
    }, [user, currentChat])

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
            const res = await axiosInstance(`/messages/${currentChat?._id}`);
            setMessages(res.data)
        };
        getMessages();
    }, [currentChat])

    // scroll down chat messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [messages])

    // send message
    const handleSubmit = async () => {
        try{
            if (newMessage){
                const message = {
                    conversationId : currentChat._id,
                    sender : user._id,
                    text: newMessage    
                }
                const res1 = await axiosInstance.put(`/conversations/updateTime/${currentChat._id}/${new Date().toISOString()}`)
                const res = await axiosInstance.post("/messages/", message);
                socket.current.emit("sendMsg", ({
                    receiverId: currentChat.members.find(member => member !== user._id),
                    msg: res.data
                }))
                console.log(res.data)
                setMessages(prev => [...prev, res.data]);
                // setCurrentChat(res1.data);
            } 
        }catch(err){
            console.log(err.message)
        }
       
    } 
    
    const handleMenuSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axiosInstance.get(`conversations/${user._id}?searchInput=${menuInputRef.current.value}`);
            const conversations = res.data;
            setConversations(conversations);
        } catch(err){
            console.log(err.msg);
        }
        
    }
    
    return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <form className="chatMenuForm" onSubmit={handleMenuSubmit}>      
                        <input className="chatMenuInput" placeholder="Search for friends" ref={menuInputRef}/>
                        {conversations.map((c) => (
                            <div key={c._id} onClick={() => setCurrentChat(c)} className="a">
                                <Conversation conversation={c} currentUser={user} key={c._id}/>
                            </div>
                            ))}
                    </form>  
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