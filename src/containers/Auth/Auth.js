import React from "react";
import SignIn from "./SignIn/SignIn";
import {Route, Switch, Redirect} from 'react-router-dom';
import SignUp from "./SignUp/SignUp";

const Auth = (props) => {
    return (
        <Switch>
            <Route path={props.match.path + '/signup'} exact component={SignUp}/>
            <Route path={props.match.path + '/signin'} exact component={SignIn}/>
            <Redirect to={props.match.path + '/signin'} />
        </Switch>
    )
}

export default Auth;