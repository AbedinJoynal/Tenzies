import React from 'react';
import './Die.css';
const Die = (props) => {
    const styles={
        color:props.isHeld ? 'green' : 'black',
    }
    
    return (

        <div className="die-item">
        <h2 onClick={props.helddice} style={styles}>{props.value}</h2>
        </div>
    );
};

export default Die;
