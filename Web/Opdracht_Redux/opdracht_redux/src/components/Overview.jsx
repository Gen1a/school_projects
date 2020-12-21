import React from 'react';
import { useSelector } from 'react-redux';

const Overview = () => {
    const counterState = useSelector(state => state.counter);   // gets state of counter
    const repoState = useSelector(state => state.repos);    // gets state of repos
    const {repos} = repoState;  // get repo property with obj destructuring
    const arrayState = useSelector(state => state.test);    // gets state of test array


    return (
        <div>
            <h1>State overview:</h1>
            <ul>
                <li>
                    Counter: {counterState.value}
                </li>
                <li>Array: {arrayState.join(", ")}</li>
                <li>Repos:
                    <ul>
                        {repos.map((repo) => <li key={repo.id}>{repo.owner.login}: <a href={repo.html_url}>{repo.name}</a></li>)}
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Overview
