import React from 'react';
import './loader.css';
import styled from 'styled-components';


export default () => {
    return (
        <LoadingWrap>
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </LoadingWrap>
    )
}

const LoadingWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;