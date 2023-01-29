import { useEffect, useState } from "react";
import * as adminOrderService from '~/service/admin/adminOrderService';
import { getCookie } from "~/utils/utilsCookie";
import Table from "./Table/Table";

function OrderAdmin({ setIsLoading }) {


    const [orders, SetOrders] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        const token = getCookie('tokenJwt');
        adminOrderService.getOrders(token)
            .then(response => SetOrders(response))
            .finally(() => {
                setIsLoading(false)
            })
    }, [])
    return (
        <div>
            {orders && <Table orders={orders}  />}
        </div>
    )
}

export default OrderAdmin;