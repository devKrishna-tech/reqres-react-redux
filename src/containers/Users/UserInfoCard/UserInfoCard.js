import React from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as usersActions from '../../../actions/users';
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as authActions from "../../../actions/auth";

const UserInfoCard = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        const filtered = state.users.users.filter(user => user.id.toString() === props.match.params.id.toString());
        if (filtered) {
            return filtered[0];
        }
    })
    const loading = useSelector(state => state.users.loading);
    const currentUserId = useSelector(state => state.auth.userId);

    const navigateBack = () => props.history.goBack();

    const deleteUser = () => {
        dispatch(usersActions.deleteUserInit(props.match.params.id));
        if(props.match.params.id.toString() === currentUserId.toString()) {
            dispatch(authActions.authLogout());
        } else {
            props.history.push('/users');
        }
    }

    return (
        <div className='ui grid container centered'>
            {loading ? Spinner :
                <Card
                    style={{marginTop: 50}}
                    image={user.avatar}
                    header={`${user.first_name} ${user.last_name}`}
                    description={
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={navigateBack}>
                                Go Back
                            </Button>
                            <Button basic color='red' onClick={deleteUser}>
                                Delete User
                            </Button>
                        </div>
                    }
                    meta={user.email}
                    extra={<div><Icon name='user'/>ID # {user.id}</div>}
                />}

        </div>
    );
}


export default withRouter(UserInfoCard);