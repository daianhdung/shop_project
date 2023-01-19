import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import styles from './Login.module.scss';
import { useEffect, useRef, useState } from 'react';
import * as loginService from '~/service/loginService'
import useAuth from '~/hooks/useAuth';

import { saveCookie } from '~/utils/utilsCookie';
import { decodeToken } from 'react-jwt';
import { validEmail, validPassword } from '~/utils/regex';
// import { useJwt } from "react-jwt";

const cx = classNames.bind(styles);


function Login() {

    const contextAuth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const [state, setState] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});


    //built-in validate
    const handleChange = (event) => {
        const { name, value } = event.target;
        let newErrors = { ...errors };
        if (name === 'email') {
            if (!value) {
                newErrors.email = 'Email bắt buộc';
            } else if (!validEmail.test(value)) {
                newErrors.email = 'Email không hợp lệ';
            } else {
                newErrors.email = null;
            }
        }
        if (name === 'password') {
            if (!value) {
                newErrors.password = 'Mật khẩu bắt buộc';
            } else if (!validPassword.test(value)) {
                newErrors.password = 'Mật khẩu không hợp lệ';
            } else {
                newErrors.password = null;
            }
        }
        setState({
            ...state,
            [name]: value
        });
        setErrors(newErrors);
    }

    const handleClick = () => {
        let newErrors = {};
        if (!state.email) {
            newErrors.email = 'Email bắt buộc';
        }
        if (!state.password) {
            newErrors.password = 'Mật khẩu bắt buộc';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const fetchApi = async () => {
                const result = await loginService.login(state.email, state.password);
                saveCookie('tokenJwt', result.data.token, result.data.expire)
                const myDecodedToken = decodeToken(result.data.token);
                const tokenDecoded = JSON.parse(myDecodedToken.sub)
                if (result.success) {
                    contextAuth.username = tokenDecoded.username
                    contextAuth.auth = true
                    if (result.data.role === 'ROLE_ADMIN') {
                        contextAuth.admin = true
                        navigate('/admin-home', { replace: true })
                    } else {
                        navigate(from, { replace: true })
                    }
                }
                return result;
            };
            fetchApi();
        }
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
                                <input placeholder="Địa chỉ email" name="email" maxLength="50" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Mật khẩu" type="password" autoComplete="password" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <h3 style={{ textShadow: '0 5px 5px red' }} className='mt-3 text-warning'>
                        {errors.email && errors.email}
                    </h3>
                    <h3 style={{ textShadow: '0 5px 5px red' }} className='mt-3 text-warning'>
                        {errors.password && errors.password}
                    </h3>
                    <button onClick={handleClick} className={cx('button_form')} type="button">
                        <div >
                            <span className={cx('wrapper_input')}>
                                Đăng nhập
                            </span>
                        </div>
                    </button>
                </div>
                <p className={cx('dont_have_acc')} >Bạn chưa có tài khoản? <Link to={config.routes.signup}>Đăng ký</Link></p>
                <Link to={config.routes.forgot} className={cx('forgot_password')}>Quên mật khẩu?</Link>
            </div>
            <div className={cx('footer')}>
                Footer
            </div>
        </div>
    </div>);
}

export default Login;