import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);


function Login() {
    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img
                        width="80"
                        height="58"
                        style={{ background: '#ebecf0' }}
                        src={images.logo}
                        alt="logo"
                    />
                </Link>
                <h1>Đăng nhập vào Shoes Shop</h1>
            </div>
            <div className={cx('body')}>
                <div className={cx('form_body')}>
                    <div className={cx('wrapper-form')} >
                        <div className={cx('wrapper_input')}>
                            <div className={cx('label_group')}>
                                <label >Email</label>
                            </div>
                            <div className={cx('input_wrap')}>
                                <input placeholder="Địa chỉ email" name="email" maxLength="50"  />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Mật khẩu" type="password"  autoComplete="password" />
                            </div>
                        </div>
                    </div>
                    <button className={cx('button_form')}  type="button">
                        <div >
                            <span className={cx('wrapper_input')}>
                                Đăng nhập
                            </span>
                        </div>
                    </button>
                </div>
                <p className={cx('dont_have_acc')} >Bạn chưa có tài khoản? <Link to={config.routes.signup}>Đăng ký</Link></p>
                <p className={cx('forgot_password')}>Quên mật khẩu?</p>
            </div>
            <div className={cx('footer')}>
                Footer
            </div>
        </div>
    </div>);
}

export default Login;