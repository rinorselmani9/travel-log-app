import UserList from "../components/UserList"


const Users = () => {

    const userData = [
        {
            id:'u1',
            firstName:'Rinor',
            lastName:'Selmani',
            places:2,
            image:'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'
        },
        {
            id:'u2',
            firstName:'Rinor',
            lastName:'Selmani',
            places:1,
            image:'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg'
        }
    ]


    return (
            <UserList items={userData}/>
    )
}

export default Users