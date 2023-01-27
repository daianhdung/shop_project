import { useEffect, useState } from "react";

function FormUser({ user }) {
    const [formUser, setFormUser] = useState(user)
    console.log(formUser);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (<div>
        {/* {user ?
            <div className="form-update row p-5 fs-2">
                <div className="row justify-content-center mb-3">
                    <div className="col-md-4 fw-bold">
                        <label>Thay đổi thông tin người dùng </label></div>
                </div>
                <div className="row">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Họ và tên</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder="Họ và tên" value={formUser.fullname} onChange={(e) => setFormUser({ ...formUser, fullname: e.target.value })} />
                    </div>

                    <div className="form-group col-md-5">
                        <label htmlFor="name">Email</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="email" placeholder="Email" value={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} />
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="name">Số điện thoại</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="phone" placeholder="Số điện thoại" value={formUser.phone} onChange={(e) => setFormUser({ ...formUser, phone: e.target.value })} />
                    </div>
                    <div className="form-group col-md-5">
                        <label htmlFor="price">Địa chỉ</label>
                        <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="address" placeholder="Địa chỉ" value={formUser.address} onChange={(e) => setFormUser({ ...formUser, address: e.target.value })} />
                    </div>
                </div>



                <div className="row mt-2">
                    <div className="form-group col-md-5">
                        <label htmlFor="brand">Quyền</label>
                        <select style={{ height: '40px' }} className="form-control form-control-lg" id="role" value={formUser.roleName} onChange={(e) => setFormUser({ ...formUser, roleName: e.target.value })}>
                            {
                                brands.map(brand => (<option key={brand.id} value={brand.id} >{brand.name}</option>))
                            }
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleUpdate(user.id, name, price, brand, category, checkSize, mainImage, images) }}>Xác nhận</button>
                    <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            </div>
            :
            //INSERT PRODUCT------------------
            // <div className="form-insert row p-5 fs-2">
            //     <div className="form-insert row justify-content-center mb-3">
            //         <div className="col-md-3 fs-1 fw-bold">
            //             <label> Thêm sản phẩm </label>
            //         </div>
            //     </div>
            //     <div className="row">
            //         <div className="form-group col-md-5">
            //             <label htmlFor="name">Tên sản phẩm</label>
            //             <input style={{ height: '40px' }} type="text" className="form-control form-control-lg my -1" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)} />
            //         </div>

            //         <div className="form-group col-md-5">
            //             <label htmlFor="brand">Thương hiệu</label>
            //             <select style={{ height: '40px' }} className="form-control form-control-lg" id="brand" value={brand} onChange={(e) => SetBrand(e.target.value)}>
            //                 {
            //                     brands.map(brand => (<option key={brand.id} value={brand.id} >{brand.name}</option>))
            //                 }
            //             </select>
            //         </div>
            //     </div>

            //     <div className="row mt-2">
            //         <div className="form-group col-md-5">
            //             <label htmlFor="category">Loại</label>
            //             <select style={{ height: '40px' }} className="form-control form-control-lg" id="category" value={category} onChange={(e) => SetCategory(e.target.value)}>
            //                 {
            //                     categories.map(category => (<option key={category.id} value={category.id} >{category.name}</option>))
            //                 }
            //             </select>
            //         </div>

            //         <div className="form-group col-md-5">
            //             <label htmlFor="price">Giá sản phẩm</label>
            //             <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)} />
            //         </div>
            //     </div>

            //     <div className="row mt-2">
            //         <div className="form-group col-md-6">
            //             <label>Kích thước</label>
            //             <div className='d-flex align-content-start flex-wrap'>
            //                 {
            //                     sizes.map(item => (
            //                         <div key={item.id}>
            //                             <input type="checkbox" id={`${item.id}-size`}
            //                                 checked={checkSize.includes(item.id)}
            //                                 onChange={() => handleCheckSize(item.id)}
            //                                 className='btn-check'

            //                             />
            //                             <label className="btn btn-light fs-4 my-2 mx-2" htmlFor={`${item.id}-size`} >{item.name}</label>
            //                         </div>)
            //                     )
            //                 }
            //             </div>
            //         </div>
            //     </div>

            //     <div className="row mt-3">
            //         <div className="form-group col-md-6 row">
            //             <label htmlFor="main-image">Ảnh Chính: </label>
            //             <input type="file" className="form-control-file " id="main-image" onChange={(e) => SetMainImage(e.target.files[0])} />
            //         </div>
            //     </div>
            //     <div className="row mt-3">
            //         <div className="form-group col-md-6 row">
            //             <label htmlFor="images">Ảnh Phụ: </label>
            //             <input type="file" className="form-control-file " id="images" multiple onChange={(e) => SetImages(e.target.files)} />
            //         </div>
            //     </div>

            //     <div className="mt-5">
            //         <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => { handleInsert(name, price, brand, category, checkSize, mainImage, images) }}>Xác nhận</button>
            //         <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
            //     </div>
            // </div> 
            <></>
        } */}

    </div>);
}

export default FormUser;