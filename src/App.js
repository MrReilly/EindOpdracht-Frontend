
import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from './pages/login/Login'
import CreateAccount from './pages/createAccount/CreateAccount'
import CreateEvent from './pages/createEvent/CreateEvent'
import CreateReview from './pages/createReview/CreateReview'
import MyEvents from './pages/myEvents/MyEvents'
import MyFavoriteEvents from './pages/myFavorites/MyFavorites'
import MyProfile from './pages/profile/MyProfile'
import {Layout} from "./components/Layout/Layout";
import {AuthContext} from "./components/Context/AuthContext";

function App() {

    const {isAuth} = useContext(AuthContext)

    return (

        <Layout>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/create-account">
                    <CreateAccount/>
                </Route>
                <Route exact path="/my-profile">
                    {isAuth ?  <MyProfile/> : <Redirect to="/" />}
                </Route>
                <Route exact path="/my-favorite-events">
                    {isAuth ? <MyFavoriteEvents /> : <Redirect to="/" />}
                </Route>
                <Route exact path="/my-events">
                    {isAuth ? <MyEvents/> : <Redirect to="/" />}
                </Route>
                <Route exact path="/create-event">
                    {isAuth ?  <CreateEvent/> : <Redirect to="/" />}
                </Route>
                <Route exact path="/create-review/:id">
                    {isAuth ?  <CreateReview/> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Layout>
    )
}

export default App;
