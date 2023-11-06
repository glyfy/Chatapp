import {axiosInstance} from "./axios.js";
import {LoginStart, LoginSuccess, LoginFailure, LogOut} from "./context/AuthActions";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";

export const loginCall = async (dispatch, userCredential) => {
    dispatch(LoginStart())
    try {
        const res = await axiosInstance.post("/auth/login", userCredential);
        console.log(res);
        dispatch(LoginSuccess(res.data))
        return "success"
    } catch(err) { 
        dispatch(LoginFailure(err))
        return err.response.data
    }
}

export const logOut = (dispatch) => {
    dispatch(LogOut())
}

