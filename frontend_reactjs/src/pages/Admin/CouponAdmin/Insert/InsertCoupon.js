import { getCookie } from "~/utils/utilsCookie"
import * as insertCouponService from "~/service/admin/adminCouponService"
import FormCoupon from "~/components/Form/FormCoupon/FormCoupon"
import { useNavigate } from "react-router-dom"
import config from "~/config"

function InsertCoupon () {
    const navigate = useNavigate()

    const handleInsert = (name, rate) => {
        const token = getCookie('tokenJwt')
        const data = {
            name,
            rate
        }
       
        insertCouponService.insertCoupon(token, data)
            .then(response => {
            
                if (response.success) {
                   
                    navigate(config.routes.adminCoupon)
                } 
            })
    }
    return (
        <div>
            <FormCoupon handleInsert={handleInsert} />
        </div>
    )
}
export default InsertCoupon