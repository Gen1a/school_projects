import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useButtonStyle = makeStyles({
    root: {
      backgroundColor: '#52a8ff',
      border: '1px solid black',
      borderRadius: 3,
      color: 'white',
      height: 30,
      padding: '5px 15px',
      "&:hover": {
        backgroundColor: "#82c0ff"
        } 
    },
  });

const Api = (props) => {
    const { index } = useParams();
    const { apis } = props;
    if(!localStorage.getItem("apisObject")) { localStorage.setItem("apisObject", JSON.stringify(apis)) };   // incase of page reload
    const buttonClass = useButtonStyle();
    // Get api
    let api = null;
    if (!apis[index]){
        let item = JSON.parse(localStorage.getItem("apisObject"));
        api = item[index];
    }
    else{
        api = apis[index];
    }

    // return with inline conditional
    // (works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false)
    return (
        <div>
            {api ? 
                <div>
                    <h1>{api.API}</h1>
                    <h5>{api.Description}</h5>
                    <h5>Category: {api.Category}</h5>
                    <Button className={buttonClass.root} variant="outlined" size="small" href={api.Link}>
                        {api.API} Website
                    </Button>
                </div> : 
                <div><h3>Sorry, something went wrong</h3></div>
            }
            <hr></hr>
            <Button className={buttonClass.root} variant="outlined" component={Link} to="/apis">
                Go back to API Overview
            </Button>
        </div>
    )
}

export default Api
