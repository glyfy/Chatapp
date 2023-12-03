import "./chatOnline.css"
import { axiosInstance } from "../../axios.js"

export default function ChatOnline({onlineFriends, currentUserId, setCurrentChat}) {
  const handleClick = async (friend) => {
    // console.log(currentUserId, friend.userId)
    const res = await axiosInstance.get(`/conversations/${currentUserId}/${friend.userId}`);
    setCurrentChat(res.data[0]);
  }
  return (
    <div className="chatOnline">
      { onlineFriends.map((friend) =>
      <div className="chatOnlineFriend" onClick={() => handleClick(friend)}>
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" 
            src={"/images/noAvatar.png"} 
            alt="" 
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{friend.username}</span>
      </div>  
      )}
    </div>
  )
}
