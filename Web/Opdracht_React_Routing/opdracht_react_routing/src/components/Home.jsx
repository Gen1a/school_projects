import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/apis">API List</Link>
        </div>
    )
}

export default Home
