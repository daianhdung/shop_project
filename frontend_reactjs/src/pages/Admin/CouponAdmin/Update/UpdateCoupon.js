import { getCookie } from "~/utils/utilsCookie"
import * as updateCouponService from "~/service/admin/adminCouponService"
import { useEffect, useState } from "react"
import FormCoupon from "~/components/Form/FormCoupon/FormCoupon"
import { useNavigate } from "react-router-dom"
import config from "~/config"

function UpdateCoupon () {
    const navigate = useNavigate()
    const [coupon, SetCoupon] = useState(null)
    useEffect(() => {
        const token = getCookie('tokenJwt')
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        updateCouponService.getCoupon(token, id)
            .then(response => SetCoupon(response))
        
    },[])
   
    const handleUpdate = (id,name, rate) => {
        const token = getCookie('tokenJwt')
        const data = {
            id,
            name,
            rate
        }

        updateCouponService.updateCoupon(token, data)
            .then(response => {
                if (response.success) {
                    navigate(config.routes.adminCoupon)
                } else {

                }
            })
    }
    return (
        <div>
            {coupon&&<FormCoupon handleUpdate={handleUpdate} coupon={coupon} />}
        </div>
    )
}
export default UpdateCoupon