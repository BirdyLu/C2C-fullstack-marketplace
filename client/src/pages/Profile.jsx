import React, { useContext } from "react";
import api_request from "../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Profile(){
    const navigate = useNavigate();
    const {currentUser, updateUser} = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api_request.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    };

    // user display elements
    const userAvatar = currentUser?.userInfo?.avatar || "/default.jpg";
    const userName = currentUser?.userInfo?.username || "You haven't logged in";
    const userEmail = currentUser?.userInfo?.email || "You haven't logged in";

    return (
        <div className="profile-page">
            <div>
                <button onClick={handleLogout} className="mx-3">Log out</button>
            </div>
            <div>
                <Link to={"/update-profile"}>
                    <button className="mx-3">Update Profile</button>
                </Link>
            </div>

            <div className="user">
                <img src={userAvatar} alt="" className="max-w-32"/>
                <h1>{userName}</h1>
                <h1>{userEmail}</h1>
            </div>
        </div>
    );
}