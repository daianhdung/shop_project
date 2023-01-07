import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Header() {
    const [over, setOver] = useState(false);

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
                        <div className={cx('search_form')}>
                            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                            <button onMouseOver={() => setOver(true)}
                                onMouseLeave={() => setOver(false)} className={cx('btn-search')} >
                                <FontAwesomeIcon style={over ? { color: "black" } : {}} icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('up_right_header')}>
                        <nav className="header-nav">
                            <NavLink to={config.routes.home} className={cx('nav_link')}>Trang chủ</NavLink>
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <NavLink to="/blog" className={cx('nav_link')}>Tin tức</NavLink>
                            <NavLink to="/about-us" className={cx('nav_link')}>Giới thiệu</NavLink>
                            <NavLink to="/contact" className={cx('nav_link')}>Liên hệ</NavLink>
                        </nav>
                    </div>
                    <div className={cx('up_last_header')}>
                        <nav className="header-nav">
                            <NavLink to={config.routes.signup} className={cx('nav_link')}>Đăng kí</NavLink>
                            <NavLink to={config.routes.login} className={cx('nav_link')}>Đăng nhập</NavLink>

                        </nav>
                    </div>
                </div>
                <div className={cx('bottom_header')}>
                    <div className={cx('bottom_left_header')}>
                        <nav className="header-nav">
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                            <NavLink to={config.routes.detail} className={cx('nav_link')}>Sản phẩm</NavLink>
                        </nav>
                    </div>
                    <div className={cx('bottom_right_header')}>
                        <img width='20' height='20' src="https://salt.tikicdn.com/ts/upload/88/5c/9d/f5ee506836792eb7775e527ef8350a44.png" alt="header-icon-location" />
                        <h4 >Giao đến:</h4>
                        <div >Q. 1, P. Bến Nghé, Hồ Chí Minh</div></div>

                </div>
            </div>
        </header>
    );
}

export default Header;
