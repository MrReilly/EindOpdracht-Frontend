import React from "react";
import '../../App.css'
import Navbar from "./Navbar";

export const Layout = ({children}) => {

    return (

        <>
            <Navbar/>
            <main>
                <div className="inner-main">

                    {children}

                </div>
            </main>
            <footer/>
        </>
    )
}






