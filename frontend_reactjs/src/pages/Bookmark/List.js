import classNames from "classnames/bind";
import Item from "~/components/Item/Item"
import styles from './List.module.scss';
const cx = classNames.bind(styles);

function List({products}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className="row">
                    {
                        products.map(product => {
                            return (
                                <div className="col col-lg-4 col-md-4 col-sm-6 col-6" key={product.id}>
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