import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import Logout from "../../containers/Auth/Logout/Logout";
import UsersList from "../../containers/Users/UsersList/UsersList";
import UserInfoCard from "../../containers/Users/UserInfoCard/UserInfoCard";

const Private = () => {
    return (
        <Switch>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/users" exact component={UsersList}/>
            <Route path="/users/:id" exact component={UserInfoCard}/>
            <Redirect to="/users"/>
        </Switch>
    )
}

export default Private;