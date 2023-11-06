import "./chatOnline.css"

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" 
            src="images/handsome_chinese_fella.jpg" 
            alt="" 
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Xiao Ming</span>
      </div>
      
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" 
            src="images/handsome_chinese_fella.jpg" 
            alt="" 
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Xiao Ming</span>
      </div>

      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" 
            src="images/handsome_chinese_fella.jpg" 
            alt="" 
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Xiao Ming</span>
      </div>
    </div>
  )
}
