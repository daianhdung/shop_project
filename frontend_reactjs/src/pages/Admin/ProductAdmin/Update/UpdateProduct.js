import { useEffect, useState } from "react"
import FormProduct from "~/components/FormProduct/FormProduct"
import { getCookie } from "~/utils/utilsCookie"
import * as updateProductService from "~/service/adminProductService"
import config from "~/config"
import { useNavigate } from "react-router-dom"

function UpdateProduct() {


    const [product, SetProduct] = useState()
    const [brands, SetBrands] = useState([])
    const [categories, SetCategory] = useState([])
    const [sizes, SetSize] = useState([])
    const navigate = useNavigate();


    const handleUpdate = (id,name, price, brand, category, checkSize, mainImage, images) => {

        const token = getCookie('tokenJwt')
        const formData = new FormData();
        const product = {
            id,
            name,
            price,
            brand,
            category,
            sizes: checkSize
        }

        formData.append('product', JSON.stringify(product))
        formData.append('mainImage', mainImage, mainImage.name)

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
    
        updateProductService.updateProduct(token, formData)
            .then(response => {
                if (response.success) {    
                    navigate(config.routes.adminProduct)
                }
            })
    }

    useEffect(() => {
        const token = getCookie('tokenJwt')
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id')
        updateProductService.getAllBrand(token)
            .then(response => SetBrands(response))
        updateProductService.getllSize(token)
            .then(response => SetSize(response))
        updateProductService.getAllCategory(token)
            .then(response => SetCategory(response))    
        updateProductService.getProduct(token, id)
            .then(response => SetProduct(response.success ? response.data : null))
    }, [])



    return (
        <div>
            {
                product?
                <FormProduct product={product} brands={brands} categories={categories} sizes={sizes} handleUpdate={handleUpdate}/>
                :
                <div>Không tìm thấy sản phẩm để cập nhật </div>
            }
            
        </div>
    )
}
export default UpdateProduct