import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function DisplayUserList(props) {

    const userData = [props.item.userName, props.item.id];

    return (
        <form>

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
