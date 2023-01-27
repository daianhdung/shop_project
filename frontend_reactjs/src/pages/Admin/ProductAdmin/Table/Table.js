import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { formatNumber } from '~/utils/stringUtils';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table({products, handleDelete}) {
    const navigate = useNavigate();
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
                            products.map((product,index) => {
                                return (
                                    <tr key={product.id}>
                                        <th scope="row">{index + 1}</th>
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
            </div>
        </div>
    )
}
export default Table 