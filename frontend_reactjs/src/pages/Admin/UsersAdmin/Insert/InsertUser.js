import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { getAllRole, insertUser } from "~/service/admin/adminUserService";
import FormUser from "../Form/FormUser";

function InsertUser() {

    const [formUser, setFormUser] = useState()
    const [role, setRole] = useState()
    console.log(formUser);

    const handleInsert = (formUser) => {
        const fetchApiInsertUser = async () => {
            const response = await insertUser(formUser)
            if (response.success) {
                successToast('Thêm mới thành công')
            } else {
                errorToast('Thất bại, vui lòng kiểm tra lại')
            }
        }
        fetchApiInsertUser()
    }

    useEffect(() => {
        const fetchApiGetRole = async () => {
            const response = await getAllRole()
            setRole(response.data)
        }
        fetchApiGetRole()
    }, [])

    return (<>
        <FormUser user={formUser} role={role} handleInsert={handleInsert} />
    </>);
}

export default InsertUser;