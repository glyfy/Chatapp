import "./topbar.css"
import {Search, Person} from '@mui/icons-material'
import {useHistory, Link} from "react-router-dom"
import {useContext, useEffect, useRef} from 'react'
import {AuthContext} from "../../context/AuthContext.js"
import {logOut} from "../../apiCalls"

export default function Topbar() {
  const {dispatch, user} = useContext(AuthContext);
  const history = useHistory();
  const queryRef = useRef("")

  const handleLogout = (e) => {
    e.preventDefault();
    logOut(dispatch); 
  }

  const searchUser = (e) => {
    e.preventDefault();
    history.push(`/searchResults?query=${queryRef.current.value}`);
  };

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" className="homeLink">
            <span className="logo">Chatapp</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcons"/>
            <form onSubmit={searchUser} className="submitForm">
              <input type="text" placeholder="Look for friends!" className="searchInput" ref={queryRef}/>
            </form>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span onClick={handleLogout} className="topbarLink">Logout</span>
          </div>
          <img src="/images/noAvatar.png" alt="" className="topbarImg" />
        </div>
    </div>
  )
}

