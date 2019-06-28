import React from 'react';

export default ({props}) => {
    console.log('props',props);
    return (
        <div>
            <span>{props.id}</span>
            <span>{props.title}</span>
            <span>{props.content}</span>
        </div>
    )
}