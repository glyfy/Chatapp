import registerStyles from "./register.module.css"
import {useContext, useRef  } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { axiosInstance } from "../../axios.js"

export default function Register() {
    const username = useRef(); //reference to the jsx element
    const password = useRef();
    const context = useContext(AuthContext); 
    const {user, isFetching, error, dispatch} = useContext(AuthContext); 
    const [userErr, setUserErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const history = useHistory()

    const handleRegister = async (e) => {
      e.preventDefault()
      try{
        const res = await axiosInstance.post("/auth/register", {username: username.current.value, password: password.current.value})
        console.log(res)
        if (res.data == "User registered!"){
          alert("You have successfully registered!")
          history.push("/login")
          return
        } 
      } catch(err) {
          console.log(err)
          if ( err.response.data == "Username already taken") {
            alert("Username has already been taken!")
            return
          } 
          if ( err.response.data == "Email already taken") {
            alert("Email has already been taken!")
            return
          } 
      }
    }

    return (
        <div className={registerStyles.login} > 
          <div className={registerStyles.loginWrapper}>
            <div className={registerStyles.loginLeft}>
              <h3 className={registerStyles.loginLogo}>DoChat</h3>
              <span className={registerStyles.loginDesc}>Chat with random people!</span>
            </div>
            <div className={registerStyles.loginRight}>
              <form className={registerStyles.loginBox} onSubmit={handleRegister}>
                <input placeholder="Username" className={registerStyles.loginInput} required minLength="1" ref={username}/>
                <input placeholder="Password" className={registerStyles.loginInput} required minLength="1"ref={password}/>
                <button className={registerStyles.loginButton}>Sign Up</button>
                <Link to={"/login"}> 
                  <button className={registerStyles.loginRegisterButton}>Log Into Your Account</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
  )
}
