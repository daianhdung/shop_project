import styles from './Forgot.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import React, { useRef, useState } from 'react';
import * as forgotService from '~/service/forgotService'

const cx = classNames.bind(styles);

function Forgot() {
    const email = useRef(null);
    const [state, setState] = useState({ email: '', show_input: true });

    const handleClick = () => {
        setState({
            email: email.current.value,
            show_input: true
        });
    }

    if (state.email) {
        const fetchApiForgotPass = async () => {
            const result = await forgotService.sendCodeToMail(state.email);
            if (result.success) {
                setState({
                    show_input: false
                });
            }
            return result;
        };
        fetchApiForgotPass();
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
                <h1>Quên mật khẩu Shoes Shop</h1>
            </div>
            <div className={cx('body')}>
                <div className={cx('form_body')}>
                    {state.show_input ? (<React.Fragment>
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
                        <button onClick={handleClick} className={cx('button_form')} type="button">
                            <div >
                                <span className={cx('wrapper_input')}>
                                    Gửi Code
                                </span>
                            </div>
                        </button>
                    </React.Fragment>
                    ) : (<React.Fragment>
                        <div className={cx('wrapper-form')} >
                            <div className={cx('wrapper_input')}>
                                <div className={cx('label_group')}>
                                    <label >Mã xác thực đã được gửi tới email</label>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>)}

                </div>
                <p className={cx('dont_have_acc')} >Bạn đã có tài khoản? <Link to={config.routes.login}>Đăng nhập</Link></p>
            </div>
            <div className={cx('footer')}>
                Footer
            </div>
        </div>
    </div>);
}

export default Forgot;