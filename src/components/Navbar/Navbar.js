import './NavBar.css'
import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";

const Navbar = () => {
    const {isAuth, logout, user, role} = useContext(AuthContext);

    return (

        <header>
            <nav>
                <ul className="nav-left-side-container">
                    <li key="Home"><NavLink to="/">Home</NavLink></li>
                </ul>
                <ul className="nav-right-side-links">
                    {isAuth ?
                        <div key="navContainer1" className="nav-links-container">
                            <li key="logout"><a href="/src/pages" onClick={logout}>Log out</a></li>
                            {role === "ORGANIZER" || role === "ADMIN" ?
                                <li key="myEvent"><NavLink to="/my-events">My Events</NavLink></li> : null}

                            <li key="myFavorites"><NavLink to="/my-favorite-events">My Favorite Events</NavLink></li>
                            <li key="myProfile"><NavLink to="/my-profile">My Profile</NavLink></li>
                            <li key="hiUser" id="hiUser"><p>Hi {user} ({role})</p></li>
                        </div> :
                        <div key="navContainer2" className="nav-links-container">
                            <li key="login"><NavLink to="/login">Log in</NavLink></li>
                            <li key="createAccount"><NavLink to="/create-account">Create Account</NavLink></li>
                        </div>}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar