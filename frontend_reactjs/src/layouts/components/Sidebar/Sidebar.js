import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Sidebar.module.scss';
import { getAllBrandName } from '~/service/brandService';
import { getAllCategoryName } from '~/service/categoryService';
import { Link, Route, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()
    useEffect(() => {
        const fetchApiGetAllBrand = async () => {
            const response = await getAllBrandName()
            setAllBrand(response)
        }
        const fetchApiGetAllCategory = async () => {
            const response = await getAllCategoryName()
            setAllCategory(response)
        }
        fetchApiGetAllBrand()
        fetchApiGetAllCategory()
    }, [])

    const location = useLocation()

    return (<div className={cx('wrapper')}>
        {location.pathname === '/search/' && location.search && (
            <div className={cx('first_wrapper')}>
                <div className={cx('filter_div')}>Bộ lọc</div>
                <a href="">Logic</a>
                <a href="">Logic</a>
                <a href="">Logic</a>
                <a href="">Logic</a>
                <a href="">Logic</a>
                <a href="">Logic</a>
            </div>
        )}
        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thể loại</div>
            {allCategory && allCategory.map((item) => (<Link to={config.routes.search + '?categoryId=' + item.id} key={item.id} className={cx('block')}>{item.name}</Link>
            ))}
        </div>
        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thương hiệu</div>
            {allBrand && allBrand.map((item) => (<Link to={config.routes.search + '?brandId=' + item.id} key={item.id} className={cx('block')} >{item.name}</Link>
            ))}
        </div>
    </div>);
}

export default Sidebar;
