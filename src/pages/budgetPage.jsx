import React from 'react';
import axios from 'axios';
import CreateItem from '../component/budgetComponent/createItem';
import DisplayItemList from '../component/budgetComponent/displayItemList';
import DisplayCalendar from '../component/budgetComponent/displayCalendar';
import DisplayBudgetGraph from '../component/budgetGraphComponent/displayBudgetGraph';
import { Link } from "react-router-dom";

function BudgetPage(props) {

    const [itemList, setItemList] = React.useState({
        userId: "",
        listDate: "",
        isSaved: "",
        listTotal: "",
        list: []
    });

    const [dateData, setDateData] = React.useState([]);

    //console.log(props);

    React.useEffect(() => {
        const fetchItemList = async () => {
            try {

                if (props.location.userData === undefined) {
                    console.log("Calling Replace");
                    props.history.replace('/');
                } else {
                    console.log("Setting Id");
                    var id = props.location.userData[1];
                }

                const date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                const currentDate = year + '-' + month + '-' + day;

                console.log(currentDate);

                setItemList(previousValue => {
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

                if (null !== res.data.itemList && !res.data.error) {

                    const fetchedItemList = res.data.itemList;
                    var saved = fetchedItemList.isSaved;
                    var budgetList = fetchedItemList.list;

                    //console.log(fetchedItemList);
                    console.log(budgetList);

                    if (saved !== undefined && budgetList !== undefined) {
                        setItemList(previousValue => {
                            return {
                                ...previousValue,
                                isSaved: saved,
                                list: budgetList
                            }
                        })
                    }
                    //console.log(itemList)
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchItemList();
    }, []);

    React.useEffect(() => {

        const updateListTotal = () => {
            const initListTotal = findTotal(itemList);
            setItemList(previousValue => {
                return {
                    ...previousValue,
                    listTotal: initListTotal
                }
            })
        }

        updateListTotal();

    }, [itemList.list]);

    function findTotal(itemList) {
        var listTotal = 0;
        itemList.list.forEach((item) => {
            listTotal = parseInt((listTotal) + parseInt(item.amount));
        })
        return listTotal;
    }

    function updateItemList(item) {
        setItemList(previousValue => {
            return {
                ...previousValue,
                list: [...previousValue.list, item]
            };
        })
    }

    function deleteItem(id) {
        setItemList(prevValue => {
            return {
                ...prevValue,
                list: prevValue.list.filter((item) => {
                    return item.itemId !== id;
                })
            };
        });
    }

    async function handleBudgetSubmit(event) {
        event.preventDefault();
        console.log("Before Budget Save Call");
        console.log(!itemList.isSaved);

        if (!itemList.isSaved) {
            //const res = await 
            axios.post('http://localhost:9000/saveItemListData', { itemList });

            setItemList(previousValue => {
                return {
                    ...previousValue,
                    isSaved: true,
                };
            })

        } else {
            console.log("update");
            axios.put('http://localhost:9000/updateItemListData', { itemList });
        }
    }

    function updateDateData(dateList){
        setDateData([...dateList]);
    }

    return (
        <div>
            <h1>Budget Page</h1>
            <Link to="/">Home</Link>
            <form onSubmit={handleBudgetSubmit}>
                <CreateItem
                    onAdd={updateItemList}
                />
                {itemList.list.map((item, index) =>
                (<DisplayItemList key={index}
                    item={item}
                    deleteItem={deleteItem}
                />))}
                <button type="submit">Save</button>
            </form>
            {/* <h3>{findTotal(itemList)}</h3> */}
            <h3>{itemList.listTotal}</h3>
            <DisplayCalendar 
                itemList = {itemList}
                onAddDateList={updateDateData}
            />
            <DisplayBudgetGraph
                dateList = {dateData}
            />
            
        </div>
    )
}

export default BudgetPage;