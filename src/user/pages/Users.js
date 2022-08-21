import UserList from "../components/UserList"


const Users = () => {

    const userData = [
        {
            id:'u1',
            firstName:'Filan ',
            lastName:'Fisteku',
            places:3,
            image:'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg'
        },
        {
            id:'u2',
            firstName:'Filane',
            lastName:'Fisteku',
            places:2,
            image:'https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png'
        }
    ]


    return (
            <UserList items={userData}/>
    )
}

export default Users