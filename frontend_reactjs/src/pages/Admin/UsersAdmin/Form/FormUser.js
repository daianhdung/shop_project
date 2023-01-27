import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormUser({ user, handleUpdate, role, handleInsert, errors }) {
    const [formUser, setFormUser] = useState(user ? user : {roleName: 'ROLE_ADMIN'})

    const navigate = useNavigate()
    console.log(formUser);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    console.log(errors);


    return (<div>
        {user ?
            <div className="form-update row p-5 fs-2">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-4 fw-bold">
                        <label>Thay đổi thông tin người dùng </label></div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Họ và tên</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder={formUser.fullname} onChange={(e) => setFormUser({ ...formUser, fullname: e.target.value })} disabled />
                        {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="name">Email</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="email" placeholder={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} disabled />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Số điện thoại</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="phone" placeholder={formUser.phone} onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })} disabled />
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="price">Địa chỉ</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="address" placeholder={formUser.address} onChange={(e) => setFormUser({ ...formUser, address: e.target.value })} disabled />
                    </div>
                </div>



                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="brand">Quyền</label>
                        <select style={{ height: '40px' }} className="form-control form-control-lg" id="role" onChange={(e) => setFormUser({ ...formUser, roleName: e.target.value })}>
                            <option value={formUser.role.name}>Hiện tại: {formUser.role.name}</option>
                            {
                                role.filter(item => item.id !== formUser.role.id).map((item) =>
                                    (<option key={item.id} value={item.name} >{item.name}</option>))
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleUpdate(formUser) }}>Xác nhận</button>
                    <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
            :
            //INSERT USER------------------
            <div className="form-update row p-5 fs-2">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-4 fw-bold">
                        <label>Thêm mới người dùng </label></div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Họ và tên</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder={formUser.fullname} onChange={(e) => setFormUser({ ...formUser, fullname: e.target.value })} />
                        {errors.fullname && <span className="text-danger">{errors.fullname}</span>}
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="name">Email</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="email" placeholder={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Số điện thoại</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="phone" placeholder={formUser.phone} onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })} />
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="price">Địa chỉ</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="address" placeholder={formUser.address} onChange={(e) => setFormUser({ ...formUser, address: e.target.value })} />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>
                </div>



                <div className="row mt-2">
                    <div className="mb-3 col-md-5 h-50">
                        <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                        <input style={{ height: '35px' }} type="password" className="form-control form-control-lg" id="newPassword" onChange={(e) =>setFormUser({ ...formUser, password: e.target.value })} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="brand">Quyền</label>
                        <select style={{ height: '40px' }} className="form-control form-control-lg" id="role" onChange={(e) => setFormUser({ ...formUser, roleName: e.target.value })}>
                            {
                                role && role.map((item) =>
                                    (<option key={item.id} value={item.name} >{item.name}</option>))
                            }
                        </select>
                        {errors.role && <span className="text-danger">{errors.role}</span>}
                    </div>
                </div>

                <div className="mt-5">
                    <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleInsert(formUser) }}>Xác nhận</button>
                    <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
        }

    </div>);
}

export default FormUser;