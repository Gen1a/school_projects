import React from 'react'

const Footer = (props) => {
    const {content} = props;
    const total = content.reduce((acc, cur) => acc + cur);

    return (
        <div>
            <p>Number of exercises: {total}</p>
        </div>
    )
}

export default Footer
