import { useEffect, useState } from "react";
import { getUsers } from "~/service/admin/adminUserService";
import ListUser from "./List/ListUser";



function UserAdmin({ setIsLoading }) {

    const [users, setUsers] = useState()

    // const handleDelete = (id) => {
    //     const token = getCookie('tokenJwt');
    //     adminProductService.deleteProduct(token, id)
    //         .then(response => console.log(response))
    // }
    useEffect(() => {
        setIsLoading(true)
        const fetchApiGetAllUsers = async() => {
            const response = await getUsers()
            setUsers(response.data)
            setIsLoading(false)
        }
        fetchApiGetAllUsers()
    }, [])


    return (<div>
        {users && <ListUser users={users} handleDelete="" />}
    </div>);
}

export default UserAdmin;