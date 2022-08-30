import { useEffect, useState } from 'react'
import UserList from '../components/UserList'

const Users = () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users')

        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setUserList(responseData.result)
        // console.log(responseData.result);
        // console.log(userList);
      } catch (err) {
        throw new Error(err.message)
      }
    }
    sendRequest()
  }, [])

  return <UserList items={userList} />
}

export default Users
