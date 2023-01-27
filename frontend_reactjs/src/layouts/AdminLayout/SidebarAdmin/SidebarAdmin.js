import { faAngleDown, faAngleUp, faBagShopping, faBox, faFileCircleCheck, faHome, faKeyboard, faList, faRightFromBracket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import styles from './SidebarAdmin.module.scss';
import config from '~/config';
import useAuth from '~/hooks/useAuth';
import SubMenu from '~/components/SubMenu/SubMenu';
import { useState } from 'react';

const cx = classNames.bind(styles)


const SidebarData = [
    {
        title: 'Đơn hàng',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-warning')} icon={faFileCircleCheck} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'List',
                path: config.routes.adminOrder,
                icon: <FontAwesomeIcon icon={faList} />
            }, {
                title: 'Form',
                path: config.routes.adminOrderUpdate,
                icon: <FontAwesomeIcon icon={faKeyboard} />
            }
        ]
    },
    {
        title: 'Khách hàng',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-danger')} icon={faUsers} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'List',
                path: config.routes.adminUser,
                icon: <FontAwesomeIcon icon={faList} />
            }, {
                title: 'Form',
                path: config.routes.adminUserInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />
            }
        ]
    },
    {
        title: 'Sản phẩm',
        path: '/admin-product',
        icon: <FontAwesomeIcon className={cx('redirect_icon', 'text-info')} icon={faBagShopping} />,
        iconClosed: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleDown} />,
        iconOpened: <FontAwesomeIcon style={{ float: 'right' }} icon={faAngleUp} />,
        subNav: [
            {
                title: 'List',
                path: config.routes.adminProduct,
                icon: <FontAwesomeIcon icon={faList} />
            }, {
                title: 'Form',
                path: config.routes.adminProductInsert,
                icon: <FontAwesomeIcon icon={faKeyboard} />
            }
        ]
    }
]



function SidebarAdmin(props) {
    const auth = useAuth()
    const location = useLocation()

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (<>
        <div className={cx('wrapper')}>
            <Link to={config.routes.adminHome}>
                <div className={cx('logo_wrap', 'f-center-align')}>
                    <img width={80} height={80} src={process.env.PUBLIC_URL + '/logo192.png'} />
                    <h1 className='fw-bold' style={{ color: '#11cdef' }}>ADMIN</h1>
                </div>
            </Link>
            <div className={cx('nav_wrap')}>
                <ul>
                    <Link to={config.routes.adminHome}>
                        <li className={cx(location.pathname == config.routes.adminHome ? 'redirect' : '')}>
                            <FontAwesomeIcon className={cx('redirect_icon', 'text-primary')} icon={faHome} /><span>Dashboard</span>
                        </li>
                    </Link>
                    {SidebarData.map((item, index) => (
                        <SubMenu item={item} key={index} />
                    ))}
                    <Link>
                        <li>
                            <FontAwesomeIcon className={cx('redirect_icon', 'text-success')} icon={faBox} /><span>Kho</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <hr></hr>
            <div className={cx('auth_wrap')}>
                <ul>
                    <Link to={config.routes.adminProfile}>
                        <li>
                            <FontAwesomeIcon className={cx('redirect_icon', 'text-muted')} icon={faUser} /><span>Tài khoản</span>

                        </li>
                    </Link>
                    <Link>
                        <li onClick={() => auth.logout()}>
                            <FontAwesomeIcon className={cx('redirect_icon', 'text-danger')} icon={faRightFromBracket} /><span>Đăng xuất</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    </>);
}

export default SidebarAdmin;