import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateUser(props){

    const[user, setUser] = React.useState({
        id: "",
        userName:""
    });

    function addUser(event){
        const{name,value} = event.target;

        setUser(previouseValue =>{
            return{
                ...previouseValue,
                [name]:value,
            };
        })
    }

    useEffect(()=>{
        console.log(user);
    
        if(user.id){
          props.onAdd(user);
    
          setUser(previousValue =>{
            return{
              ...previousValue,
              id:"",
            };
          })
        }
    
      })

    async function handleSubmit(event){
        event.preventDefault();
        console.log("Before Save Call");
        const res = await axios.post('http://localhost:9000/save', {user});
    
        console.log(res);
        console.log(res.data.id);
    
        const itemId = res.data.id;
    
        await setUser(previousValue =>{
          return{
            ...previousValue,
            id:itemId,
          };
        })
    
        //console.log(note);
        // props.onAdd(event,note);
      }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={addUser} type="text" name="userName" placeholder="Add User"></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default CreateUser;