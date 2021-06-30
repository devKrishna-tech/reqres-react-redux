import React from 'react';
import {Menu} from 'semantic-ui-react';
import NavItem from "./NavItem/NavItem";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import * as authActions from "../../actions/auth";

const Navbar = (props) => {
    const handleUsers = () => {
        props.history.push('/');
    }

    const handleAuthButton = () => {
        if (props.isAuthenticated) {
            props.history.push('/logout');
        } else {
            props.history.push('/auth');
        }
    }

    return (
        <div>
            <Menu pointing secondary>
                {props.isAuthenticated ? <NavItem item='users' onClick={handleUsers}/> : null}
                <NavItem item={props.isAuthenticated ? 'logout' : 'authenticate'}
                         onClick={handleAuthButton}
                         position='right'
                />
            </Menu>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => dispatch(authActions.authLogout()),
        doLogin: () => dispatch(authActions.authUser()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));