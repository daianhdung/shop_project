import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Sidebar1 from '~/layouts/components/Sidebar/Sidebar1';
import Footer from '~/layouts/components/Footer/Footer';


const cx = classNames.bind(styles)


function DefaultLayout({ children }) {
    

    return (
        <div >
            <Header/>
            <div style={{ background: 'rgba(245, 245, 250, 1)' }} >
                <div style={{ height: '2000px' }} className={cx('container')}>
                    <div className={cx('inner')}>
                        <Sidebar1 />
                        <div className={cx('content')}>
                            {children}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
