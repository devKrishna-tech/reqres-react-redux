import React, {useEffect} from 'react'
import {Card} from 'semantic-ui-react'
import UserCard from "../UserCard/UserCard";
import * as usersActions from '../../../actions/users';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from "../../../components/UI/Spinner/Spinner";

const UsersList = () => {
    const dispatch = useDispatch();
    const fetchingUsers = useSelector(state => state.users.loading);
    const users = useSelector(state => state.users.users);
    const didFetchUsers = useSelector(state => state.users.loaded);

    useEffect(() => {
        if(!didFetchUsers){
            dispatch(usersActions.fetchUsers());
        }
    }, [didFetchUsers, dispatch])

    return (
        <div className='ui grid container'>
            <br/> <br/>
            {fetchingUsers ? <Spinner/> :
                <Card.Group>
                    {users.map(user =>
                        <UserCard
                            key={user.id}
                            firstName={user.first_name}
                            lastName={user.last_name}
                            email={user.email}
                            userId={user.id}
                            avatar={user.avatar}
                        />
                    )}
                    <br/>
                </Card.Group>}
        </div>
    )
}

export default UsersList;