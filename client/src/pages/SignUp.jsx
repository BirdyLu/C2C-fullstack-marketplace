import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api_request from "../lib/apiRequest";

export default function SignUp(){
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const secretwish = formData.get("secretwish");

        try {
            const res = await api_request.post("/auth/register", {
                username, email, password, secretwish
            });
            navigate("/sign-in");
        } catch(err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-up-page fixed bg-[url('/background.png')] w-screen h-screen flex justify-center">
            <div className="formContainer p-10 mt-20 lg:ml-10 lg:mt-24">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold flex justify-center mb-5">Create an account</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" required minLength={7} maxLength={20} type="password" placeholder="Password" />
                    <input name="secretwish" type="text" placeholder="Make a wish... May Cyber bless you." className="italic"/>

                    <button disabled={isLoading}>Sign up now!</button>
                    {error && <span>{error}</span>}
                    <Link to="/sign-in" className="underline text-slate-400">I already have account</Link>
                </form>
            </div>
        </div>
    );
}