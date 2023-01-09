import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import styles from './Signup.module.scss';
import { useRef, useState } from 'react';
import * as signupService from '~/service/signupService';

const cx = classNames.bind(styles);

function Signup() {
    const email = useRef(null);
    const password = useRef(null);
    const fullname = useRef(null);
    const phone = useRef(null);
    const address = useRef(null);
    const [state, setState] = useState({ email: '', password: '', fullname: '', phone: '', address: '' });


    const handleClick = () => {
        setState({
            email: email.current.value,
            password: password.current.value,
            fullname: fullname.current.value,
            phone: phone.current.value,
            address: address.current.value,
        });
    }
    if (state.email && state.password) {
        const fetchApiSignup = async () => {
            const result = await signupService.signup(state.email, state.password, state.fullname, state.phone, state.address);
            return result;
        };
        fetchApiSignup();
    }
    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('header')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img
                        width="60"
                        height="60"
                        style={{ background: '#fff', borderRadius: '50%' }}
                        src={images.logo}
                        alt="logo"
                    />
                </Link>
                <h1>Đăng kí tài khoản Shoes Shop</h1>
            </div>
            <div className={cx('body')}>
                <div className={cx('form_body')}>
                    <div className={cx('wrapper-form')} >
                        <div className={cx('wrapper_input')}>
                            <div className={cx('label_group')}>
                                <label >Email</label>
                            </div>
                            <div className={cx('input_wrap')}>
                                <input placeholder="Địa chỉ email" name="email" maxLength="50" ref={email} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="fullname" placeholder="Họ và tên" type="text" ref={fullname} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Mật khẩu" type="password" ref={password} />
                            </div>
                        </div>
                    </div>
                    {/* <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Nhập lại mật khẩu" type="password" autoComplete="password" />
                            </div>
                        </div>
                    </div> */}
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="phone" placeholder="Số điện thoại" type="text" ref={phone} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="address" placeholder="Địa chỉ" type="text" ref={address} />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className={cx('button_form')} type="button">
                        <div >
                            <span className={cx('wrapper_input')}>
                                Đăng kí
                            </span>
                        </div>
                    </button>
                </div>
                <p className={cx('dont_have_acc')} >Bạn đã có tài khoản? <Link to={config.routes.login}>Đăng nhập</Link></p>
            </div>
            <div className={cx('footer')}>
                Footer
            </div>
        </div>
    </div>);
}

export default Signup;