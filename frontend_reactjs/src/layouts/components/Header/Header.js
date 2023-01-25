import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';



import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';

import useAuth from '~/hooks/useAuth';
import Search from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDown, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { get5BrandSmallestAmountSold, getAllBrandName } from '~/service/brandService';
import { getAllCategoryName } from '~/service/categoryService';
import useCart from '~/hooks/useCart';
import useFilter from '~/hooks/useFilter';


const cx = classNames.bind(styles);

function Header(props) {

    const context = useAuth()


    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()
    const [brandSmallSold, setBrandSmallSold] = useState()

    const cartContext = useCart()
    const localItems = cartContext.items

    const filterContext = useFilter()


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
                            <NavLink to={config.routes.product} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <Tippy
                                interactive
                                render={(attrs) => (
                                    <div className={cx('drop_down_wrap')}>
                                        <div className={cx('drop_down_content')} tabIndex="-1">
                                            {allBrand && allBrand.map((item) => (<Link onClick={() => filterContext.handleClickBrand(item.id)} to={config.routes.product} key={item.id} className={cx('block', 'border-bottom')} >{item.name}</Link>
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
                                            {allCategory && allCategory.map((item) => (<Link onClick={() => filterContext.handleClickCate(item.id)} to={config.routes.product} key={item.id} className={cx('block', 'border-bottom')}>{item.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}>
                                <NavLink to={config.routes.detail} className={cx('nav_link')}>Thể loại <FontAwesomeIcon icon={faAngleDown} /></NavLink>
                            </Tippy>
                            <NavLink to={config.routes.contact} className={cx('nav_link')}>Liên hệ</NavLink>
                            <NavLink to="/cart" className={cx('nav_link_logo')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span className={cx('logo_number', 'logo_number_orange')}>{localItems ? cartContext.getTotalQuantityCart() : 0}</span>
                            </NavLink>
                            {context.authProvider.isLogin && <NavLink to={config.routes.bookmark} className={cx('nav_link_logo')}><FontAwesomeIcon icon={faHeart} /></NavLink>}

                        </nav>
                    </div>
                    <div className={cx('up_last_header')}>
                        <nav className="header-nav">
                            {context.authProvider.isLogin ? (
                                <Tippy
                                    interactive
                                    render={(attrs) => (
                                        <div className={cx('drop_down_wrap')}>
                                            <div className={cx('drop_down_content')} tabIndex="-1">
                                                <NavLink to={config.routes.profile} className={cx('block')}>Sửa thông tin</NavLink>
                                                <NavLink to={config.routes.changePassword} className={cx('block')}>Đổi mật khẩu</NavLink>
                                                <NavLink to={config.routes.home} onClick={context.logout} className={cx('block')}>Đăng xuất</NavLink>
                                            </div>
                                        </div>
                                    )}>
                                    <div className={cx('username')}>Hi, {context.authProvider.username}<FontAwesomeIcon icon={faAngleDown} /></div>
                                </Tippy>
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
