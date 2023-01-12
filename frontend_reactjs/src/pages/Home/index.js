import "swiper/css/bundle";
import classNames from 'classnames/bind';


import styles from './Home.module.scss';
import React, { useEffect, useState } from "react";
import ShoesSwiper from "~/components/MySwiper/Slide/ShoesSwiper";
import * as productService from '~/service/getProductService'

const cx = classNames.bind(styles);

function Home() {

    const [featuredProduct, setFeaturedProduct] = useState([]);
    
    useEffect(() => {
        const fetchApiFeaturedProduct = async() => {
            const response = await productService.getFeaturedProduct()
            setFeaturedProduct(response)
        }
        fetchApiFeaturedProduct()
    }, [])

    return (<React.Fragment>
        <div className={cx('separate')}>
            <h2>Top nổi bật</h2>
            <div >
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}>{featuredProduct && <ShoesSwiper children={featuredProduct}/>}</div>
                </div>
            </div>
        </div>
        <div className={cx('separate')}>
            <h2>Top bán chạy</h2>
            <div className={cx('wrapper')}>
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}><ShoesSwiper /></div>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default Home;