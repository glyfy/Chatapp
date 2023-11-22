import "./message.css"
import {format} from "timeago.js"
export default function Messenger({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img
            className = "messageImg" 
             src="images/handsome_chinese_fella.jpg" 
             alt="" 
            />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
