import { useState } from "react"
import FormProduct from "~/components/FormProduct/FormProduct"

function UpdateProduct() {
    const [product, SetProducts] = useState(null)
    const [brands, SetBrands] = useState()
    const [categories, SetCategory] = useState()
    const handleUpdate = () => {

    }
    return (
        <div>
            <FormProduct product={product} brands={brands} categories={categories} handleUpdate={() => handleUpdate}/>
        </div>
    )
}
export default UpdateProduct