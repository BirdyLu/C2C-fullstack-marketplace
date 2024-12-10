import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error); 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
            <p className="text-xl text-gray-700">The page you are looking for does not exist.</p>
            <p className="text-sm text-gray-500 mt-2">
                {error?.status}&nbsp;
                {error?.statusText || error?.message || "Something went wrong."}
            </p>
            <a href="/" className="mt-5 text-blue-500 underline">
                Go back to Home
            </a>
        </div>
    );
}
