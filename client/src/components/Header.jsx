import React from "react";

export default function Header(){
    return (
        <header className="flex">
            <div className="flex justify-between items-center max-w-10xl mx-auto p-3">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-orange-400">Indie</span>
                    <span className="text-orange-600">Connect</span>
                </h1>
                <form>
                    <input type="text" placeholder="Search..." className="" />
                </form>
            </div>
        </header>
    );
}