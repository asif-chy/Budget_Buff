import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DisplayItemList(props) {

    //console.log(props);

    function handleSubmit(event){
        event.preventDefault();
        const id = props.item.itemId;
        props.deleteItem(id);
    }


    return (
        <form onSubmit={handleSubmit}>
            <h3>{props.item.itemId}</h3>
            <h3>{props.item.itemName}</h3>
            <h4>{props.item.amount}</h4>
            <button type="submit">Delete</button>
        </form>
    )
}

export default DisplayItemList;