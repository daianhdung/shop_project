import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './HeaderOnlyLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';
import config from '~/config';
import { useLocation } from 'react-router-dom';


const cx = classNames.bind(styles)


function HeaderOnlyLayout({ children }) {

    const location = useLocation()
    return (
        <div>
            <Header />
            <div className='p-1' style={{ background: 'rgba(245, 245, 250, 1)' }} >
                <div className={cx('container', )}>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default HeaderOnlyLayout;
