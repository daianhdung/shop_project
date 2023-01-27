import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { getAllRole, getUser, updateUserRole } from "~/service/admin/adminUserService";
import FormUser from "../Form/FormUser";

function UpdateUser() {
    const [formUser, setFormUser] = useState()
    const [role, setRole] = useState()
    console.log(formUser);

    const handleUpdate = (formUser) => {
        const fetchApiUpdateRoleUser = async () => {
            console.log(1);
            console.log(formUser);
            const response = await updateUserRole(formUser)
            if(response.success){
                successToast('Thay đổi thành công')
            }else{
                errorToast('Thất bại, vui lòng kiểm tra lại')
            }
        }
        fetchApiUpdateRoleUser()
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        const fetchApiGetUser = async () => {
            const response = await getUser(id)
            setFormUser(response.data)
        }
        const fetchApiGetRole = async () => {
            const response = await getAllRole()
            setRole(response.data)
        }
        fetchApiGetRole()
        fetchApiGetUser()
    }, [])

    return (<div>
        {
            formUser ?
                <FormUser user={formUser} role={role} handleUpdate={handleUpdate} />
                :
                <div>Không tìm thấy người dùng để cập nhật </div>
        }

    </div>);
}

export default UpdateUser;