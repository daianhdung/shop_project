import classNames from "classnames/bind";
import Item from "~/components/Item/Item"
import styles from './List.module.scss';
const cx = classNames.bind(styles);

function List({products}) {
   
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className="row w-100">
                    {
                        products.map(product => {
                            return (
                                <div className="col col-lg-3 col-md-3 col-sm-6 col-6 mb-5" key={product.id}>
                                    <Item product={product}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default List