import React from 'react'

const Statistics = (props) => {
    const {goodCounter, neutralCounter, badCounter} = props;

    return (
        <div>
            <h2>Your Statistics:</h2>
            <p>Good votes: <span>{goodCounter}</span></p>
            <p>Neutral votes: <span>{neutralCounter}</span></p>
            <p>Bad votes: <span>{badCounter}</span></p>
        </div>
    )
}

export default Statistics
