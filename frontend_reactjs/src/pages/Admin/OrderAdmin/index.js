import { useEffect, useState } from "react";
import * as adminOrderService from '~/service/admin/adminOrderService';
import { getCookie } from "~/utils/utilsCookie";
import Table from "./Table/Table";

function OrderAdmin() {


    const [orders, SetOrders] = useState(null)

    useEffect(() => {
        const token = getCookie('tokenJwt');
        adminOrderService.getOrders(token)
            .then(response => SetOrders(response))
    }, [])
    return (
        <div>
            {orders && <Table orders={orders}  />}
        </div>
    )
}

export default OrderAdmin;