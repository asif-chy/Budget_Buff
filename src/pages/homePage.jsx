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

    return (
        <div>
            <CreateUser
                onAdd = {updateUserList}
            />
            {userList.map((user,index)=>
            (<DisplayUserList key={user.id}
                id={user.id}
                item={user}
            />))}
        </div>
    )
}

export default HomePage;