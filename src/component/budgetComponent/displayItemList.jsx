import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DisplayItemList(props) {

    //console.log(props);

    function handleItemDelete(event){
        event.preventDefault();
        const id = props.item.itemId;
        props.deleteItem(id);
    }


    return (
        <li>
            <h3>{props.item.itemId}</h3>
            <h3>{props.item.itemName}</h3>
            <h4>{props.item.amount}</h4>
            <button type="button" onClick={handleItemDelete}>Delete</button>
        </li>
    )
}

export default DisplayItemList;