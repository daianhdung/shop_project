import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Sidebar1 from '~/layouts/components/Sidebar/Sidebar1';
import Footer from '~/layouts/components/Footer/Footer';
import config from '~/config';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';


const cx = classNames.bind(styles)


function DefaultLayout({ children }) {

    const location = useLocation()
    return (
        <div >
            <Header />
            <div style={{ background: 'rgba(245, 245, 250, 1)' }} >
                <div className={cx('container')}>
                    {(location.pathname == config.routes.product || location.pathname == config.routes.bookmark || location.pathname === '/search/' && location.search) ? <div className={cx('inner')}>
                        <Sidebar1 />
                        <div className={cx('content')}>
                            {children}
                            <Footer />
                        </div>
                    </div> : <div className={cx('inner_non_sideber')}>
                        <div className={cx('content_non_sideber')}>
                            {children}
                            <Footer />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
