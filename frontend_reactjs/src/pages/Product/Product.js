import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import * as changeService from '~/service/changeService'
import useFilter from '~/hooks/useFilter';
import * as productService from '~/service/productService';
import { getCookie } from '~/utils/utilsCookie';
import Sort from '~/components/Sort/sort';
import Paging from '~/components/Paging/Paging';
import List from '../Bookmark/List';



function Product() {

    const filterContext = useFilter()
    const [page, SetPage] = useState({
        currentPage: 1
    })
    const [sort, SetSort] = useState("az")
    const [products, SetProducts] = useState(null)

    const handleSort = (e) => {
        SetSort(e.target.value)
    }
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

            console.log(customFilter);
    }, [filterContext, sort, page.currentPage])

   


    return (
        <div id='wrapper'>
            <div className='row'>
                <div className='col-md-12'>
                    <Sort sort={sort} handleSort={handleSort} />
                    {products && <List products={products} />}
                    <div className='row d-flex justify-content-center bg-white'>
                        <div className='col-md-2'>
                            {products && <Paging currentPage={page.currentPage} totalPage={page.totalPage} handleNext={handleNext} handlePrev={handlePrev} handleSetCurrentPage={handleSetCurrentPage} />}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Product;
