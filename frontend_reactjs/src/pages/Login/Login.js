import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';


import config from '~/config';
import images from '~/assets/images';
import styles from './Login.module.scss';
import { useRef, useState } from 'react';
import * as loginService from '~/service/loginService'
import { save } from '~/utils/saveCookie';

const cx = classNames.bind(styles);


function Login() {
    const email = useRef(null);
    const password = useRef(null);
    const [state, setState] = useState({ email: '', password: '' });


    const handleClick = () => {
        setState({
            email: email.current.value,
            password: password.current.value,
        });
    }
    if (state.email && state.password) {
        const fetchApi = async () => {
            const result = await loginService.login(state.email, state.password);
            save('token', 'Bearer ' + result.data.token, 10 / 24 / 60 / 60)

            return result;
        };
        fetchApi();
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
                                <input placeholder="Địa chỉ email" name="email" maxLength="50" ref={email} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Mật khẩu" type="password" autoComplete="password" ref={password} />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className={cx('button_form')} type="button">
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