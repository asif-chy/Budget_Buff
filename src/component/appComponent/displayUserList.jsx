import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DisplayUserList(props) {

    const userData = [props.item.userName, props.item._id];


    function handleSubmit(event){
        event.preventDefault();
     
        console.log(props.item._id)
        props.delete(props.item._id)
        const item = props.item;
     
        axios.delete('http://localhost:9000/delete', { data: {item}});
        
      }

    return (
        <form onSubmit={handleSubmit}>

            <Link
                to={{
                    pathname: "/budget",
                    userData
                }}
            >{props.item.userName}</Link>

            <button type="submit">Delete</button>
        </form>
    )
}

export default DisplayUserList;
