import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "~/service/orderService";
import { formatNumber } from '~/utils/stringUtils';
import styles from './Order.module.scss';

const cx = classNames.bind(styles);

function OrderSuccess() {

    const { token } = useParams();
    const [orderDetail, setOrderDetail] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApiGetDetailOrder = async () => {
            const response = await getOrderDetail(token)
            console.log(response);
            setOrderDetail(response.data)
        }
        fetchApiGetDetailOrder()
    }, [])


    return (<div className="row p-5">
        <div className="col-md-6">
            <div className="row align-items-center">
                <div className="col-md-2 me-4">
                    <div className="svg-container">
                        <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
                            <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22" />
                            <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17" />
                        </svg>
                    </div>
                </div>
                <div className="col-md-8">
                    <h1>Đặt hàng thành công!! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h1>
                </div>
            </div>
            <div className="row border border-info mt-5 p-4">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Thông tin mua hàng</h1>
                        <span className={cx('detail')}>Email: <span className={cx('detail_text')}>{orderDetail && orderDetail.userDTO.email}</span></span>
                        <br />
                        <span className={cx('detail')}> Họ và tên: <span className={cx('detail_text')}>{orderDetail && orderDetail.userDTO.fullname}</span></span>
                        <br />
                        <span className={cx('detail')}>Số điện thoại: <span className={cx('detail_text')}>{orderDetail && orderDetail.userDTO.phone}</span></span>
                    </div>
                    <div className="col-md-6">
                        <h1>Địa chỉ nhận hàng</h1>
                        <span className={cx('detail')}>Địa chỉ: <span className={cx('detail_text')}>{orderDetail && orderDetail.userDTO.address}</span></span>
                        <br />
                        <span className={cx('detail')}>Chi tiết: <span className={cx('detail_text')}>{orderDetail && orderDetail.deliveryAddress}</span></span>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <h1>Phương thức thanh toán</h1>
                        <h3>Giao hàng tiền mặt (COD)</h3>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
            <div className='mt-5'>
                <button onClick={() => navigate('/home', { replace: true })} className={cx('grow_spin', 'back')} type="submit"><FontAwesomeIcon icon={faLongArrowLeft} /> Quay lại mua hàng </button>
            </div>
        </div>
        <div className="col-md-6">
            <div className="p-5">
                <table className="border border-info">
                    <tbody>
                        {orderDetail && orderDetail.productOrderDTOList
                            .map((item, index) => (
                                <tr className="border-bottom" key={index}>
                                    <td className={cx('image-number', 'p-3')}>
                                            <img width={50} height={50} src={process.env.REACT_APP_IMG_URL + item.mainImage} />
                                            <span className={cx('image_number_orange')}>{item.amount}</span>
                                    </td>
                                    <td style={{ maxWidth: '250px', padding: '10px' }} className="ps-2">
                                        <h4>{item.name}</h4>
                                        <span>41.5</span>
                                    </td>
                                    <td className="p-5">
                                        <span>{formatNumber(item.price)}₫</span>

                                    </td>
                                </tr>
                            ))}
                        <tr className='border-bottom'>
                            <td className="p-5" colSpan={3}>
                                <div className="d-flex justify-content-between">
                                    <div className="mt-2">
                                        <h3 >Tạm tính</h3>
                                        <h3>Phí vận chuyển</h3>
                                        {orderDetail && <h3 >Giảm giá</h3>}
                                    </div>
                                    <div className="mt-2">
                                        <h3 align='right'>{orderDetail && formatNumber(orderDetail.tempTotal)}₫</h3>
                                        {orderDetail ? <h3 align='right'>{formatNumber(orderDetail.feeShip)}₫</h3> : <h3 align='right'>--</h3>}
                                        {orderDetail && <h3 align='right'>{formatNumber(orderDetail.tempTotal * orderDetail.coupon / 100)}₫</h3>}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr >
                            <td className="p-5" colSpan={3}>
                                <div className="d-flex justify-content-between mt-2">
                                    <h3>Tổng cộng</h3>
                                    <h3 className="text-info">{orderDetail && formatNumber(orderDetail.total)}₫</h3>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div >);
}

export default OrderSuccess;