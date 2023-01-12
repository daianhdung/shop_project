import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import * as changeService from '~/service/changeService'





function Change() {
    
    const [valid, setValid] = useState(false)
    const [equal, setEqual] = useState(true);
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    



    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get("token") == null) {
            window.location.replace(config.routes.login);
        }
        changeService.handleCheckToken(queryParams.get("token"))
            .then(response => {
                setValid(response.success)
            })
            .catch(
                setValid(false)
            )
        
    },[])

    const handleRepeatPassword = () => {
        if (password == repeatPassword) {
            setEqual(true)
        } else {
            setEqual(false)
        }
    }
    const handleSubmit = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (equal) {
            changeService.handleChangePassword(queryParams.get("token"), password)
                    .then(response => {
                        if (response.success) {
                            window.location.replace(config.routes.login);
                        } else {
                            console.log(false)
                        }
                    })
                    .catch()
        }
    }

    return (
        <div>
            {
                valid ? (
                    <div>
                        <div>
                            <input 
                                value={password} 
                                type="password" 
                                placeholder='Mật khẩu mới'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div> 
                        
                        </div>
                            <input 
                                value={repeatPassword}
                                type="password" 
                                placeholder='Nhập lại mật khẩu'
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                onBlur= {() => handleRepeatPassword() }
                            />
                        <div> 
                            <button
                                onClick={handleSubmit}
                            >
                                <span>Xác nhận</span>
                            </button>
                        </div>

                        <div>
                                {equal || <label>Vui lòng nhập lại password chính xác </label>}
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <label >Link đã không còn hiệu lực</label>
                    </div>
                )

            }
        </div>
    )
}

export default Change;
