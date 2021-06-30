import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Auth from "../../containers/Auth/Auth";

const Public = () => {
    return (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Redirect to="/auth"/>
        </Switch>
    )
}

export default Public;