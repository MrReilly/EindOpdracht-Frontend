import React from "react";
import Navbar from "../components/Navbar/Navbar";
import './Layout.css'
import '../App.css'

export const Layout = ({children}) => {

    return (

        <>
            <Navbar/>
            <main>
                <div className="left-outside"/>
                <div className="inner-main">

                    {children}

                </div>
                <div className="right-outside"/>
            </main>
            <footer/>
        </>
    )
}






