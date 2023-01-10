import React from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return ( <div className={cx('wrapper')}>
    <div className={cx('first_wrapper')}>
        <div className={cx('filter_div')}>Bộ lọc</div>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
    </div>
    <div className={cx('first_wrapper')}>
    <div className={cx('filter_div')}>Category</div>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
    </div>
    <div className={cx('first_wrapper')}>
    <div className={cx('filter_div')}>Another</div>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
        <a href="">Logic</a>
    </div>
    </div> );
}

export default Sidebar;
