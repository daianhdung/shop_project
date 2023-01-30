import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchBrandOrCategory } from '~/service/getProductService';

import config from '~/config';
import styles from './SearchProduct.module.scss';
import { formatNumber } from '~/utils/stringUtils';

const cx = classNames.bind(styles);

function SearchProduct() {
    const [searchParams, setSearchParams] = useSearchParams();

    const brandId = searchParams.get("brandId")
    const categoryId = searchParams.get("categoryId")
    
    const [detailProduct, setDetailProduct] = useState()




    useEffect(() => {
        const fetchApiSearchProduct = async () => {
            const response = await searchBrandOrCategory(brandId, categoryId)
            setDetailProduct(response)
        }
        fetchApiSearchProduct()
    }, [brandId, categoryId])
    console.log(detailProduct);



    return ((
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {detailProduct && detailProduct.length ? detailProduct.map((item) => (
                    <Link key={item.id} className={cx('link-a')} to={config.routes.detail + '/' + item.id}>
                        <div className={cx('wrap_item')}>
                            <img width={200} height={200} src={process.env.REACT_APP_IMG_URL + item.mainImage} alt="product"/>
                            <div>
                                <h4>{item.name}</h4>
                                <span>{formatNumber(item.price)}₫</span>
                            </div>
                        </div>
                    </Link>
                )): <h2 style={{height: '50vh'}}>Sản phẩm tìm kiếm hiện hết hàng</h2>}
            </div>
        </div>
    ));
}

export default SearchProduct;