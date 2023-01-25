import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Sidebar.module.scss';
import { getAllBrandName } from '~/service/brandService';
import { getAllCategoryName } from '~/service/categoryService';
import { Link, Route, useLocation } from 'react-router-dom';
import { getAllSize } from '~/service/sizeService';
import useFilter from '~/hooks/useFilter';

const cx = classNames.bind(styles);

function Sidebar1() {
    const filterContext = useFilter()
    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()
    const [allSize, setAllSize] = useState()
    

    useEffect(() => {
        const fetchApiGetAllBrand = async () => {
            const response = await getAllBrandName()
            setAllBrand(response)
        }
        const fetchApiGetAllCategory = async () => {
            const response = await getAllCategoryName()
            setAllCategory(response)
        }
        const fetchApiGetAllSize = async () => {
            const response = await getAllSize()
            setAllSize(response)
        }
        fetchApiGetAllBrand()
        fetchApiGetAllCategory()
        fetchApiGetAllSize()
    }, [])


    return (<div className={cx('wrapper')}>

        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Bộ lọc</div>
                <div className='d-flex align-content-start flex-wrap'>
                    {allSize && allSize.map(item => (
                    <div key={item.id}>
                        <input type="checkbox" id={`${item.id}-size`}
                            checked={filterContext.filter.sizeId.includes(item.id)}
                            onChange={() => filterContext.handleCheckSize(item.id)}
                            className='btn-check'
                            
                        />
                        <label className="btn btn-light fs-4 my-2 mx-2"  htmlFor={`${item.id}-size`} >{item.name}</label>
                    </div>
                ))}
                </div>
        </div>
  
        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thể loại</div>
                <div className='d-flex align-content-start flex-wrap'>
                    {allCategory && allCategory.map(item => (
                        <div key={item.id}>
                            <input type="checkbox" id={`${item.id}-brand`}
                                checked={filterContext.filter.categoryId.includes(item.id)}
                                onChange={() => filterContext.handleCheckCategory(item.id)}
                                className='btn-check'
                                
                            />
                            <label className="btn btn-light fs-4 my-2 mx-2" htmlFor={`${item.id}-brand`} >{item.name}</label>
                        </div>
                    ))}
                </div>
           
        </div>

        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thương hiệu</div>
                <div className='d-flex align-content-start flex-wrap'>
                    {allBrand && allBrand.map(item => (
                        <div key={item.id}>
                            <input type="checkbox" id={`${item.id}-category`}
                                checked={filterContext.filter.brandId.includes(item.id)}
                                onChange={() => filterContext.handleCheckBrand(item.id)}
                                className='btn-check'
                            />
                            <label className="btn btn-light fs-4 my-2 mx-2" htmlFor={`${item.id}-category`} >{item.name}</label>
                        </div>
                    ))}
                </div>
        </div>
    </div>);
}

export default Sidebar1;
