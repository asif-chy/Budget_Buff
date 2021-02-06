import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DisplayItemList(props) {

    //console.log(props);

    return (
        <div>
            <h3>{props.item.itemId}</h3>
            <h3>{props.item.itemName}</h3>
            <h4>{props.item.amount}</h4>
        </div>
    )
}

export default DisplayItemList;