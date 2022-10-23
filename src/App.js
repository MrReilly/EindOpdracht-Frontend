
import './App.css';
import './pages/home/Home'

import React from "react";
import{BrowserRouter as Router, Switch, Route} from "react-router-dom";



import Home from "./pages/home/Home";


function App() {

    return (
        <div className= "wrapper">
        <header>
            <nav>
                <ul>
                    <li><a href="/src/App.js">Home</a></li>
                    <li><a href="/src/App.js">My....</a></li>
                    <li><a href="/src/App.js">Create Account</a></li>
                    <li><a href="/src/App.js">Log in</a></li>
                    <li><a href="/src/App.js">My Profile</a></li>
                </ul>
            </nav>
        </header>
        <Switch>
        <Route exact path="/">
        <Home/>
        </Route>
            <Route exact path="/login">
                <Home/>
            </Route>
            <Route exact path="/create-account">
                <Home/>
            </Route>
            <Route exact path="/my-profile">
                <Home/>
            </Route>
            <Route exact path="/my-favorite-events/:id">
                <Home/>
            </Route>
            <Route exact path="/my-events/:id">
                <Home/>
            </Route>
            <Route exact path="/events/:id">
                <Home/>
            </Route>
            <Route exact path="/create-event">
                <Home/>
            </Route>
            <Route exact path="/create-review">
                <Home/>
            </Route>

        </Switch>
            <footer></footer>
   </div>

)}

export default App;
