import "./message.css"

export default function Messenger({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img
            className = "messageImg" 
             src="images/handsome_chinese_fella.jpg" 
             alt="" 
            />
            <p className="messageText">Hello this is message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}
