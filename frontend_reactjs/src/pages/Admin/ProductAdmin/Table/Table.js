import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paging from '~/components/Paging/Paging';
import config from '~/config';
import { formatNumber } from '~/utils/stringUtils';
import { getCookie } from '~/utils/utilsCookie';
import styles from './Table.module.scss';
import * as adminProductService from '~/service/admin/adminProductService';

const cx = classNames.bind(styles);

function Table({products}) {
    const navigate = useNavigate();
    const [mProducts, SetProducts] = useState([...products])
    const [pageProducts, SetPageProducts] =  useState(() => mProducts.slice(0, 10))
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPage, SetTotalPage] = useState(() => {
        var totalProducts = mProducts.length
        if (totalProducts % 10 == 0) {
            return totalProducts / 10
        } else {
            return totalProducts / 10 + 1
        }
    })
    const handleNext = () => {
        if (currentPage < totalPage) {
            SetCurrentPage(prev => {
                handlePageProduct(prev + 1)
                return prev + 1
            })
        } 
    }
    const handlePrev = () => {
        if (currentPage > 1) {
            SetCurrentPage(prev => {
                handlePageProduct(prev - 1)
                return prev  - 1
            })
        }
    }
    const handleSetCurrentPage = (num) => {
        if (currentPage != num) {
            SetCurrentPage(prev => {
                handlePageProduct(num)
                return num
            })
        }
    }
    const handlePageProduct = (current) => {
        SetPageProducts(mProducts.slice((current - 1) * 10, current * 10))
    }
    const handlePageProductAfterDelete = (current, total, products) => {
        if (mProducts.length % 10 == 1) {
            if (current == total) {
                total--;
                current--;
                SetTotalPage(total)
                SetCurrentPage(current)
            } else {
                total--;
                SetTotalPage(total)
            }

        }
        SetPageProducts(products.slice((current - 1) * 10, current * 10))


    } 
    const handleDelete = (id) => {
        const token = getCookie('tokenJwt');
        adminProductService.deleteProduct(token, id)
            .then(response => {
            
                if (response.success) {
                    // var [product, ...newProducts] = products
                    // products = newProducts
                    var newProducts = mProducts.filter(product => product.id !== id)
                    SetProducts(newProducts) 
                    handlePageProductAfterDelete(currentPage, totalPage, newProducts)  
                }
            })
    }
    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col" style={{maxWidth: '90px'}}>Thương hiệu</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageProducts.map((product,index) => {
                                return (
                                    <tr key={product.id}>
                                        <th scope="row">{ ((currentPage - 1) * 10) + index + 1 }</th>
                                        <td style={{maxWidth: '200px'}}>{product.name}</td>
                                        <td>
                                            <img src={product.image} className="img-fluid img-thumbnail"/>
                                        </td>
                                        <td style={{maxWidth: '90px'}}>{product.brand}</td>
                                        <td>{formatNumber(product.price)}đ</td>
                                        <td className={cx("table-action")}>
                                            <Link to={`${config.routes.adminProductUpdate}?id=${product.id}`}> <i className="bi bi-pencil-square text-info fs-1"></i> </Link>     
                                            <Link onClick={() => handleDelete(product.id)}> <i className="bi bi-trash text-danger fs-1 ms-3"></i> </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Paging totalPage={totalPage} currentPage={currentPage} handleNext={handleNext} handlePrev={handlePrev} handleSetCurrentPage={handleSetCurrentPage}/>
            </div>
        </div>
    )
}
export default Table 