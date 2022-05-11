import React from 'react';

const Answer = (props) => {
    const styles = {
        background: props.isHeld ? '#D6DBF5' : 'transparent',
    }

    const stylesCheck = {
        background: props.correct ? '#94D7A2' : (props.isHeld && '#F8BCBC'),
    }

    return (
        <button style={props.isChecked ? stylesCheck : styles} disabled={(props.isChecked && !props.correct) || (!props.isActive && !props.isHeld )} className="answers__variant" onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default Answer;
