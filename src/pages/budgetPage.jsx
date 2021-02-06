import React from 'react';
import CreateItem from '../component/budgetComponent/createItem';
import DisplayItemList from '../component/budgetComponent/displayItemList';
import { Link } from "react-router-dom";

function BudgetPage(props){

    const [itemList, setItemList] = React.useState([]);

    function updateItemList(item){
        setItemList(previousValue =>{
            return[...previousValue,item];
        })
    }

    console.log(props);

    // const userName = props.location.userData[0];
    // const id = props.location.userData[1];

    return(
        <div>
            <h1>Budget Page</h1>
            <Link to="/">Home</Link>
            <CreateItem
                onAdd = {updateItemList}
            />
            {itemList.map((item, index)=>
            (<DisplayItemList key = {index}
                item = {item}
                />))}
        </div>
    )
}

export default BudgetPage;