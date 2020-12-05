import React from 'react'

const Test = () => {
    const title = "Opdracht React Titel";
    const list = ["Banaan", "Aardbei", "Kers"];

    return (
        <div>
            <h1>{title}</h1>
            <ul>
                {
                    list.map((item, index) => <li key={index}>{item}</li> )
                }
            </ul>
        </div>
    )
}

export default Test
