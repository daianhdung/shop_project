import "swiper/css/bundle";
import classNames from 'classnames/bind';


import styles from './Detail.module.scss';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ShoesThumb from "~/components/MySwiper/SlideThumb/ShoesThumb";

const cx = classNames.bind(styles);

function Detail() {
    return <div className={cx('wrapper')}>
        <div className={cx('header-detail')}>
            <span>Homepage</span>
            <FontAwesomeIcon icon={faAngleRight} />
            <span>Thương hiệu</span>
            <FontAwesomeIcon icon={faAngleRight} />
            <span>Sản phẩm</span>
        </div>
        <div className={cx('mid-detail')}>
            <div className={cx('left-detail')}>
                <ShoesThumb />
            </div>
            <div className={cx('right-detail')}>
                <div className={cx('description')}>
                    <h1>Heavy Duty Wool Knife</h1>
                    <div>
                        <h3>Brands: <span>Bags on Board</span></h3>
                        <h3>SKU: <span>HEAVY-DUTY-WOOL-KNIFE-02012537</span></h3>
                        <h2>$169.93</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam rem
                            possimus aliquam officiis maiores natus mollitia</p>
                        <h3>Categories: <span>Flea & Tick, Food</span></h3>
                        <h3>Tags: <span>Food Pet, Puppy</span></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Detail;