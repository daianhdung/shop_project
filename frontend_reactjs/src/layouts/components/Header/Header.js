import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';



import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';

import useAuth from '~/hooks/useAuth';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { get5BrandSmallestAmountSold, getAllBrandName } from '~/service/brandService';
import { getAllCategoryName } from '~/service/categoryService';


const cx = classNames.bind(styles);

function Header(props) {

    const context = useAuth()

    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()
    const [brandSmallSold, setBrandSmallSold] = useState()

    useEffect(() => {
        const fetchApiGetAllBrand = async () => {
            const response = await getAllBrandName()
            setAllBrand(response)
        }
        const fetchApiGetAllCategory = async () => {
            const response = await getAllCategoryName()
            setAllCategory(response)
        }
        const fetchApiGet5BrandSmallestSold = async () => {
            const response = await get5BrandSmallestAmountSold()
            setBrandSmallSold(response)
        }
        fetchApiGetAllBrand()
        fetchApiGetAllCategory()
        fetchApiGet5BrandSmallestSold()
    }, [])
    console.log(brandSmallSold);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('up_header')}>
                    <div className={cx('up_left_header')}>
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img
                                width="80"
                                height="58"
                                style={{ background: '#ebecf0' }}
                                src={images.logo}
                                alt="logo"
                            />
                        </Link>
                        <Search />
                    </div>
                    <div className={cx('up_right_header')}>
                        <nav className="header-nav">
                            <NavLink to={config.routes.home} className={cx('nav_link')}>Trang chủ</NavLink>
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('drop_down_wrap')}>
                                        <div className={cx('drop_down_content')} tabIndex="-1">
                                            {allBrand && allBrand.map((item) => (<Link to={config.routes.search + '?brandId=' + item.id} key={item.id} className={cx('block')} >{item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}>
                                <NavLink to={config.routes.detail} className={cx('nav_link')}>Thương hiệu <FontAwesomeIcon icon={faAngleDown} /></NavLink>
                            </Tippy>
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('drop_down_wrap')}>
                                        <div className={cx('drop_down_content')} tabIndex="-1">
                                            {allCategory && allCategory.map((item) => (<Link to={config.routes.search + '?categoryId=' + item.id} key={item.id} className={cx('block')}>{item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}>
                                <NavLink to="/blog" className={cx('nav_link')}>Thể loại <FontAwesomeIcon icon={faAngleDown} /></NavLink>
                            </Tippy>

                            <NavLink to="/cart" className={cx('nav_link')}>Giỏ hàng</NavLink>
                            <NavLink to="/contact" className={cx('nav_link')}>Liên hệ</NavLink>
                        </nav>
                    </div>
                    <div className={cx('up_last_header')}>
                        <nav className="header-nav">
                            {context.auth ? (
                                <React.Fragment>
                                    <NavLink onClick={context.logout} className={cx('nav_link1')}>Đăng xuất</NavLink>
                                    <NavLink to={config.routes.profile} className={cx('nav_link1')}>Username</NavLink>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <NavLink to={config.routes.signup} className={cx('nav_link')}>Đăng kí </NavLink>
                                    <NavLink to={config.routes.login} className={cx('nav_link')}>Đăng nhập</NavLink>
                                </React.Fragment>
                            )}

                        </nav>
                    </div>
                </div>
                <div className={cx('bottom_header')}>
                    <div className={cx('bottom_left_header')}>
                        <nav className="header-nav">
                            {brandSmallSold && brandSmallSold.map((item) => (
                                <NavLink key={item.id} to={config.routes.search + '?brandId=' + item.id} className={cx('nav_link')}>{item.name}</NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className={cx('bottom_right_header')}>
                        <img width='20' height='20' src="https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png" alt="header-icon-location" />
                        <h4 >Giao đến:</h4>
                        <div >Q. 1, P. Bến Nghé, Hồ Chí Minh</div></div>

                </div>
            </div>
        </header >
    );
}

export default Header;
