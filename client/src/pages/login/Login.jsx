import loginStyles from "./login.module.css"
import {useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import {Link} from "react-router-dom";
// import { login } from "../../firebase";

export default function Login() {
    const username = useRef(); //reference to the jsx element
    const password = useRef();
    const context = useContext(AuthContext); 
    const {user, dispatch} = useContext(AuthContext); 
    const [userErr, setUserErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      const userCredentials = {username: username.current.value, password: password.current.value};
      const res = await loginCall(dispatch, userCredentials);
    }
    return (
        <div className={loginStyles.login} > 
          <div className={loginStyles.loginWrapper}>
            <div className={loginStyles.loginLeft}>
              <h3 className={loginStyles.loginLogo}>DoChat</h3>
              <span className={loginStyles.loginDesc}>Chat with random people!</span>
            </div>
            <div className={loginStyles.loginRight}>
              <form className={loginStyles.loginBox} onSubmit={handleLogin}>
                <input placeholder="Username" className={loginStyles.loginInput} ref={username}/>
                <input placeholder="Password" type = "password" className={loginStyles.loginInput} ref={password}/>
                <button className={loginStyles.loginButton}>Log In</button>
                <Link to={"/register"}> 
                  <button className={loginStyles.loginRegisterButton}>Create New Account</button> 
                </Link> 
              </form>
            </div>
          </div>
        </div>
  )
}
