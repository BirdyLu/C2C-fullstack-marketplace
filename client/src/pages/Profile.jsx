import React from "react";
import api_request from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            const res = api_request.post("/auth/logout");

            navigate("/");
        } catch(err) {
            console.log(err);
            
        }
    }

    return (
        <div className="profile-page">
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
}