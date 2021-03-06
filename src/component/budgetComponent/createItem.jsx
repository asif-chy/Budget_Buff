import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateItem(props){

    const[item, setItem] = React.useState({
        itemId: 0,
        itemName:"",
        amount: ""
    });

    function addItem(event){
        const{name,value} = event.target;

        setItem(previouseValue =>{
            return{
                ...previouseValue,
                [name]:value,
            };
        })
    }

    function handleItemCreate(event){
        event.preventDefault();
        console.log("Before Item Create");

        //console.log(item.itemId);
        if(item.itemId >= 0){
            setItem(previouseValue => {
                return{
                    ...previouseValue,
                    itemId: item.itemId+1
                };
            })
        }
    
        //console.log(item);
        props.onAdd(item);
      }

    return(
        <div className="budgetListCreateItem">
            <input  type="text" name="itemName" placeholder="ADD ITEM" onChange={addItem} id="createItemInput"></input>
            <input  type="text" name="amount" placeholder="ADD AMOUNT" onChange={addItem} id="createItemPrice"></input>
            <button type="button" onClick={handleItemCreate} id="createItemButton"><i className="fa fa-plus fa-2x"></i></button>
        </div>
    )
}

export default CreateItem;