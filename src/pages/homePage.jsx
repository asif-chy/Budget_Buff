import React from 'react';
import CreateUser from '../component/appComponent/createUser';
import DisplayUserList from '../component/appComponent/displayUserList';

function HomePage(){

    const [userList, setUserList] = React.useState([]);

    function updateUserList(user){
        setUserList(previousValue =>{
            return[...previousValue, user];
        })
    }

    function deleteUser(id){
        setUserList(prevValue => {
        return prevValue.filter((user)=>{
        return user.id !== id;
      });
    });
    }

    return (
        <div>
            <CreateUser
                onAdd = {updateUserList}
            />
            {userList.map((user,index)=>
            (<DisplayUserList key={user.id}
                item={user}
                delete = {deleteUser}
            />))}
        </div>
    )
}

export default HomePage;