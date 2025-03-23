import React from "react";

export default function ProfilePage({ children } 
: { children : React.ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            { children }
        </div>
    )
}