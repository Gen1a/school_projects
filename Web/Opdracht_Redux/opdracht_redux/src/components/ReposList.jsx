import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Importeren van de asyncThunk action creator
import { fetchRepos } from '../store/repos/slice';

const ReposList = () => {

    const dispatch = useDispatch();
    const reposState = useSelector(state => state.repos);
    const {repos} = reposState;

    return (
        <div>
            <h1>GitHub Repositories</h1>
            <button onClick={() => dispatch(fetchRepos())}>Fetch repos</button>
            {repos.length > 0 ?
                <div><p>Repositories:</p>
                <ul>
                    {repos.map(r => <li key={r.id}>{r.name}</li>)}
                </ul></div> : 
                <div></div>
            }
        </div>
    )
}

export default ReposList
