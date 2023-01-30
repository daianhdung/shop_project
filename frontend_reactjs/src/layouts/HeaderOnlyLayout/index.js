import classNames from 'classnames/bind';
import React, { useState } from 'react';

import styles from './HeaderOnlyLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';
import config from '~/config';
import { useLocation } from 'react-router-dom';
import LoaderModal from '~/components/Modal/LoaderModal/LoaderModal';


const cx = classNames.bind(styles)


function HeaderOnlyLayout({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    return (
        <>
            {isLoading && <LoaderModal isLoading={isLoading} />}
            <div>
                <Header />
                <div className='p-1' style={{ background: 'rgba(245, 245, 250, 1)' }} >
                    <div className={cx('container',)}>
                        {React.cloneElement(children, { setIsLoading: setIsLoading })}
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderOnlyLayout;
