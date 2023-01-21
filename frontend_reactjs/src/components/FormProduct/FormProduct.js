const { useEffect, useState } = require("react");


function FormProduct ({product,categories,sizes, brands, handleInsert, handleUpdate}) {
    var selectedBrand =  product ? product.brand : null;
    var selectedCategory = product ? product.category : null;


    const [name, SetName] = useState(product ? product.name : "")
    const [price, SetPrice] = useState(product ? product.price : null)
    const [checkSize, setCheckSize] = useState(product ? product.size : [])
    // const [dataSubmit, setDataSubmit] = useState({
    //     name:"",
    //     price: null,
    //     size: [],
    //     brand: null,
    //     category: null,
    // })

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
                    <div class="form-group">
                        <label for="name">Tên sản phẩm</label>
                        <input type="text" class="form-control" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)}/>
                    </div>

                    <div class="form-group">
                        <label for="brand">Thương hiệu</label>
                        <select class="form-control" id="brand" value={selectedBrand}>
                        {
                           
                            brands.map(brand => ( <option  key={brand.id} value={brand.id} >{brand.name}</option> ))
                        }
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="category">Loại</label>
                        <select class="form-control" id="category" value={selectedCategory}>
                        {
                            categories.map(category => ( <option  key={category.id} value={category.id} >{category.name}</option> ))
                        }
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="size">Kích thước</label>
                        <div className='d-flex align-content-start flex-wrap'> 
                        {
                            sizes.map(item => {
                                <div key={item.id}>
                                    <input type="checkbox" id={`${item.id}-size`}
                                        checked={checkSize.includes(item.id)}
                                        onChange={() => handleCheckSize(item.id)}
                                        className='btn-check'
                                        
                                    />
                                    <label className="btn btn-light fs-4 my-2 mx-2"  htmlFor={`${item.id}-size`} >{item.name}</label>
                                </div>
                            })
                        }
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="price">Giá sản phẩm</label>
                        <input type="text" class="form-control" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="main-image">Ảnh Chính</label>
                        <input type="file" class="form-control-file" id="main-image"/>
                    </div>
                    <div class="form-group">
                        <label for="images">Ảnh Phụ</label>
                        <input type="file" class="form-control-file" id="images"/>
                    </div>

                    <button  class="btn btn-primary mb-2" onClick={() => handleInsert(name, price, selectedBrand, selectedCategory, checkSize)}>Xác nhận</button>
                </div>
                :
                <div className="form-insert">
                    <div class="form-group">
                        <label for="name">Tên sản phẩm</label>
                        <input type="text" class="form-control" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)}/>
                    </div>

                    <div class="form-group">
                        <label for="brand">Thương hiệu</label>
                        <select class="form-control" id="brand" value={selectedBrand}>
                        {
                            brands.map(brand => ( <option key={brand.id} value={brand.id} >{brand.name}</option> ))
                        }
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="category">Loại</label>
                        <select class="form-control" id="category" value={selectedCategory}>
                        {
                            categories.map(category => ( <option key={category.id} value={category.id} >{category.name}</option> ))
                        }
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="size">Kích thước</label>
                        <div className='d-flex align-content-start flex-wrap'> 
                        {
                            sizes.map(item => {
                                <div key={item.id}>
                                    <input type="checkbox" id={`${item.id}-size`}
                                        checked={checkSize.includes(item.id)}
                                        onChange={() => handleCheckSize(item.id)}
                                        className='btn-check'
                                        
                                    />
                                    <label className="btn btn-light fs-4 my-2 mx-2"  htmlFor={`${item.id}-size`} >{item.name}</label>
                                </div>
                            })
                        }
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="price">Giá sản phẩm</label>
                        <input type="text" class="form-control" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="main-image">Ảnh Chính</label>
                        <input type="file" class="form-control-file" id="main-image"/>
                    </div>
                    <div class="form-group">
                        <label for="images">Ảnh Phụ</label>
                        <input type="file" class="form-control-file" id="images"/>
                    </div>

                    <button  class="btn btn-primary mb-2" onClick={() => handleInsert(name, price, selectedBrand, selectedCategory, checkSize)}>Xác nhận</button>
                </div>
                }
                
        </div>
    )
}
export default FormProduct