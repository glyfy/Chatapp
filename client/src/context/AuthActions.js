//each action returns an object containing type and payload
//object is passed to dispatch function which updates context
export const LoginStart = () => ({
    type:"LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    type:"LOGIN_FAILURE",
    payload:error
});

export const LogOut = () => ({
    type:"LOGOUT"
})