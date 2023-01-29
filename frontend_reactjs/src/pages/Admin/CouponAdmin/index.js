import { useEffect, useState } from "react";
import * as adminCouponService from '~/service/admin/adminCouponService';
import { getCookie } from "~/utils/utilsCookie";
import Table from "./Table/Table";

function CouponAdmin() {
    const [coupons, SetCoupons] = useState(null)

    useEffect(() => {
        const token = getCookie('tokenJwt');

        adminCouponService.getCoupons(token)
            .then(response => {
                SetCoupons(response)
            })
    }, [])

    return (
        <div>
            {coupons && <Table coupons={coupons}  />}
        </div>
    )
}

export default CouponAdmin;