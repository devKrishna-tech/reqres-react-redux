import React, {useEffect} from 'react';
import Navbar from "./containers/Navbar/Navbar";
import {connect} from 'react-redux';
import * as authActions from './actions/auth';
import Private from "./components/Private/Private";
import Public from "./components/Public/Public";

const App = (props) => {
    useEffect(() => {
        if(!props.isAuthenticated){
            props.autoSignup();
        }
    }, [props])

    return (
        <div className="App">
            <Navbar/>
            {props.isAuthenticated ? <Private/> : <Public/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        autoSignup: () => dispatch(authActions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
