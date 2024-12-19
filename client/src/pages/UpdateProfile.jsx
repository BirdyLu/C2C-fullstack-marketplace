import React, { useContext, useState } from "react";
import api_request from "../lib/apiRequest.js";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext(AuthContext);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // const formData = new FormData(e.target);

    if (!currentUser) {
        navigate("/sign-in"); // Redirect if not authenticated
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // const { username, email, password } = Object.fromEntries(formData.entries());
        const userID = currentUser?.userInfo?.id;
        const {username, email} = Object.fromEntries(formData.entries());

        try {
            const res = await api_request.put(`/users/${userID}`, { username, email }); // must send JSON, not form-data

            updateUser(res.data); // Update the context with the new user data

            setSuccess("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to update profile.");
        }
    };

    return (
        <div className="update-profile-page fixed w-screen min-h-screen flex justify-center bg-gray-100">
            {/* change avatar here */}
            <div className="profile-avatar w-32 h-32 object-cover rounded-full overflow-hidden mt-20 lg:mt-32" >
                <img src={currentUser?.userInfo?.avatar || "/default.jpg"} alt="" />
            </div>
            
            {/* change username or email address */}
            <div className="formContainer p-10 mt-20 lg:ml-10 lg:mt-32">
                <form
                    onSubmit={handleSubmit}
                    className="update-profile-form"
                >
                    <h1 className="text-2xl font-bold text-center mb-4">
                        Update Your Profile
                    </h1>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            defaultValue={currentUser?.userInfo?.username}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={currentUser?.userInfo?.email}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
}
