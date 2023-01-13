import classNames from 'classnames/bind';

import styles from './CartModal.module.scss';
import React, { useState } from "react";
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function CartModal({ closeModal }) {
    const [count, setCount] = useState(1)
    const onReduce = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    const onIncrease = () => {
        setCount(count + 1)
    }
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const newCount = isNaN(inputValue) ? count : Number(inputValue);
        setCount(newCount);
    }

    return (<React.Fragment>
        <div className={cx('modal-overlay')} onClick={closeModal}>
            <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={closeModal}>
                    <div className={cx('modal-header')}>
                        <img src='//bizweb.dktcdn.net/100/347/064/themes/717243/assets/add_to_cart.svg?1671644724927' />
                        <div>
                            <h3>Bạn đã thêm sản phẩm ... vào giỏ hàng</h3>
                            <h4>Giỏ hàng của bạn (0 sản phẩm )</h4>
                        </div>
                        <span className={cx('modal-close')} onClick={closeModal}>&times;</span>
                    </div>
                    <div className={cx('modal-body')}>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>SẢN PHẨM</th>
                                    <th>ĐƠN GIÁ</th>
                                    <th>SỐ LƯỢNG</th>
                                    <th>THÀNH TIỀN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={cx('wrap_td')}>
                                            <img src={process.env.PUBLIC_URL + '/image/air-jordan.webp'} />
                                            <div className={cx('descrip-product')}>
                                                <p>Jordan 1 High Zoom Air CMFT Canyon Rust (CT0979-602)</p>
                                                <span>- 38.5</span>
                                                <div className={cx('modal-close')}>&times; Xóa sản phẩm</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>5.000.000 VND</td>
                                    <td>
                                        <div className={cx('quantity_setup')}>
                                            <button onClick={onReduce} className={cx('btn-reduce', 'btn')} type="button">
                                                -
                                            </button>
                                            <input value={count} type="text" title="Số lượng" maxLength="3" id="qty" name="quantity" onChange={handleChange} />
                                            <button onClick={onIncrease} className={cx('btn-increase', 'btn')} type="button">+</button>
                                        </div>
                                    </td>
                                    <td>5.000.000 VND</td>
                                </tr>
                                <tr><td style={{padding: '5px'}} colSpan={5} align='right'>Tổng tiền: 5.000.000VND</td></tr>
                            </tbody>
                            
                        </table>
                    </div>
                    <div className={cx('modal-footer')}>
                        <button className={cx('grow_spin')} type="submit">Tiến hành đặt hàng <FontAwesomeIcon icon={faLongArrowRight} /></button>
                    </div>
                </form>
            </div>
        </div>
    </React.Fragment>);
}

export default CartModal;