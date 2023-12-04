// actions given to dispatch get redirected here to update the state
// state is the current state maintained by useReducer
export const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false 
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return{
                user: false,
                isFetching: false,
                error: action.payload
            }
        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                error: false
            }
        case "FOLLOW":
            return{
                ...state,
                user: {
                    ...state.user,
                    following:[...state.user.following, action.payload],
                }
            }
        case "UNFOLLOW":
            return{
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter(userId => userId !== action.payload),
                }
            }
    }
}