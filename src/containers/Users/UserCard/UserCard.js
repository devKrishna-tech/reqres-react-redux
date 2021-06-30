import React from 'react'
import {Image, Button, Card, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";

const UserCard = (props) => (
    <Card color='red'>
        <Card.Content>
            <Image
                 floated='right'
                size='tiny'
                src={props.avatar}
                circular
            />
            <Card.Header>{`${props.firstName} ${props.lastName}`}</Card.Header>
            <Card.Meta >{props.email}</Card.Meta>
            <div className='ui two buttons'>
                <Link to={`/users/${props.userId}`}>
                    <Button inverted color='red'>
                        Show Details
                    </Button>
                </Link>
            </div>
        </Card.Content>
        <Card.Content extra>
            <div>
                <Icon name='user'/>ID # {props.userId}
            </div>
        </Card.Content>
    </Card>
)


export default UserCard;