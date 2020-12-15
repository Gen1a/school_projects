import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Apis = (props) => {
    const { apis, setApis } = props;
    // Seperate function variabele to support scaling the application
    const getApis = () => {
        axios.get("https://api.publicapis.org/entries?category=development")
            .then(response => {
                setApis(response.data.entries);
            })
            .catch(err => console.log(err));
    }
    // Call useEffect 1x after rendering the component
    useEffect(() => {
        getApis();
    }, []);
    
    return (
        <div>
            <h1>Public API Overview</h1>
            <p>
                A collective list of free APIs for use in software and web development 
                (<a href="https://github.com/public-apis/public-apis" target="_blank" rel="noreferrer">link to Github Repo</a>)
            </p>
            <ul>
                {apis.map((item, index) => 
                    (<li key={index}>
                        <Link to={`/api/${index}`}>{item.API}</Link>
                    </li>))}
            </ul>
        </div>
    )
}

export default Apis
