import {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext.js";
import {Follow, Unfollow} from "../../context/AuthActions.js";
import {axiosInstance} from "../../axios.js"
export default function Searchresult({user}) {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    // const [isFollowing, setIsFollowing] = useState(false)
    // console.log(currentUser.following)
    // console.log(user.followers)
    const handleClick = async () => {
        if (currentUser.following && currentUser.following.includes(user._id)){ // current user follows this user
            const res = await axiosInstance.put(`/users/unfollow/${user._id}`, {unfollowerId: currentUser._id});
            dispatch(Unfollow(user._id));
        } else {
            const res = await axiosInstance.put(`/users/follow/${user._id}`, {followerId: currentUser._id});
            const res1 = await axiosInstance.post(`/conversations/`, {userId1: currentUser._id, userId2: user._id});
            console.log(res1)
            dispatch(Follow(user._id));
        }
    }

    return (
    <>
        <div className="searchResult">
            <img src="/images/noAvatar.png" alt="" className="searchResultImg" />
            <span className="searchResultName">{user.username}</span>
            <div className="followButton" onClick={handleClick}>
            {
                currentUser.following && currentUser.following.includes(user._id)? "Unfollow": "Follow"
            }
            </div>
        </div>
    </>
    ) 
}
