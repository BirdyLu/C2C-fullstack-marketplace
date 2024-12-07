import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api_request from "../lib/apiRequest";

export default function SignIn(){
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await api_request.post("/auth/login", {
                email, password
            });
            localStorage.setItem("user", JSON.stringify(res.data));

            navigate("/profile");
        } catch(err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-in-page fixed bg-[url('/background.png')] w-screen h-screen flex justify-center">
            <div className="formContainer p-10 mt-20 lg:ml-10 lg:mt-24">
                <form className="sign-in-form" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold flex justify-center mb-5">
                        Welcome back
                    </h1>
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>
                        Log me in!
                    </button>
                    {error && <span>{error}</span>}
                    <Link to="/sign-up" className="underline text-slate-400">
                        I don't have an account
                    </Link>
                </form>
            </div>
        </div>
    );
}
