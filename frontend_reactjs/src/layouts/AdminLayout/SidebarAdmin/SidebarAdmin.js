import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './SidebarAdmin.module.scss';

const cx = classNames.bind(styles)


function SidebarAdmin(props) {
    return (<>
        <div className={cx('wrapper')}>
            <div className={cx('logo_wrap', 'f-center-align')}>
                <img width={80} height={80} src={process.env.PUBLIC_URL + '/logo192.png'} />
                <h1 style={{ color: '#11cdef' }}>ADMIN</h1>
            </div>
            <div className={cx('nav_wrap')}>
                <ul>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Dashboard</span>
                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Đơn hàng</span>

                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Khách hàng</span>
                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Sản phẩm</span>

                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Kho</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <hr></hr>
            <div className={cx('auth_wrap')}>
                <ul>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Đăng nhập</span>
                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Đăng kí</span>

                        </li>
                    </Link>
                    <Link>
                        <li>
                            <FontAwesomeIcon icon={faHome} /><span>Đăng xuất</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </>);
}

export default SidebarAdmin;