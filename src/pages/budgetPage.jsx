import React from 'react';
import axios from 'axios';
import CreateItem from '../component/budgetComponent/createItem';
import DisplayItemList from '../component/budgetComponent/displayItemList';
import { Link } from "react-router-dom";

function BudgetPage(props){

    const [itemList, setItemList] = React.useState({
        userId: "",
        listDate:"",
        isSaved:"",
        list:[]});

    // const userName = props.location.userData[0];
    const id = 321;//props.location.userData[1];

    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    const currentDate = year +'-'+month+'-'+ day;
    // console.log(userName +" "+ id);

    React.useEffect(() => {
        const fetchItemList = async () => {
            try {
                //setData({isFetching: true});
                //setItemList({userId: id})
                setItemList(previousValue =>{
                    return {
                        ...previousValue,
                        userId: id,
                        listDate: currentDate
                    }
                })
                const res = await axios.get('http://localhost:9000/getItemListData', {
                    params: {
                        userId: id,
                        listDate: currentDate
                    }
                  });
                //setData({users: response.data, isFetching: false});
                //console.log(res +"Res Recieved");
            } catch (e) {
                console.log(e);
                //setData({users: data.users, isFetching: false});
            }
        }; 
        fetchItemList();
    }, []);

        
    function updateItemList(item){
        setItemList(previousValue =>{
            return{
                ...previousValue,
                list: [...previousValue.list, item]
            };
        })
    }

    function deleteItem(id){
        setItemList(prevValue => {
            return {
                ...prevValue,
                list: prevValue.list.filter((item)=>{
                    return item.itemId!==id;
                })
            };
      });
    }

    async function handleBudgetSubmit(event){
        event.preventDefault();
        console.log("Before Budget Save Call");
        console.log(!itemList.isSaved);

        if(!itemList.isSaved){
        //const res = await 
        axios.post('http://localhost:9000/saveItemListData', {itemList});

        setItemList(previousValue =>{
              return{
                ...previousValue,
                isSaved:true,
              };
            })

        }else{
            console.log("update");
            axios.put('http://localhost:9000/updateItemListData', {itemList});
        }
        // console.log(res);
        // console.log(res.data.id);
    
        // const id = res.data.id;
        
        //const date = new Date();
        
        // var year = date.getFullYear();
        // var month = date.getMonth();
        // var day = date.getDate();
        // var currentDate = year +'-'+month+'-'+ day;
        //console.log(currentDate);
        
    
        // await setItemList(previousValue =>{
        //   return{
        //     ...previousValue,
        //     listId:id,
        //   };
        // })

        // console.log(item.itemId);
    
        //console.log(item);
        // props.onAdd(item);
      }

    console.log(itemList);

    return(
        <div>
            <h1>Budget Page</h1>
            <Link to="/">Home</Link>
            <form onSubmit={handleBudgetSubmit}>
            <CreateItem
                onAdd = {updateItemList}
            />
            {itemList.list.map((item, index)=>
            (<DisplayItemList key = {index}
                item = {item}
                deleteItem = {deleteItem}
                />))}
            <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default BudgetPage;