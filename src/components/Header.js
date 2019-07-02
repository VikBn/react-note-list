import React from 'react';
import styled from 'styled-components';

export default () => {
    return (
        <HeaderWrap>
            <i color="secondary" className="material-icons">
                event_note
            </i>
            <h1>React Notes List</h1>
        </HeaderWrap>
    )
}

const HeaderWrap = styled.header`
    align-items: center;
    background-color: #343a40;
    display: flex;
    margin-bottom: 24px;
    padding: 0 24px;
    
    i {
        color: #61dbfb;
        font-size: 44px;
    }
    
    h1 {
        color: #ffffff;
        margin-left: 8px;
        
        @media screen and (max-width: 461px) {
            font-size: 26px;
        }
    }
`;