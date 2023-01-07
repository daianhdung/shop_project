import classNames from 'classnames/bind';

import styles from './Authen.module.scss';



const cx = classNames.bind(styles)

function AuthenLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    );
}

export default AuthenLayout;