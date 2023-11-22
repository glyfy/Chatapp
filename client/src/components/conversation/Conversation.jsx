import "./conversation.css"
import {axiosInstance} from "../../axios.js"
import {useState, useEffect} from "react"

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState({})
  useEffect(()=>{
    const friendId = conversation.members.find((userId) => userId !== currentUser._id)
    const getUser = async () => {
      try {
        const res = await axiosInstance(`/users/${friendId}`)
        setUser(res.data)
      } catch(err){
        console.log("Cannot find user")
      }
    }
    getUser()
  }, [currentUser, conversation])
  return (
    <div className="conversation">
        <img 
            src={user.profilePicture ? user.profilePicture: "/images/noavatar.png"}
            alt="" 
            className="conversationImg" 
        />
        <span className="conversationName">{user.username}</span>
    </div>
  )
}
