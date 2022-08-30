import { useEffect, useState } from 'react'
import UserList from '../components/UserList'

const Users = () => {
  const [userList, setUserList] = useState([])
//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/users', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }).then((x)=>x.json).then(y => console.log(y))

//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getUsers()
//     console.log(userList)
//   }, [])

useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setUserList(responseData.result);
        // console.log(responseData.result);
        // console.log(userList);
      } catch (err) {
        throw new Error(err.message)
      }
    };
    sendRequest();
  }, []);

//   const userData = [
//     {
//       id: 'u1',
//       firstName: 'Filan ',
//       lastName: 'Fisteku',
//       places: 2,
//       image:
//         'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
//     },
//     {
//       id: 'u2',
//       firstName: 'Filane',
//       lastName: 'Fisteku',
//       places: 1,
//       image: 'https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png',
//     },
//   ]

  return <UserList items={userList} />
}

export default Users
