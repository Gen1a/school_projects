import React from 'react'

const Part = (props) => {
    const {title, amount} = props;

    return (
        <div>
            <p>
                {title}: {amount} exercises
            </p>
        </div>
    )
}

export default Part
