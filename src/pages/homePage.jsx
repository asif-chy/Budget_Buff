import React from 'react';
import axios from 'axios';
import CreateUser from '../component/appComponent/createUser';
import DisplayUserList from '../component/appComponent/displayUserList';

function HomePage(){

    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        const fetchUserList = async () => {
            try {
                //setData({isFetching: true});
                //setItemList({userId: id})
                // setItemList(previousValue =>{
                //     return {
                //         ...previousValue,
                //         userId: id,
                //         listDate: currentDate
                //     }
                // })
                const res = await axios.get('http://localhost:9000/getUserListData');
                console.log(res.data.userList);

                const fetchedList = res.data.userList;

                // const userList = fetchedList.map((item) =>
                //         user{
                //             id: item._id,
                //             userName: item.name
                //         }
                //     );

                fetchedList.forEach((element) => {
                    console.log(element);
                    setUserList(previousValue =>{
                        return[...previousValue, element]
                    });
                });
                
            } catch (e) {
                console.log(e);
                //setData({users: data.users, isFetching: false});
            }
        }; 
        fetchUserList();
    }, []);

    function updateUserList(user){
        setUserList(previousValue =>{
            return[...previousValue, user];
        })
    }

    function deleteUser(id){
        setUserList(prevValue => {
        return prevValue.filter((user)=>{
        return user._id !== id;
      });
    });
    }

    return (
        <div>
            <CreateUser
                onAdd = {updateUserList}
            />
            {userList.map((user,index)=>
            (<DisplayUserList key={user._id}
                item={user}
                delete = {deleteUser}
            />))}
        </div>
    )
}

export default HomePage;