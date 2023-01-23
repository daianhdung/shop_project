import { useEffect, useState } from "react";
import * as adminProductService from '~/service/adminProductService';
import { getCookie } from "~/utils/utilsCookie";
import Table from "./Table/Table";
function ProductAdmin() {
    const [products, SetProducts] = useState(null)

    const handleDelete = (id) =>{
        const token = getCookie('tokenJwt');
        adminProductService.deleteProduct(token, id)
            .then(response => console.log(response))
    }
    useEffect(() => {
        const token = getCookie('tokenJwt');

        adminProductService.getProducts(token)
            .then(response => {
                SetProducts(response.products)
            })
    }, [])

    return (
        <div>
            {products && <Table products={products} handleDelete={handleDelete} />}
        </div>
    )
}

export default ProductAdmin;