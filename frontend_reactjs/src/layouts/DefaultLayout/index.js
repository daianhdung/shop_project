import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Sidebar from '~/layouts/components/Sidebar/Sidebar';
import Footer from '~/layouts/components/Footer/Footer';
import { getCookie, removeCookie } from '~/utils/utilsCookie';

const cx = classNames.bind(styles)


function DefaultLayout({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(getCookie('tokenJwt') != null ? true : false);


    function handleLogout() {
        removeCookie('tokenJwt')
        setIsLoggedIn(false);
    }

    return (
        <div >
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
            <div style={{ background: 'rgba(245, 245, 250, 1)' }} >
                <div style={{ height: '2000px' }} className={cx('container')}>
                    <div className={cx('inner')}>
                        <Sidebar />
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