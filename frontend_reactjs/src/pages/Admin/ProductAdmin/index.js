import { useEffect, useState } from "react";
import * as adminProductService from '~/service/adminProduct';
import { getCookie } from "~/utils/utilsCookie";
import Table from "./Table/Table";
function ProductAdmin() {
    const [products, SetProducts] = useState(null)
    useEffect( () => {
        const token = getCookie('tokenJwt');
        
        adminProductService.getProduct(token)
            .then(response => {
                SetProducts(response.products)
            })
    },[])

    return ( 
        <div>
           {products && <Table products={products}/>}
        </div>
    )
}

export default ProductAdmin;