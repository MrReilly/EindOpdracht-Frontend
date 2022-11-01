import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {

    return(

        <header>
            <nav>
                <ul>
                    <li><NavLink to="/my-events">My Events</NavLink></li>
                </ul>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/my-favorite-events">My Favorite Events</NavLink></li>
                    <li><NavLink to="/create-account">Create Account</NavLink></li>
                    <li><NavLink to="/login">Log in</NavLink></li>
                    <li><NavLink to="/my-profile">My Profile</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar