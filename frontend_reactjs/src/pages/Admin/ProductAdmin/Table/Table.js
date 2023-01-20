import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table({products, handleDelete}) {
    return (
        <div className={cx("wrapper")} >
            <div className={cx("inner")} >
                <table className='table table-hover table-content'>
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Kích thước</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product,index) => {
                                return (
                                    <tr key={product.id} className>
                                        <th scope="row">{index}</th>
                                        <td>{product.name}</td>
                                        <td>
                                            <img src={product.image} className="img-fluid img-thumbnail"/>
                                        </td>
                                        <td>{product.brand}</td>
                                        <td>{` ${product.sizes.map( size => {
                                            return (' ' + size)
                                        })} `}</td>
                                        <td>{product.price}đ</td>
                                        <td className={cx("table-action")}>
                                            <a href='#'> <i class="bi bi-pencil-square"></i> </a>     
                                            <a onClick={() => handleDelete(product.id)}> <i class="bi bi-trash"></i> </a>
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