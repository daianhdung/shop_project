import { getCookie } from "~/utils/utilsCookie";
import * as updateOrderService from '~/service/admin/adminOrderService';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "~/config";

function UpdateOrder() {
    const [status, SetStatus] = useState(0)
    const [statuses, SetStatuses] = useState()
    const [order, SetOrder] = useState(null)
    const navigate = useNavigate();
    const handleUpdate = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        const token = getCookie('tokenJwt')
        updateOrderService.updateOrderStatus(token, id, status)
            .then(response => {
                if (response.success) {
                    navigate(config.routes.adminOrder)
                }
            })

    }
    useEffect(() => {
        const token = getCookie('tokenJwt')
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        updateOrderService.getAllStatus(token)
            .then(response => SetStatuses(response))
        updateOrderService.getOrder(token, id)
            .then(response => {
                SetOrder(response.success ? response.data : null)
                SetStatus(response.data.statusId)
            })
        
    }, [])
    return (
        <div>
            {
                order ?
                    <div className="row p-5 fs-2">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-4 fw-bold"><label>Cập nhật trạng thái đơn hàng </label></div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-5">
                                <label htmlFor="status">Trạng thái</label>
                                <select style={{ height: '40px' }} className="form-control form-control-lg" id="status" value={status} onChange={(e) => SetStatus(e.target.value)}>
                                    {
                                        statuses.map(status => (<option key={status.id} value={status.id} >{status.name}</option>))
                                    }
                                </select>
                            </div>
    
                        </div>
                    
                        <div className="row mt-5">
                            <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={handleUpdate}>Xác nhận</button>
                            <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                        </div>

                    </div>
                    :
                    <div>Không tìm thấy đơn hàng để cập nhật </div>
            }
    
        </div>
    )
}
export default UpdateOrder