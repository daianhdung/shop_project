import { useEffect, useState } from "react";
import { errorToast, successToast } from "~/components/Popups";
import { getAllRole, insertUser } from "~/service/admin/adminUserService";
import { validEmail, validPassword, validPhone } from "~/utils/regex";
import FormUser from "../Form/FormUser";

function InsertUser() {

    const [formUser, setFormUser] = useState()
    const [role, setRole] = useState()
    const [errors, setErrors] = useState({});

    const handleInsert = (formUser) => {
        let newErrors = {};
        if (!formUser.email) {
            newErrors.email = 'Email bắt buộc';
        } else if (!validEmail.test(formUser.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formUser.fullname) {
            newErrors.fullname = 'Họ và tên bắt buộc';
        }
        if (!formUser.phone) {
            newErrors.phone = 'Số điện thoại bắt buộc';
        }else if (!validPhone.test(formUser.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!formUser.address) {
            newErrors.address = 'Địa chỉ bắt buộc';
        }
        if (!formUser.password) {
            newErrors.password = 'Mật khẩu bắt buộc';
        }else if (!validPassword.test(formUser.password)) {
            newErrors.password = 'Mật khẩu phải hơn 8 kí tự chứa kí tự và chứ chữ cái';
        }
        if (Object.keys(newErrors).length === 0) {
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
        setErrors(newErrors)
    }
    

    useEffect(() => {
        const fetchApiGetRole = async () => {
            const response = await getAllRole()
            setRole(response.data)
        }
        fetchApiGetRole()
    }, [])

    return (<>
        <FormUser user={formUser} role={role} handleInsert={handleInsert} errors={errors}/>
    </>);
}

export default InsertUser;