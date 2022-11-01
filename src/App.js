import './App.css';

import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from './pages/login/Login'
import CreateAccount from './pages/createAccount/CreateAccount'
import CreateEvent from './pages/createEvent/CreateEvent'
import CreateReview from './pages/createReview/CreateReview'
import EventView from './pages/eventView/EventView'
import MyEvents from './pages/myEvents/MyEvents'
import MyFavoriteEvents from './pages/myFavorites/MyFavorites'
import MyProfile from './pages/profile/MyProfile'
import {Layout} from "./components/Layout/Layout";

function App() {

    return (

        <Layout>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/my-favorite-events">
                    <MyFavoriteEvents/>
                </Route>
                <Route exact path="/my-events">
                    <MyEvents/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/create-account">
                    <CreateAccount/>
                </Route>
                <Route exact path="/my-profile">
                    <MyProfile/>
                </Route>

                <Route exact path="/events/:id">
                    <EventView/>
                </Route>
                <Route exact path="/create-event">
                    <CreateEvent/>
                </Route>
                <Route exact path="/create-review/:id">
                    <CreateReview/>
                </Route>
            </Switch>
        </Layout>
    )
}

export default App;
