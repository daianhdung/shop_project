import { faAngleRight, faLongArrowLeft, faLongArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import config from '~/config';
import styles from './Cart.module.scss';
import { formatNumber } from '~/utils/stringUtils';
import useAuth from '~/hooks/useAuth';
import useCart from '~/hooks/useCart';
import CartContext from '~/context/CartProvider';

const cx = classNames.bind(styles);

function Cart() {

    const navigate = useNavigate();

    const cart = useCart()

    const localItems = cart.items


    return (<div className={cx('wrapper')}>
        <div className={cx('header-cart')}>
            <Link className={cx('link-header')} to={config.routes.home}>Trang chủ</Link>

            <FontAwesomeIcon icon={faAngleRight} />
            <span>Sản phẩm</span>
        </div>
        <div className={cx('bot-cart')}>
            <table className={cx('table-bordered')}>
                <thead>
                    <tr>
                        <th>ẢNH SẢN PHẨM</th>
                        <th>THÔNG TIN</th>
                        <th>ĐƠN GIÁ</th>
                        <th>SỐ LƯỢNG</th>
                        <th>THÀNH TIỀN</th>
                        <th>XÓA</th>
                    </tr>
                </thead>
                <tbody>
                    {localItems ?
                        <>
                            {localItems && localItems.map((item) => (
                                <tr key={item.id}>
                                    <td><img width={140} height={140} src={process.env.REACT_APP_IMG_URL + item.image} /></td>
                                    <td>
                                        <div className={cx('wrap_td')}>
                                            <div className={cx('descrip-product')}>
                                                <p>{item.name}</p>
                                                <span>Size - 38.5</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatNumber(item.price)}</td>
                                    <td>
                                        <div className={cx('quantity_setup')}>
                                            <button onClick={() => cart.onReduce(item.id)} className={cx('btn-reduce', 'btn')} type="button">
                                                -
                                            </button>
                                            <input value={item.quantity} type="text" title="Số lượng" maxLength="2" name="quantity" onChange={(e) => cart.handleChange(e, item.id)} />
                                            <button onClick={() => cart.onIncrease(item.id)} className={cx('btn-increase', 'btn')} type="button">+</button>
                                        </div>
                                    </td>
                                    <td ><div className={cx('total')}>{formatNumber(item.price * item.quantity)} VND</div></td>
                                    <td><FontAwesomeIcon style={{cursor: 'pointer'}} onClick={() => cart.onDelete(item.id)} icon={faTrash} /></td>
                                </tr>
                            ))}
                            <tr><td style={{ padding: '5px' }} colSpan={6} align='right'>Tổng tiền: {cart.getTotalCart &&  formatNumber(cart.getTotalCart())} VND</td></tr>
                        </> : <tr><td colSpan={6}><h2>Chưa có sản phẩm trong giỏ hàng</h2></td></tr>}
                </tbody>
            </table>
        </div>

        <div className={cx('cart-footer')}>
            <button onClick={() => navigate('/home')} style={{ background: 'var(--disabled-color)', borderColor: 'var(--disabled-color)' }} className={cx('grow_spin')} type="submit"><FontAwesomeIcon icon={faLongArrowLeft} /> Quay lại mua hàng </button>
            <Link to={config.routes.order}><button className={cx('grow_spin')} type="submit">Tiến hành đặt hàng <FontAwesomeIcon icon={faLongArrowRight} /></button></Link>
        </div>
    </div>);
}

export default Cart;


