import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Header(){
    const {currentUser, updateUser} = useContext(AuthContext);

    return (
        <div className="header">
            <header className="flex shadow-md">
                <div className="flex justify-between items-center max-w-10xl mx-auto p-2">
                    <Link to={"/"}>
                        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                            <span className="text-orange-400">Indie</span>
                            <span className="text-orange-600">Connect</span>
                        </h1>
                    </Link>
                    <form>
                        <input type="text" placeholder="Search..." className="" />
                    </form>
                    <h1>{currentUser?.userInfo?.username || null}</h1>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Link to={"/profile"}>
                            <img src={currentUser?.userInfo?.avatar || "/default.jpg"} alt="" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}