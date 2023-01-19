import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import config from '~/config';
import useCart from '~/hooks/useCart';
import { formatNumber } from "~/utils/stringUtils";

function Order() {

    const navigate = useNavigate()
    const cart = useCart()

    const localItems = cart.items

    useEffect(() => {
        const condition = false
        if (!localItems || localItems.length === 0) {
            navigate('/cart', { replace: true })
        }
    }, [])

    return (<div className="my-5 bg-white rounded p-5">
        <div className="row">
            <div className="mb-3 col-md-4">
                <div className="mb-3">
                    <label className="form-label">Thông tin mua hàng</label>
                    <input placeholder="Email" style={{ height: '45px', userSelect: 'none' }} type="email" className="form-control form-control-lg" id="email" />
                </div>
                <div className="mb-3">
                    <input placeholder="Họ và tên" style={{ height: '45px' }} type="text" className="form-control form-control-lg" id="fullname" />
                </div>
                <div className="mb-3">
                    <input placeholder="Số điện thoại" style={{ height: '45px', userSelect: 'none' }} type="text" className="form-control form-control-lg" id="phone" />
                </div>
                <div className="mb-3">
                    <input placeholder="Địa chỉ" style={{ height: '45px', userSelect: 'none' }} type="text" className="form-control form-control-lg" id="address" />
                </div>
                <div className="mt-3 mb-3">
                    <select style={{ height: '45px' }} className="form-select form-select-lg mb-3 fs-4" aria-label=".form-select-lg example">
                        <option value='' defaultValue=''>Tỉnh thành --</option>
                        <option value="1">One</option>
                    </select>
                </div>
                <div className="mb-3">
                    <select style={{ height: '45px' }} className="form-select form-select-lg mb-3 fs-4" aria-label=".form-select-lg example" disabled>
                        <option value='' defaultValue=''>Quận huyện --</option>
                        <option value="1">One</option>
                    </select>
                </div>
                <div className="mb-3">
                    <select style={{ height: '45px' }} className="form-select form-select-lg mb-3 fs-4" aria-label=".form-select-lg example" disabled>
                        <option value='' defaultValue=''>Phường xã --</option>
                        <option value="1">One</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Ghi chú (tùy chọn)</label>
                    <textarea style={{ height: '100px' }} className="form-control fs-4" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div className="mb-3 col-md-4 h-50">
                <label className="form-label">Thanh toán</label>
                <div>
                    <div style={{ userSelect: 'none' }} className=" input-group mb-3">
                        <div className="input-group-text">
                            <input className="fs-4 form-check-input mt-0" name="payment" type="radio" value="" aria-label="Radio button for following text input" />
                        </div>
                        <input style={{ height: '45px', userSelect: 'none' }} type="text" className="fs-4 form-control " aria-label="Text input with radio button"
                            value='Chuyển khoản ngân hàng' disabled />
                    </div>
                    <div style={{ userSelect: 'none' }} className=" input-group">
                        <div className="input-group-text">
                            <input className="fs-4 form-check-input mt-0" name="payment" type="radio" value="" aria-label="Radio button for following text input" />
                        </div>
                        <input style={{ height: '45px', userSelect: 'none' }} type="text" className="fs-4 form-control " aria-label="Text input with radio button"
                            value='Giao hàng tiền mặt (COD)' disabled />
                    </div>
                </div>
            </div>
            <div className="mb-3 col-md-4 h-50">
                <label className="form-label">Đơn hàng ({localItems && localItems.length} sản phẩm)</label>
                <hr></hr>
                <table >
                    <tbody >
                        {localItems && localItems.map((item) => (
                            <tr key={item.id}>
                                <td className="p-3">
                                    <img width={50} height={50} src={process.env.REACT_APP_IMG_URL + item.image} />
                                </td>
                                <td>
                                    <h4>{item.name}</h4>
                                    <span>41.5</span>
                                </td>
                                <td>
                                    <span>{formatNumber(item.price)}₫</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div className="mb-3 row mb-5 py-3">
                    <div className="col-md-8">
                        <input placeholder="Nhập vào mã giảm giá" style={{ height: '55px' }} type="text" className="form-control form-control-lg
                        w-70" id="coupon" />
                    </div>
                    <div className="col-md-4 ">
                        <button className="rounded bg-primary text-white" style={{ height: '55px', width: '125px' }}>Áp dụng</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div className="mt-5">
                        <h3>Tạm tính</h3>
                        <h3>Phí vận chuyển</h3>
                    </div>
                    <div className="mt-5">
                        <h3>1.450.000₫</h3>
                        <h3>--</h3>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between mt-2">
                    <h3>Tổng cộng</h3>
                    <h3 className="text-info">1.450.000₫</h3>
                </div>
                <div className="d-flex justify-content-between mt-5 align-items-center">
                    <Link className="fs-2" to={config.routes.cart}><FontAwesomeIcon className="me-3" icon={faAngleLeft} />Quay lại giỏ hàng</Link>
                    <button className="rounded bg-primary text-white fs-3" style={{ height: '65px', width: '135px' }}>Đặt hàng</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Order;