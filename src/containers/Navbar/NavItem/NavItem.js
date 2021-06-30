import {Menu} from 'semantic-ui-react';
import React from "react";


const NavItem = (props) => {
    const { item, position } = props;
    return (
        <Menu.Item
            name={item}
            onClick={() => props.onClick(item)}
            position={position}
        />
    )
}

export default NavItem;