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
    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()
    const [allSize, setAllSize] = useState()

    const [checkSize, setCheckSize] = useState([])
    const [checkCategory, setCheckCategory] = useState([])
    const [checkBrand, setCheckBrand] = useState([])
    const [filter, setFilter] = useState({})

    const filterContext = useFilter()

    const handleCheckSize = (id) => {
        setCheckSize(prev => {
            const isChecked = checkSize.includes(id)
            if (isChecked) {
                return checkSize.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }
    const handleCheckCategory = (id) => {
        setCheckCategory(prev => {
            const isChecked = checkCategory.includes(id)
            if (isChecked) {
                return checkCategory.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }
    const handleCheckBrand = (id) => {
        setCheckBrand(prev => {
            const isChecked = checkBrand.includes(id)
            if (isChecked) {
                return checkBrand.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }
    useEffect( () => {
        setFilter( {
            ...filter,
            checkBrand,
            checkSize,
            checkCategory
        })
    }, [checkBrand, checkSize, checkCategory])
    useEffect( () => {
        filterContext.handleFilter(filter)
    }, [filter])
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

    const location = useLocation()

    return (<div className={cx('wrapper')}>

        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Bộ lọc</div>
            {allSize && allSize.map(item => (
                <div key={item.id}>
                    <input type="checkbox" id={`${item.id}-size`}
                        checked={checkSize.includes(item.id)}
                        onChange={() => handleCheckSize(item.id)}
                    />
                    <label htmlFor={`${item.id}-size`} >{item.name}</label>
                </div>
            ))}
        </div>
  
        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thể loại</div>
            {allCategory && allCategory.map(item => (
                <div key={item.id}>
                    <input type="checkbox" id={`${item.id}-brand`}
                        checked={checkCategory.includes(item.id)}
                        onChange={() => handleCheckCategory(item.id)}
                    />
                    <label htmlFor={`${item.id}-size`} >{item.name}</label>
                </div>
            ))}
        </div>

        <div className={cx('first_wrapper')}>
            <div className={cx('filter_div')}>Thương hiệu</div>
            {allBrand && allBrand.map(item => (
                <div key={item.id}>
                    <input type="checkbox" id={`${item.id}-category`}
                        checked={checkCategory.includes(item.id)}
                        onChange={() => handleCheckBrand(item.id)}
                    />
                    <label htmlFor={`${item.id}-size`} >{item.name}</label>
                </div>
            ))}
        </div>
    </div>);
}

export default Sidebar1;