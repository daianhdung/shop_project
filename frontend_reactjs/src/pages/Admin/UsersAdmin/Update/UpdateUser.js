import { useEffect, useState } from "react";
import { getUser } from "~/service/admin/adminUserService";
import FormUser from "../Form/FormUser";

function UpdateUser() {
    const [formUser, setFormUser] = useState()
    console.log(formUser);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        const fetchApiGetUser = async () => {
            const response = await getUser(id)
            setFormUser(response.data)
        }
        fetchApiGetUser()
    }, [])

    return (<div>
        {
            formUser ?
                <FormUser user={formUser} handleUpdate="" />
                :
                <div>Không tìm thấy người dùng để cập nhật </div>
        }

    </div>);
}

export default UpdateUser;