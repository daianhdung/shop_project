import "swiper/css/bundle";
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Home.module.scss';
import React, { useEffect, useState } from "react";
import ShoesSwiper from "~/components/MySwiper/Slide/ShoesSwiper";
import * as productService from '~/service/getProductService'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Home({ setIsLoading }) {


    const [featuredProduct, setFeaturedProduct] = useState([]);

    const [topSoldProduct, setTopSoldProduct] = useState([]);

    useEffect(() => {

        const fetchApiFeaturedProduct = async () => {
            setIsLoading(true);
            const response = await productService.getFeaturedProduct()
            setFeaturedProduct(response)
            setIsLoading(false);

        }
        const fetchApiTopSoldProduct = async () => {
            setIsLoading(true);
            const response = await productService.getTopSoldProduct()
            setTopSoldProduct(response)
            setIsLoading(false);
        }
        fetchApiTopSoldProduct()
        fetchApiFeaturedProduct()



    }, [])




    return (<React.Fragment>
        <div className={cx('separate')}>
            <Link to={config.routes.product} ><h1 className={cx('title', 'mb-3')}>Top nổi bật</h1></Link>
            <div >
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}>{featuredProduct && <ShoesSwiper children={featuredProduct} />}</div>
                </div>
            </div>
        </div>
        <div className={cx('separate')}>
            <Link to={config.routes.product} ><h1 className={cx('title', 'mb-3')}>Top bán chạy</h1></Link>
            <div className={cx('wrapper')}>
                <div className={cx('wrap_swiper')}>
                    <div className={cx('top_branch_slide')}><ShoesSwiper children={topSoldProduct} /></div>
                </div>
            </div>
        </div>
    </React.Fragment>);
}

export default Home;