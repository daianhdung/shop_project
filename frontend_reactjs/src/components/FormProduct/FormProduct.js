import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './FormProduct.module.scss'

const cx = classNames.bind(styles);

const { useEffect, useState } = require("react");


function FormProduct({ product, categories, sizes, brands, handleInsert, handleUpdate }) {

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


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
    const validateInsert = () => {
        if (!name || !price || checkSize.length == 0 || !mainImage || !images)  {
            console.log("err")
            return 
        }
        handleInsert(name, price, brand, category, checkSize, mainImage, images)
    }
    const validateUpdate = () => {
        if (!name || !price || checkSize.length == 0 || !mainImage || !images)  {
            console.log("err")
             
        }
        handleUpdate(product.id, name, price, brand, category, checkSize, mainImage, images)
    }

    //UPDATE PRODUCT
    return (
        <div>
            {product ?
                <div className="form-update row p-5 fs-2">
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-4 fw-bold">
                            <label>Thay đổi thông tin sản phẩm </label></div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)} />
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Thương hiệu</label>
                            <select style={{ height: '40px' }} className="form-control form-control-lg" id="brand" value={brand} onChange={(e) => SetBrand(e.target.value)}>
                                {
                                    brands.map(brand => (<option key={brand.id} value={brand.id} >{brand.name}</option>))
                                }
                            </select>
                        </div>
                    </div>


                    <div className="row mt-2">
                        <div className="form-group col-md-5">
                            <label htmlFor="category">Loại</label>
                            <select style={{ height: '40px' }} className="form-control form-control-lg" id="category" value={category} onChange={(e) => SetCategory(e.target.value)}>
                                {
                                    categories.map(category => (<option key={category.id} value={category.id} >{category.name}</option>))
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)} />
                        </div>
                    </div>



                    <div className="row mt-2">
                        <div className="form-group col-md-6">
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
                                            <label className="btn btn-light fs-4 my-2 mx-2" htmlFor={`${item.id}-size`} >{item.name}</label>
                                        </div>)
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="form-group">
                            <label htmlFor="main-image">Ảnh Chính </label>
                            <div className={cx("product-main-image-wrapper")}>
                            
                                {mainImage ?<img src={URL.createObjectURL(mainImage)}/> :<img src={product.mainImage}/> }
                            </div>
                            <input type="file" className="form-control-file" id="main-image" onChange={(e) => SetMainImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="form-group">
                            <label htmlFor="images">Ảnh Phụ </label> 
                            <div className={cx("product-images-thumb")}>
                                <Swiper loop={false} spaceBetween={10} slidesPerView={3} modules={[Navigation, Thumbs]} navigation={true}>
                                    {
                                        images ?
                                        [...images].map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className={cx("product-image-wrapper")}>
                    
                                                    {<img className={cx("product-image")}  src={URL.createObjectURL(image)}/>}
                                                </div>
                                            </SwiperSlide>
                                            
                                        ))
                                        :
                                        product.images.map( (image, index) => (
                                        
                                            <SwiperSlide key={index}>
                                                <div className={cx("product-image-wrapper")}>
                                                    {<img className={cx("product-image")}  src={image}/>}
                                                </div>
                                            </SwiperSlide>
                                            
                                        ))
                                           
                                    }
                                </Swiper>
                             
                            </div>
                            <input type="file" className="form-control-file" id="images" multiple onChange={(e) => SetImages(e.target.files)}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => validateUpdate()}>Xác nhận</button>
                        <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                    </div>
                </div>
                :
                //INSERT PRODUCT------------------
                <div className="form-insert row p-5 fs-2">
                    <div className="form-insert row justify-content-center mb-3">
                        <div className="col-md-3 fs-1 fw-bold">
                            <label> Thêm sản phẩm </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg my -1" id="name" placeholder="Tên sản phẩm" value={name} onChange={(e) => SetName(e.target.value)} />
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="brand">Thương hiệu</label>
                            <select style={{ height: '40px' }} className="form-control form-control-lg" id="brand" value={brand} onChange={(e) => SetBrand(e.target.value)}>
                                {
                                    brands.map(brand => (<option key={brand.id} value={brand.id} >{brand.name}</option>))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="form-group col-md-5">
                            <label htmlFor="category">Loại</label>
                            <select style={{ height: '40px' }} className="form-control form-control-lg" id="category" value={category} onChange={(e) => SetCategory(e.target.value)}>
                                {
                                    categories.map(category => (<option key={category.id} value={category.id} >{category.name}</option>))
                                }
                            </select>
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="price">Giá sản phẩm</label>
                            <input style={{ height: '40px' }} type="text" className="form-control form-control-lg" id="price" placeholder="Giá Sản phẩm" value={price} onChange={(e) => SetPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="form-group col-md-6">
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
                                            <label className="btn btn-light fs-4 my-2 mx-2" htmlFor={`${item.id}-size`} >{item.name}</label>
                                        </div>)
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="form-group col-md-6 row">
                            <label htmlFor="main-image">Ảnh Chính: </label>
                            {mainImage&&<div className={cx("product-main-image-wrapper")}>
                                {<img src={URL.createObjectURL(mainImage)}/>}
                            </div>}
                            <input type="file" className="form-control-file " id="main-image" onChange={(e) => SetMainImage(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group col-md-6 row">
                            <label htmlFor="images">Ảnh Phụ: </label>
                            {images && <div className={cx("product-images-thumb")}>
                                <Swiper loop={false} spaceBetween={10} slidesPerView={3} modules={[Navigation, Thumbs]} navigation={true}>
                                    {
                                        [...images].map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <div className={cx("product-image-wrapper")}>
                
                                                    {<img className={cx("product-image")}  src={URL.createObjectURL(image)}/>}
                                                </div>
                                            </SwiperSlide>
                                            
                                        ))   
                                    }
                                </Swiper>
                            </div>}
                            <input type="file" className="form-control-file " id="images" multiple onChange={(e) => SetImages(e.target.files)} />
                        </div>
                    </div>

                    <div className="mt-5">
                        <button style={{ width: '100px' }} className="me-4 btn btn-outline-info mb-2 btn-lg p-3" onClick={() => validateInsert()}>Xác nhận </button>
                        <button style={{ width: '100px' }} className="btn btn-outline-danger mb-2 btn-lg p-3" onClick={() => navigate(-1)}>Quay lại</button>
                    </div>
                </div>
            }

        </div>
    )
}
export default FormProduct