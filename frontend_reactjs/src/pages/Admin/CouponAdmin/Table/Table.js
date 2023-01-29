import classNames from "classnames/bind";
import config from "~/config";
import styles from './Table.module.scss';
import * as adminCouponService from '~/service/admin/adminCouponService';
import Paging from "~/components/Paging/Paging";
import { getCookie } from "~/utils/utilsCookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);
function Table({coupons}) {
 
    const navigate = useNavigate();
    const [mCoupons, SetCoupons] = useState([...coupons])
    const [pageCoupon, SetPageCoupons] =  useState(() => mCoupons.slice(0, 10))
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPage, SetTotalPage] = useState(() => {
        var totalCoupons = mCoupons.length
        if (totalCoupons % 10 == 0) {
            return totalCoupons / 10
        } else {
            return totalCoupons / 10 + 1
        }
    })
    const handleNext = () => {
        if (currentPage < totalPage) {
            SetCurrentPage(prev => {
                handlePageCoupon(prev + 1)
                return prev + 1
            })
        } 
    }
    const handlePrev = () => {
        if (currentPage > 1) {
            SetCurrentPage(prev => {
                handlePageCoupon(prev - 1)
                return prev  - 1
            })
        }
    }
    const handleSetCurrentPage = (num) => {
        if (currentPage != num) {
            SetCurrentPage(prev => {
                handlePageCoupon(num)
                return num
            })
        }
    }
    const handlePageCoupon = (current) => {
        SetPageCoupons(mCoupons.slice((current - 1) * 10, current * 10))
    }
    const handlePageCouponAfterDelete = (current, total, coupons) => {
        if (mCoupons.length % 10 == 1) {
            if (current == total) {
                total--;
                current--;
                SetTotalPage(total)
                SetCurrentPage(current)
            } else {
                total--;
                SetTotalPage(total)
            }

        }
        SetPageCoupons(coupons.slice((current - 1) * 10, current * 10))
    } 
    const handleDelete = (id) => {
        const token = getCookie('tokenJwt');
        adminCouponService.deleteCoupon(token, id)
            .then(response => {            
                if (response.success) {
                    var newCoupons = mCoupons.filter(coupon => coupon.id !== id)
                    SetCoupons(newCoupons) 
                    handlePageCouponAfterDelete(currentPage, totalPage, newCoupons)  
                }
            })
    }
    return  (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã Coupon</th>
                            <th scope="col">Giảm</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageCoupon.map((coupon,index) => {
                                return (
                                    <tr key={coupon.id}>
                                        <th scope="row">{ ((currentPage - 1) * 10) + index + 1 }</th>
                                        <td>{coupon.name}</td>
                                        <td>{coupon.rate}%</td>
                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminCouponUpdate}?id=${coupon.id}`}> <i className="bi bi-pencil-square text-info fs-1"></i> </Link>     
                                            <Link onClick={() => handleDelete(coupon.id)}> <i className="bi bi-trash text-danger fs-1 ms-3"></i> </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Paging totalPage={totalPage} currentPage={currentPage} handleNext={handleNext} handlePrev={handlePrev} handleSetCurrentPage={handleSetCurrentPage}/>
            </div>
        </div>
    )
}
export default Table