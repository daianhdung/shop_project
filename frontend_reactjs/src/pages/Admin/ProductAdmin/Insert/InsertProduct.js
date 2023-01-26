import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormProduct from "~/components/FormProduct/FormProduct"
import config from "~/config"
import * as insertProductService from "~/service/admin/adminProductService"
import { getCookie } from "~/utils/utilsCookie"

function InsertProduct() {
    const [brands, SetBrands] = useState([])
    const [categories, SetCategory] = useState([])
    const [sizes, SetSize] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const token = getCookie('tokenJwt')
        insertProductService.getAllBrand(token)
            .then(response => SetBrands(response))
        insertProductService.getllSize(token)
            .then(response => SetSize(response))
        insertProductService.getAllCategory(token)
            .then(response => SetCategory(response))

    }, [])

    const handleInsert = (name, price, brand, category, checkSize, mainImage, images) => {

        const token = getCookie('tokenJwt')
        const formData = new FormData();
        const product = {
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

        insertProductService.insertProduct(token, formData)
            .then(response => {
                if (response.success) {
                    navigate(config.routes.adminProduct)
                }
            })

    }

    return (
        <div>
            <FormProduct categories={categories} brands={brands} sizes={sizes} handleInsert={handleInsert} />
        </div>
    )
}
export default InsertProduct