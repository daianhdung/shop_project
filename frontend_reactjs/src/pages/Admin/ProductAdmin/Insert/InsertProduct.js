import { useState } from "react"
import FormProduct from "~/components/FormProduct/FormProduct"

function InsertProduct() {
    const [product, SetProducts] = useState(null)
    const [brands, SetBrands] = useState()
    const [categories, SetCategory] = useState()
    const handleInsert = () => {

    }

    return (
        <div>
            <FormProduct product={product} brands={brands} categories={categories} handleInsert={() => handleInsert}/>
        </div>
    )
}
export default InsertProduct