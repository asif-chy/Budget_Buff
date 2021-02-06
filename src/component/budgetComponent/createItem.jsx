import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateItem(props){

    const[item, setItem] = React.useState({
        itemId: 0,
        itemName:"",
        amount:"",
        currentDate:""
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

    // useEffect(()=>{
    //     console.log(user);
    
    //     if(user.id){
    //       props.onAdd(user);
    
    //       setUser(previousValue =>{
    //         return{
    //           ...previousValue,
    //           id:"",
    //         };
    //       })
    //     }
    
    //   })

    async function handleSubmit(event){
        event.preventDefault();
        console.log("Before Save Call");
        //const res = await axios.post('http://localhost:9000/save', {user});
    
        // console.log(res);
        // console.log(res.data.id);
    
        // const itemId = res.data.id;
    
        // await setUser(previousValue =>{
        //   return{
        //     ...previousValue,
        //     id:itemId,
        //   };
        // })

        console.log(item.itemId);

        if(item.itemId >= 0){
            setItem(previouseValue => {
                return{
                    ...previouseValue,
                    itemId: item.itemId+1
                };
            })
        }
        // }else{
        //     setItem(previouseValue => {
        //         return{
        //             ...previouseValue,
        //             itemId: item.itemId+1
        //         };
        //     })
        // }
    
        console.log(item);
        props.onAdd(item);
      }

    return(
        <form onSubmit={handleSubmit} >
            <input  type="text" name="itemName" placeholder="Add Item" onChange={addItem}></input>
            <input  type="text" name="amount" placeholder="Add Amount" onChange={addItem}></input>
            <button type="submit">Add Item</button>
        </form>
    )

    // return(
    //     <form onSubmit={handleSubmit}>
    //         <input onChange={addUser} type="text" name="userName" placeholder="Add User"></input>
    //         <input onChange={addUser} type="text" name="userName" placeholder="Add User"></input>
    //         <button type="submit">Add</button>
    //     </form>
    // )
}

export default CreateItem;