import "swiper/css/bundle";
import classNames from 'classnames/bind';


import "~/components/MySwiper/style.css";

import styles from './Home.module.scss';
import React from "react";
import ShoesSwiper from "~/components/MySwiper/ShoesSwiper";

const cx = classNames.bind(styles);

function Home() {
    return (<React.Fragment>
        <div className={cx('separate')}>
            <h1>Thương hiệu nổi bật</h1>
            <div >
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}><ShoesSwiper /></div>
                </div>
            </div>
        </div>
        <div className={cx('separate')}>
            <h1>Top bán chạy</h1>
            <div className={cx('wrapper')}>
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}><ShoesSwiper /></div>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default Home;