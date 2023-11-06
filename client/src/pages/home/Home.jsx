import "./home.css"
import Topbar from "../../components/topbar/Topbar.jsx"
import Conversation from "../../components/conversation/Conversation.jsx"
import Message from "../../components/message/Message.jsx"
import ChatOnline from "../../components/chatOnline/ChatOnline.jsx"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext"
import { axiosInstance } from "../../axios.js"
export default function Home() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]) 
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        const getConversations = async () => {
            try {
                const res = await axiosInstance.get(`/conversations/${user._id}`)
                // console.log(res.data)
                setConversations(res.data)
            } catch(err){
                console.log("Failed to fetch data")
            }
        }
        getConversations()
    }, [user._id])
    return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <Conversation conversation={c} currentUser={user} key={c._id}/>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatBoxInput" placeholder="Write something back..."></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                </div>
            </div>
        </div>
    </>
    )
}