import "swiper/css/bundle";
import classNames from 'classnames/bind';


import styles from './Detail.module.scss';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import ShoesThumb from "~/components/MySwiper/SlideThumb/ShoesThumb";
import CartModal from "~/components/Modal/CartModal/CartModal";
import { Link, useParams } from "react-router-dom";
import config from '~/config';
import { getDetailProduct } from '~/service/getProductService'
import { formatNumber } from '~/utils/stringUtils';
import useCart from "~/hooks/useCart";
const cx = classNames.bind(styles);



function Detail() {

    

    const [count, setCount] = useState(1)
    const [modalOpen, setModalOpen] = useState(false);

    const [detailProduct, setDetailProduct] = useState()
    const { id } = useParams();

    const cartContext = useCart()
    const localItems = cartContext.items
    

    useEffect(() => {
        const fetchApiDetailProduct = async () => {
            const response = await getDetailProduct(id)
            setDetailProduct(response)
        }
        fetchApiDetailProduct()
    }, [id])

    const onReduce = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    const onIncrease = () => {
        setCount(count + 1)
    }


    const onSubmit = () => {
        const item = {
            id: detailProduct.id,
            name: detailProduct.name,
            price: detailProduct.price,
            quantity: count,
            image: detailProduct.mainImage
        }
        cartContext.addToCart(item)
        setModalOpen(true)
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const newCount = isNaN(inputValue) ? count : Number(inputValue);
        setCount(newCount);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27 && modalOpen) {
                setModalOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalOpen]);

    return <div className={cx('wrapper')}>
        <div className={cx('header-detail')}>
            <Link className={cx('link-header')} to={config.routes.home}>Trang chủ</Link>
            <FontAwesomeIcon icon={faAngleRight} />
            <span>Thương hiệu</span>
            <FontAwesomeIcon icon={faAngleRight} />
            <span>Sản phẩm</span>
        </div>
        {detailProduct && <div className={cx('mid-detail')}>
            <div className={cx('left-detail')}>
                <ShoesThumb children={detailProduct.images} />
            </div>
            <div className={cx('right-detail')}>
                <div className={cx('description')}>
                    <h1>{detailProduct.name}</h1>
                    <div className={cx('span-yellow')}>
                        Hết hàng
                    </div>
                    <div className={cx('description_detail')}>
                        <h3>Thương hiệu: <span>{detailProduct.brandName}</span></h3>

                        <h3 className={cx('price')}>Giá: <span>{formatNumber(detailProduct.price)} VND</span></h3>
                        <h3>Loại: <span>Flea & Tick, Food</span></h3>
                        <h3>Tags: <span>Food Pet, Puppy</span></h3>
                    </div>
                </div>
                <div className={cx('product_size')}>
                    <label>
                        Size
                    </label>
                    <div>
                        <div data-value="36.5">
                            <input id="swatch-0-36-5" type="radio" name="option-0" value="36.5" />
                            <label htmlFor="swatch-0-36-5">
                                36.5
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx('product_action')}>
                    <div className={cx('quantity_setup')}>
                        <label>
                            Số lượng
                        </label>
                        <button onClick={onReduce} className={cx('btn-reduce', 'btn')} type="button">
                            -
                        </button>
                        <input value={count} type="text" title="Số lượng" maxLength="3" id="qty" name="quantity" onChange={handleChange} />
                        <button onClick={onIncrease} className={cx('btn-increase', 'btn')} type="button">+</button>
                    </div>
                    <div className={cx('button_action')}>
                        <button onClick={onSubmit} className={cx('grow_spin')} type="submit" title="Mua Ngay">
                            <span><FontAwesomeIcon icon={faShoppingBag} /> MUA NGAY</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>}
        {modalOpen && <CartModal closeModal={() => setModalOpen(false)} />}
    </div>
}

export default Detail;