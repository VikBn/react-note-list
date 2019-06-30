import React from 'react';

export default ({title, openModal}) => {
    return (
        <button onClick={openModal} >
            {title}
        </button>
    )
}