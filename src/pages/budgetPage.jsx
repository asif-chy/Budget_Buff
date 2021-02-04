import React from 'react';
import { Link } from "react-router-dom";

function BudgetPage(props){

    console.log(props);

    const userName = props.location.userData[0];
    const id = props.location.userData[1];

    return(
        <div>
            <h1>In Budget</h1>
            <div>{userName}</div>
            <div>{id}</div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default BudgetPage;