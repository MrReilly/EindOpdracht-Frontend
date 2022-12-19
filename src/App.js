import React, {lazy, Suspense, useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";


import {Layout} from "./layout/Layout";
import {AuthContext} from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import('./pages/Login'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const MyEvents = lazy(() => import('./pages/MyEvents'));
const MyFavorites = lazy(() => import("./pages/MyFavorites"));


function App() {

    const {isAuth} = useContext(AuthContext)

    return (

        <Layout>
            <Switch>
                <Suspense>
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
                        {isAuth ? <MyProfile/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/my-favorite-events">
                        {isAuth ? <MyFavorites/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/my-events">
                        {isAuth ? <MyEvents/> : <Redirect to="/"/>}
                    </Route>
                </Suspense>
            </Switch>
        </Layout>
    )
}

export default App;
