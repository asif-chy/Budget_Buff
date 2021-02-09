import React from 'react';
import axios from 'axios';
import CreateUser from '../component/appComponent/createUser';
import DisplayUserList from '../component/appComponent/displayUserList';

function HomePage() {

    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        const fetchUserList = async () => {
            try {
                
                const res = await axios.get('http://localhost:9000/getUserListData');

                if (!res.data.error || res.data.userList.length !== 0) {

                    const fetchedList = res.data.userList;

                    fetchedList.forEach((element) => {
                        console.log(element);
                        setUserList(previousValue => {
                            return [...previousValue, element]
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchUserList();
    }, []);

    function updateUserList(user) {
        setUserList(previousValue => {
            return [...previousValue, user];
        })
    }

    function deleteUser(id) {
        setUserList(prevValue => {
            return prevValue.filter((user) => {
                return user._id !== id;
            });
        });
    }

    return (
        <div>
            <CreateUser
                onAdd={updateUserList}
            />
            {userList.map((user, index) =>
            (<DisplayUserList key={user._id}
                item={user}
                delete={deleteUser}
            />))}
        </div>
    )
}

export default HomePage;