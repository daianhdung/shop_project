import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import useFilter from '~/hooks/useFilter';
import * as productService from '~/service/productService';
import { getCookie } from '~/utils/utilsCookie';
import Sort from '~/components/Sort/sort';
import Paging from '~/components/Paging/Paging';
import List from '../Bookmark/List';



function Product({ setIsLoading }) {

    const filterContext = useFilter()
    const [page, SetPage] = useState({
        currentPage: 1
    })
    const [sort, SetSort] = useState("az")
    const [products, SetProducts] = useState(null)

    const handleSort = (e) => {
        SetSort(e.target.value)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleNext = () => {
        if (page.currentPage < page.totalPage) {
            SetPage(prev => {
                return {
                    ...prev,
                    currentPage: prev.currentPage + 1
                }
            })
        }
    }
    const handlePrev = () => {
        if (page.currentPage > 1) {
            SetPage(prev => {
                return {
                    ...prev,
                    currentPage: prev.currentPage - 1
                }
            })
        }
    }
    const handleSetCurrentPage = (num) => {
        SetPage(prev => {
            return {
                ...prev,
                currentPage: num
            }
        })
    }


    useEffect(() => {
        setIsLoading(true)
        const token = getCookie('tokenJwt')
        var custtom = {
            current: page.currentPage,
            sort
        }
        var customFilter = {
            ...filterContext.filter,
            ...custtom
        }
        productService.getProduct(customFilter, token)
        
            .then(response => {
                SetProducts(response.products)
                SetPage({
                    currentPage: response.currentPage,
                    totalPage: response.totalPage
                })
                
            })
            .finally(() => {
                setIsLoading(false);
            })

    }, [filterContext, sort, page.currentPage])



    return (
        <div id='wrapper'>
            <div className='row'>
                <div className='col-md-12'>
                    <Sort sort={sort} handleSort={handleSort} />
                    {products && products.length !== 0 && <List products={products} />}
                    <div className='row d-flex justify-content-center bg-white'>
                        <div className='col-md-2'>
                            {products && products.length !== 0 && <Paging currentPage={page.currentPage} totalPage={page.totalPage} handleNext={handleNext} handlePrev={handlePrev} handleSetCurrentPage={handleSetCurrentPage} />}
                        </div>
                    </div>
                    {products && products.length === 0 && <div className=' justify-content-center bg-white p-5 rounded'><h2>Sản phẩm bạn tìm kiếm hiện tại hết hàng</h2></div>}
                </div>
            </div>


        </div>
    )
}

export default Product;
