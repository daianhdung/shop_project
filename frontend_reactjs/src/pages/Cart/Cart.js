import { faAngleRight, faLongArrowLeft, faLongArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import config from '~/config';
import styles from './Cart.module.scss';
import { formatNumber } from '~/utils/stringUtils';

const cx = classNames.bind(styles);

function Cart() {

    const navigate = useNavigate();




    var localItems = JSON.parse(localStorage.getItem('items'))


    const [count, setCount] = useState()
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

    return (<div className={cx('wrapper')}>
        <div className={cx('header-cart')}>
            <Link className={cx('link-header')} to={config.routes.home}>Trang chủ</Link>

            <FontAwesomeIcon icon={faAngleRight} />
            <span>Sản phẩm</span>
        </div>
        <div className={cx('bot-cart')}>
            <table border={1}>
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
                                                <span>- 38.5</span>
                                                <div className={cx('modal-close')}>&times; Xóa sản phẩm</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{formatNumber(item.price)}</td>
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
                                    <td><FontAwesomeIcon icon={faTrash} /></td>
                                </tr>
                            ))}
                            <tr><td style={{ padding: '5px' }} colSpan={6} align='right'>Tổng tiền: 5.000.000VND</td></tr>
                        </> : <tr><td colSpan={6}><h2>Chưa có sản phẩm trong giỏ hàng</h2></td></tr>}
                </tbody>
            </table>
        </div>

        <div className={cx('cart-footer')}>
            <button onClick={() => navigate(-1)} style={{ background: 'var(--disabled-color)', borderColor: 'var(--disabled-color)' }} className={cx('grow_spin')} type="submit"><FontAwesomeIcon icon={faLongArrowLeft} /> Quay lại mua hàng </button>
            <button className={cx('grow_spin')} type="submit">Tiến hành đặt hàng <FontAwesomeIcon icon={faLongArrowRight} /></button>
        </div>
    </div>);
}

export default Cart;


