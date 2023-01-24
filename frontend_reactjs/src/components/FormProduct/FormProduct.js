const { useEffect, useState } = require("react");


function FormProduct ({product,categories,sizes, brands, handleInsert, handleUpdate}) {


    const [brand, SetBrand] = useState(product ? product.brand : 1)
    const [category, SetCategory] = useState(product ? product.category : 1)
    const [name, SetName] = useState(product ? product.name : "")
    const [price, SetPrice] = useState(product ? product.price : '')
    const [checkSize, setCheckSize] = useState(product ? product.sizes : [])
    const [mainImage, SetMainImage] = useState()
    const [images, SetImages] = useState()

    const handleCheckSize = (id) => {
        setCheckSize(prev => {
            const isChecked = checkSize.includes(id)
            if (isChecked) {
                return checkSize.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    
    
    return (
        <div>
            {product?
                <div className="form-update">
                    <label> Thêm sản phẩm </label>
                    <div className="form-group">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input type="text" className="form-control" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Thương hiệu</label>
                        <select className="form-control" id="brand" value={brand} onChange={(e) => SetBrand(e.target.value)}>
                        {
                            brands.map(brand => ( <option key={brand.id} value={brand.id} >{brand.name}</option> ))
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Loại</label>
                        <select className="form-control" id="category" value={category} onChange={(e) => SetCategory(e.target.value)}>
                        {
                            categories.map(category => ( <option key={category.id} value={category.id} >{category.name}</option> ))
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Kích thước</label>
                        <div className='d-flex align-content-start flex-wrap'> 
                        {
                            sizes.map(item => (
                                <div key={item.id}>
                                    <input type="checkbox" id={`${item.id}-size`}
                                        checked={checkSize.includes(item.id)}
                                        onChange={() => handleCheckSize(item.id)}
                                        className='btn-check'
                                        
                                    />
                                    <label className="btn btn-light fs-4 my-2 mx-2"  htmlFor={`${item.id}-size`} >{item.name}</label>
                                </div>)
                            )
                        }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="price">Giá sản phẩm</label>
                        <input type="text" className="form-control" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="main-image">Ảnh Chính </label> 
                        <p> {product&& mainImage == null && ` Đã có ảnh ${product.mainImage} `} </p>
                        <input type="file" className="form-control-file" id="main-image" onChange={(e) => SetMainImage(e.target.files[0])}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Ảnh Phụ </label> 
                        <p> {product&& images == null && ` Đã có ${product.images.length} ảnh ${product.images.map(image => `${image} ` )} `} </p>

                        <input type="file" className="form-control-file" id="images" multiple onChange={(e) => SetImages(e.target.files)}
                        />
                    </div>

                    <button  className="btn btn-primary mb-2" onClick={() => {handleUpdate(product.id ,name, price, brand, category, checkSize, mainImage, images)}}>Xác nhận</button>
                </div>
                :
                <div className="form-insert">
                    <label> Thêm sản phẩm </label>
                    <div className="form-group">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input type="text" className="form-control" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Thương hiệu</label>
                        <select className="form-control" id="brand" value={brand} onChange={(e) => SetBrand(e.target.value)}>
                        {
                            brands.map(brand => ( <option key={brand.id} value={brand.id} >{brand.name}</option> ))
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Loại</label>
                        <select className="form-control" id="category" value={category} onChange={(e) => SetCategory(e.target.value)}>
                        {
                            categories.map(category => ( <option key={category.id} value={category.id} >{category.name}</option> ))
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Kích thước</label>
                        <div className='d-flex align-content-start flex-wrap'> 
                        {
                            sizes.map(item => (
                                <div key={item.id}>
                                    <input type="checkbox" id={`${item.id}-size`}
                                        checked={checkSize.includes(item.id)}
                                        onChange={() => handleCheckSize(item.id)}
                                        className='btn-check'
                                        
                                    />
                                    <label className="btn btn-light fs-4 my-2 mx-2"  htmlFor={`${item.id}-size`} >{item.name}</label>
                                </div>)
                            )
                        }
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="price">Giá sản phẩm</label>
                        <input type="text" className="form-control" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="main-image">Ảnh Chính</label>
                        <input type="file" className="form-control-file" id="main-image" onChange={(e) => SetMainImage(e.target.files[0])}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Ảnh Phụ</label>
                        <input type="file" className="form-control-file" id="images" multiple onChange={(e) => SetImages(e.target.files)}/>
                    </div>

                    <button  className="btn btn-primary mb-2" onClick={() => {handleInsert(name, price, brand, category, checkSize, mainImage, images)}}>Xác nhận</button>
                </div>
                }
                
        </div>
    )
}
export default FormProduct