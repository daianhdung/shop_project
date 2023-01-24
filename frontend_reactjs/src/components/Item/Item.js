import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import config from "~/config";
import { formatNumber } from "~/utils/stringUtils";
import styles from './Item.module.scss';


const cx = classNames.bind(styles);

function Item({product, handleBookmark}) {
    return (
        <div className={cx('card')}>
            <Link key={product.id} to={config.routes.detail + '/' + product.id}>
                <div className={cx('card-img')}>
                    <img  src={process.env.REACT_APP_IMG_URL + product.image} />


                </div>

                <div className={cx('card-title')}>
                    <h4>{product.name}</h4>
                </div>
                <div className={cx('card-price')}> 
                    <span>{formatNumber(product.price)}₫</span>
                </div>
            
            </Link>

            <div className={cx('card-action')}>
                    <button className={cx('card-heart')} onClick={() => handleBookmark(product)}>
                        {product.bookmark ?  <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i> }
                    </button>
                    <button className={cx('card-cart')}>
                        <i className="bi bi-bag-plus"></i>
                    </button>
            </div>
        </div>
    )
}
export default Item