import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDebounce from "~/hooks/useDebounce";
import { getUserInform, updatePassword, updateProfile } from "~/service/userService";
import { validEmail, validPhone } from "~/utils/regex";


function Profile() {
    //Inform change
    const location = useLocation()
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState({});
    console.log(user);
    console.log(errors);

    useEffect(() => {
        const fetchApiGetUserInform = async () => {
            const response = await getUserInform()
            setUser(response.data)
        }
        fetchApiGetUserInform()
    }, [])

    const submit = () => {
        let newErrors = {};
        if (!user.fullname) {
            newErrors.fullname = 'Họ và tên bắt buộc';
        }
        if (!user.phone) {
            newErrors.phone = 'Số điện thoại bắt buộc';
        } else if (!validPhone.test(user.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!user.address) {
            newErrors.address = 'Địa chỉ bắt buộc';
        }
        if (Object.keys(newErrors).length === 0) {
            const fetchApiUpdateUser = async () => {
                const response = await updateProfile(user)
            }
            fetchApiUpdateUser()
        }
        setErrors(newErrors)
    }


    //Password change
    const [oldPassword, setOldPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState({ newPassword: "", reNewPassword: '' })
    const [equal, setEqual] = useState(true);
    const reDebounceValue = useDebounce(repeatPassword.reNewPassword, 300)

    useEffect(() => {
        if (repeatPassword.newPassword === repeatPassword.reNewPassword) {
            setEqual(true)
        } else {
            setEqual(false)
        }
    }, [repeatPassword.newPassword, reDebounceValue])


    const submitPassword = () => {
        if (equal) {
            const fetchApiUpdatePassword = async () => {
                const response = await updatePassword(oldPassword, repeatPassword.newPassword)
            }
            fetchApiUpdatePassword()
        }
    }


    return <div className="p-5">
        {user && (location.pathname === '/profile' || location.pathname === '/admin-profile') ? <form style={{ userSelect: 'none' }}>
            <div className="row">
                <div className="mb-3 col-md-5">
                    <label htmlFor="email" className="form-label">Địa chỉ email</label>
                    <input style={{ height: '35px', userSelect: 'none' }} type="email" className="form-control form-control-lg" id="email" placeholder={user.email} disabled />
                </div>
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="fullname" className="form-label">Tên đầy đủ</label>
                    <input style={{ height: '35px' }} type="text" className="form-control form-control-lg" id="fullname" placeholder={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                    {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input style={{ height: '35px' }} type="text" className="form-control form-control-lg" id="address" placeholder={user.address ? user.address : "Trống"}
                        onChange={(e) => setUser({ ...user, address: e.target.value })} />
                    {errors.address && <span className="text-danger">{errors.address}</span>}
                </div>
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input style={{ height: '35px' }} type="text" className="form-control form-control-lg" id="phone" placeholder={user.phone ? user.phone : "Trống"}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                </div>
            </div>

            <div className="row">
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="formFile" className="form-label">Avatar</label>
                    <input style={{ height: '30px' }} className="form-control form-control-lg" type="file" id="formFile" />
                </div>
            </div>
            <button onClick={submit} type="button" className="btn btn-outline-info btn-lg mt-3">Lưu thay đổi</button>
        </form> : <></>}
        {user && (location.pathname == '/profile/changePass' || location.pathname === '/admin-profile/changePass') && <form style={{ userSelect: 'none' }}>
            <div className="row">
                <div className="mb-3 col-md-5">
                    <label htmlFor="password" className="form-label">Mật khẩu cũ</label>
                    <input style={{ height: '35px', userSelect: 'none' }} type="password" className="form-control form-control-lg" id="password" placeholder='*******'
                        onChange={(e) => setOldPassword(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <input style={{ height: '35px' }} type="text" className="form-control form-control-lg" id="newPassword" onChange={(e) => setRepeatPassword({ ...repeatPassword, newPassword: e.target.value })} />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-md-5 h-50">
                    <label htmlFor="reNewPassword" className="form-label">Nhập lại mật khẩu mới</label>
                    <input style={{ height: '35px' }} type="text" className="form-control form-control-lg" id="reNewPassword" onChange={(e) => setRepeatPassword({ ...repeatPassword, reNewPassword: e.target.value })} />
                </div>
            </div>
            <div className="row">
                <div className="mb-3 col-md-5 h-50">
                    <h3 className="text-danger">{!equal && "Mật khẩu mới chưa trùng khớp"}</h3>
                </div>
            </div>
            <button disabled={!equal || !repeatPassword.newPassword.trim()} onClick={submitPassword} type="button" className="btn btn-outline-info btn-lg mt-3">Lưu thay đổi</button>
        </form>}
    </div>;
}

export default Profile;