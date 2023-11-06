import "./topbar.css"
import {Search, Person} from '@mui/icons-material';
import {Link} from "react-router-dom"
import {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext.js"

export default function Topbar() {
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">Chatapp</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcons"/>
            <input placeholder="Look for friends!" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
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

