import { Link } from "react-router-dom";
import classNames from 'classnames/bind';

import styles from './HeaderAdmin.module.scss';
import Search from "~/layouts/components/Search/Search";

const cx = classNames.bind(styles)

function HeaderAdmin(props) {
    return (<div className={cx('wrapper', 'f-spaceb-align')}>
        <h3 style={{color: '#fff'}}>DASH BOARD</h3>
        <div className={cx('f-spaceb-align', 'right_header')}>
            <Search />
            <div className={cx('f-center-align')}>
                <h3>Hello Admin</h3>
                <div className={cx('avatar', 'f-center-align')}>
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} />
                </div>
            </div>
        </div>
    </div>);
}

export default HeaderAdmin;