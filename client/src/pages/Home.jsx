import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Home(){
    

    return (
        <>
            <div>Home</div>
                <Link to={"/sign-in"} className="mr-3">
                    <button>Sign-in</button>
                </Link>
                <Link to={"/sign-up"} className="mr-3">
                    <button>Register</button>
                </Link>
                <Link to={"/profile"} className="mr-3">
                    <button>Profile</button>
                </Link>
                <Link to={"/update-profile"} className="mr-3">
                    <button>Update Profile</button>
                </Link>
                
        </>
    );
}