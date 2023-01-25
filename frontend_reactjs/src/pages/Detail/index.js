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
import { getAmountProduct } from "~/service/sizeService";
const cx = classNames.bind(styles);



function Detail() {



    const [count, setCount] = useState(1)
    const [modalOpen, setModalOpen] = useState(false);

    const [detailProduct, setDetailProduct] = useState()
    const { id } = useParams();

    const cartContext = useCart()
    const localItems = cartContext.items

    const [checkedSize, setCheckedSize] = useState({ productId: "", sizeId: "" })
    const [amount, setAmount] = useState()


    useEffect(() => {
        const fetchApiDetailProduct = async () => {
            const response = await getDetailProduct(id)
            setDetailProduct(response)
            setCheckedSize({ ...checkedSize, productId: response.id })
            console.log(response);
        }
        fetchApiDetailProduct()
    }, [id])

    const onReduce = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const onIncrease = () => {
        if(count < amount){
            setCount(count + 1)
        }
    }


    const onSubmit = () => {
        const item = {
            id: detailProduct.id,
            name: detailProduct.name,
            price: detailProduct.price,
            quantity: count,
            image: detailProduct.mainImage,
            sizeId: checkedSize.sizeId,
            maxOrder: amount,
            size: checkedSize.size
        }
        cartContext.addToCart(item)
        setModalOpen(true)
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const newCount = isNaN(inputValue) ? count : Number(inputValue);
        setCount(newCount);
    }

    const handleInput = (e) => {
        const inputValue = e.target.value;
        if(inputValue > amount) e.target.value = amount;
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

    useEffect(() => {
        const fetchApiGetAmountProduct = async () => {
            const response = await getAmountProduct(checkedSize.productId, checkedSize.sizeId)
            setAmount(response)
        }
        if (checkedSize.sizeId) {
            fetchApiGetAmountProduct()
        }
    }, [checkedSize.sizeId])

    const onChecked = (e) => {
        setCheckedSize({ ...checkedSize, sizeId: e.target.id, size: e.target.value })
        setCount(1)
    }

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
                    <h1 className="fw-bold">{detailProduct.name}</h1>
                    {amount && amount > 0 && <div className={cx('span-yellow')}>
                        Số lượng: {amount}
                    </div>}
                    {amount && amount == 0 && <div className={cx('span-yellow')}>
                        Hết hàng
                    </div>}
                    <div className={cx('description_detail')}>
                        <h3 className="my-4">Thương hiệu: <span>{detailProduct.brandName}</span></h3>

                        <h3 className={cx('price', 'my-4')}>Giá: <span>{formatNumber(detailProduct.price)} VND</span></h3>
                        <h3 className="my-4">Loại: <span>{detailProduct.categoryName}</span></h3>
                        {/* <h3 className="my-4">Tags: <span>Food Pet, Puppy</span></h3> */}
                    </div>
                </div>
                <div className={cx('product_size')}>
                    <label>
                        Size
                    </label>
                    <div>
                        {detailProduct.listSizeDTO.map((item) => (
                            <span style={{ display: 'inline-block' }} className="form-check" key={item.id}>
                                <input onChange={onChecked} id={item.id} type="radio" name="form-check-input" value={item.name} />
                                <label className="form-check-label" htmlFor={item.id}>
                                    {item.name}
                                </label>
                            </span>
                        ))}
                    </div>
                </div>
                {amount && amount > 0 ? <div className={cx('product_action')}>
                    <div className={cx('quantity_setup')}>
                        <label>
                            Số lượng
                        </label>
                        <button onClick={onReduce} className={cx('btn-reduce', 'btn')} type="button">
                            -
                        </button>
                        <input value={count} type="text" title="Số lượng" maxLength="3" id="qty" name="quantity"  onInput={handleInput} onChange={handleChange} />
                        <button onClick={onIncrease} className={cx('btn-increase', 'btn')} type="button">+</button>
                    </div>
                    <div className={cx('button_action')}>
                        <button onClick={onSubmit} className={cx('grow_spin')} type="submit" title="Mua Ngay">
                            <span><FontAwesomeIcon icon={faShoppingBag} /> MUA NGAY</span>
                        </button>
                    </div>
                </div> : <h1 className="text-danger fw-bold">Vui lòng chọn size</h1>}
            </div>
        </div>}
        {modalOpen && <CartModal closeModal={() => setModalOpen(false)} />}
    </div>
}

export default Detail;



