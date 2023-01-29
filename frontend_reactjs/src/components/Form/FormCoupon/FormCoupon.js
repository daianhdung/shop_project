import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { validFloat, validInt } from "~/utils/regex";
import styles from "./FormCoupon.module.scss"

const cx = classNames.bind(styles);

const { useEffect, useState } = require("react");


function FormCoupon({ coupon, handleInsert, handleUpdate }) {

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    const [name, SetName] = useState(coupon ? coupon.name : "")
    const [rate, SetRate] = useState(coupon ? coupon.rate : '')
    const [msg, SetMsg] = useState({})

    const validateInsert = () => {
        let message = {}
        if (!name  )  {
            message.name = "Nhập mã giảm giá"
        } 
        if (!validFloat.test(rate) || !rate) {
            message.rate = "Nhập tỉ lệ giảm giá"
        }
     
        if (JSON.stringify(message) !== JSON.stringify({}) ) {
            SetMsg(message)
            return 
        }
    
        handleInsert(name, rate)
    }
    const validateUpdate = (id) => {
        let message = {}
        if (!name  )  {
            message.name = "Nhập mã giảm giá"
        } 
        if (!validFloat.test(rate) ) {
            message.rate = "Nhập tỉ lệ giảm giá"
        }
        if (JSON.stringify(message) !== JSON.stringify({}) ) {
            SetMsg(message)
            return 
        }
        handleUpdate(id, name, rate)
    }
 

    //UPDATE PRODUCT
    return (
        <div>
            {coupon ?
                <div className="form-update row p-5 fs-2">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-4 fw-bold">
                            <label>Thay đổi thông tin mã giảm giá </label></div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Mã giảm giá</label> {msg.name && <span className="text-danger">{msg.name}</span>}
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder="Mã giảm giá" value={name} onChange={(e) => SetName(e.target.value)} />
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="rate">Tỉ lệ</label> {msg.rate && <span className="text-danger">{msg.rate}</span>}
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="rate" placeholder="Tỉ lệ giảm" value={rate} onChange={(e) => SetRate(e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-5">
                        <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => validateUpdate(coupon.id)}>Xác nhận</button>
                        <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                    </div>
                </div>
                :
                //INSERT PRODUCT------------------
                <div className="form-insert row p-5 fs-2">
                    <div className="form-insert row justify-content-center mb-3">
                        <div className="col-md-3 fs-1 fw-bold">
                            <label> Thêm mã giảm giá </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Mã giảm giá</label> {msg.name && <span className="text-danger">{msg.name}</span>}
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder="Mã giảm giá" value={name} onChange={(e) => SetName(e.target.value)} />
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="rate">Tỉ lệ</label> {msg.rate && <span className="text-danger">{msg.rate}</span>}
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="rate" placeholder="Tỉ lệ giảm" value={rate} onChange={(e) => SetRate(e.target.value)} />
                        </div>
                    </div>

                    <div className="mt-5">
                        <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => validateInsert()}>Xác nhận </button>
                        <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                    </div>
                </div>
            }

        </div>
    )
}
export default FormCoupon