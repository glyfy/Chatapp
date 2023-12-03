import "./topbar.css"
import {Search, Person} from '@mui/icons-material'
import {useHistory, Link} from "react-router-dom"
import {useContext, useEffect} from 'react'
import {AuthContext} from "../../context/AuthContext.js"
import {logOut} from "../../apiCalls"

export default function Topbar() {
  const {dispatch, user} = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    logOut(dispatch); 
  }
  const searchUser = () => {
    history.push('/searchResults');
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
              <input type="text" placeholder="Look for friends!" className="searchInput" />
            </form>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span onClick={handleLogout} className="topbarLink">Logout</span>
          </div>
          <div className="topBarIcons">
            <div className="topbarIconItem">
              <Person/>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww" alt="" className="topbarImg" />
        </div>
    </div>
  )
}

