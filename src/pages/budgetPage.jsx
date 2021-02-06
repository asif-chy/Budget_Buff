import React from 'react';
import CreateItem from '../component/budgetComponent/createItem';
import DisplayItemList from '../component/budgetComponent/displayItemList';
import { Link } from "react-router-dom";

function BudgetPage(props){

    const [itemList, setItemList] = React.useState({
        listId: "",
        list:[]});

    function updateItemList(item){
        setItemList(previousValue =>{
            return{
                list: [...previousValue.list, item]
            };
        })
    }

    // function updateItemList(item){
    //     setItemList(previousValue =>{
    //         return[...previousValue,item];
    //     })
    // }

    // const userName = props.location.userData[0];
    // const id = props.location.userData[1];

    function deleteItem(id){
        setItemList(prevValue => {
            return {
                list: prevValue.list.filter((item)=>{
                    return item.itemId!==id;
                })
            };
      });
    }

    console.log(itemList);

    // function deleteItem(id){
    //     setItemList(prevValue => {
    //     return prevValue.filter((item)=>{
    //     return item.itemId !== id;
    //   });
    // });
    // }

    return(
        <div>
            <h1>Budget Page</h1>
            <Link to="/">Home</Link>
            <CreateItem
                onAdd = {updateItemList}
            />
            {itemList.list.map((item, index)=>
            (<DisplayItemList key = {index}
                item = {item}
                deleteItem = {deleteItem}
                />))}
        </div>
    )
}

export default BudgetPage;