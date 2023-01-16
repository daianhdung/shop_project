import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import * as productService from '~/service/productService'
import useFilter from '~/hooks/useFilter';
import useAuth from '~/hooks/useAuth';
import { getCookie } from '~/utils/utilsCookie';



function Product() {
  
    const filterContext = useFilter()
    const authContext = useAuth()
    const isAuth = authContext.auth
    const [current, SetCurrent] = useState(1)
    const [sort, SetSort] = useState("az")
    const [products, setProducts] = useState([])
    const [page, SetPage] = useState({})

    const handleGetProductBook = () => {
        const token = isAuth ? getCookie('tokenJwt') : ""
        var custtom = {
            current,
            sort
        }
        var customFilter = {
            ...filterContext.filter,
            ...custtom
        }
        var headers = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJyb2xlXCI6XCJST0xFX0FETUlOXCIsXCJ0eXBlXCI6XCJhdXRoZW5cIixcInVzZXJuYW1lXCI6XCJhZG1pbkBnbWFpbC5jb21cIn0iLCJpYXQiOjE2NzM4NDA0MzEsImV4cCI6MTY3Mzg2OTIzMX0.ymDueSRtNV632DlGSpI4FIpiy2glHcVgSyZA_NgPSpg'
            }
        } 
        console.log(customFilter)
        productService.getProduct( customFilter, headers)
            .then(response => {
                setProducts(response.data.products)
                SetPage({
                    current: response.data.currentPage,
                    total: response.data.totalPage
                })
            })
    }
    console.log(products)
    useEffect( () => {
        handleGetProductBook();
    }, [filterContext])
    

    return (
        <div>
            <div>
                {
                    products.map((item) => (
                    <Link  to={config.routes.detail + '/' + item.id}>
                        <div key={item.id}>
                            <img width={200} height={200} src={process.env.REACT_APP_IMG_URL + item.image} />
                            <div>
                                <h4>{item.name}</h4>
                                <span>{item.price}₫</span>
                            </div>
                        </div>
                    </Link>))
                }
            </div>
        </div>
    )
}

export default Product;
