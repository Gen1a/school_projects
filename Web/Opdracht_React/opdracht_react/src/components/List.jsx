import React from 'react';
import ListItem from '../components/ListItem';

const List = (props) => {
    const {items} = props;

    return (
        <div>
            Technologies:
            <ul>
                {items.map((item) => {
                    return (<ListItem key={item.id} content={item.name}/>)
                })}
            </ul>
        </div>
    )
}

export default List
