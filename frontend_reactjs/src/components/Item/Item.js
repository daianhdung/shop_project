import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "~/config";
import { formatNumber } from "~/utils/stringUtils";
import styles from './Item.module.scss';


const cx = classNames.bind(styles);

function Item({product}) {
    return (
        <Link key={product.id} className={cx('link-a')} to={config.routes.detail + '/' + product.id}>
            <div className={cx('wrap_item')}>
                <img width={200} height={200} src={process.env.REACT_APP_IMG_URL + product.image} />
                <div>
                    <h4>{product.name}</h4>
                    <span>{formatNumber(product.price)}₫</span>
                </div>
            </div>
        </Link>
    )
}
export default Item