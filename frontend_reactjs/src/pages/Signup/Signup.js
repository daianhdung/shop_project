import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import styles from './Signup.module.scss';
import { useEffect, useState } from 'react';
import * as signupService from '~/service/signupService';
import { validEmail, validPassword } from '~/utils/regex';

const cx = classNames.bind(styles);

function Signup() {

    const [state, setState] = useState({ email: '', password: '', rePassword: '' });
    const [equal, setEqual] = useState(true);
    const [errors, setErrors] = useState({});



    useEffect(() => {
        if (state.password == state.rePassword) {
            setEqual(true)
        } else {
            setEqual(false)
        }
    }, [state.password, state.rePassword])


    console.log(state);
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
            const fetchApiSignup = async () => {
                const result = await signupService.signup(state.email, state.password);
                console.log(result);
                return result;
            };
            fetchApiSignup();
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
                                <input placeholder="Địa chỉ email" name="email" maxLength="50" onChange={handleChange} required
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="password" placeholder="Mật khẩu" type="password" onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper-form')}>
                        <div className={cx('wrapper_input')}>
                            <div className={cx('input_wrap')}>
                                <input name="rePassword" placeholder="Nhập lại mật khẩu" type="password" autoComplete="password"
                                    onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <h3 style={{ textShadow: '0 5px 5px red' }} className='mt-3 text-warning'>
                        {!equal && 'Mật khẩu không khớp'}
                    </h3>
                    <h3 style={{ textShadow: '0 5px 5px red' }} className='mt-3 text-warning'>
                        {errors.email && errors.email}
                    </h3>
                    <h3 style={{ textShadow: '0 5px 5px red' }} className='mt-3 text-warning'>
                        {errors.password && errors.password}
                    </h3>
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