import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Layout(){
    return (
        <div className="layout">
            <Header />

            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

function RequireAuth(){
    const {currentUser} = useContext(AuthContext);

    return (!currentUser) ? (
        <Navigate to={"/sign-in"} />
    ) : (
        currentUser && (
            <div className="layout">
                <Header />

                <div className="content">
                    <Outlet />
                </div>
            </div>
        )
    )
}

export {Layout, RequireAuth}