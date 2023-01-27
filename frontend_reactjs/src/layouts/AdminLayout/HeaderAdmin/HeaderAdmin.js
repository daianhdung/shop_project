import { Link, NavLink } from "react-router-dom";
import classNames from 'classnames/bind';

import styles from './HeaderAdmin.module.scss';
import Search from "~/layouts/components/Search/Search";
import config from '~/config';
import Tippy from "@tippyjs/react/headless";
import useAuth from "~/hooks/useAuth";
import React from "react";

const cx = classNames.bind(styles)

function HeaderAdmin(props) {
    const context = useAuth()
    return (<div className={cx('wrapper', 'f-spaceb-align')}>
        <Link to={config.routes.adminHome}><h3 style={{ color: '#fff' }}>DASH BOARD</h3></Link>
        <div className={cx('f-spaceb-align', 'right_header')}>
            <Search />
            <div className={cx('f-center-align')}>
                <Tippy
                    interactive
                    render={(attrs) => (
                        <div className={cx('drop_down_wrap')}>
                            <div className={cx('drop_down_content')} tabIndex="-1">
                                <NavLink to={config.routes.adminProfile} className={cx('block')}>Sửa thông tin</NavLink>
                                <NavLink to={config.routes.adminChangePassword} className={cx('block')}>Đổi mật khẩu</NavLink>
                                <NavLink to={config.routes.home} onClick={context.logout} className={cx('block')}>Đăng xuất</NavLink>
                            </div>
                        </div>
                    )}>
                    <span className="f-center-align">
                        <h3 className="ms-5">Hi, {context.authProvider.username}</h3>
                        <div className={cx('avatar', 'f-center-align', 'ms-3')}>
                            <img src={process.env.PUBLIC_URL + '/logo192.png'} />
                        </div>
                    </span>
                </Tippy>

            </div>
        </div>
    </div>);
}

export default HeaderAdmin;