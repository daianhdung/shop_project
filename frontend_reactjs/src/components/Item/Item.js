import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "~/config";
import { formatNumber } from "~/utils/stringUtils";
import { getCookie } from "~/utils/utilsCookie";
import styles from './Item.module.scss';
import * as bookmarkService from '~/service/bookmarkService';


const cx = classNames.bind(styles);

function Item({product}) {

    const [bookmark, SetBookmark] = useState(product.bookmark)
    const navigate = useNavigate();
    const handleBookmark = () => {
        const token = getCookie('tokenJwt')
        if (token == null) {
            // login page
            
        }
        else if (!bookmark) {
          
            bookmarkService.insertBookmark(product.id, getCookie('tokenJwt'))
                .then(response => {
                    if (response.success) {
                        
                        SetBookmark(true)
                        
                    }
                })
        } else {
            bookmarkService.deleteBookmark(product.id, getCookie('tokenJwt'))
            .then(response => {
                if (!response.success) {

                    SetBookmark(false)
                }
            })
        }
    }
    
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
                    <button className={cx('card-heart')} onClick={() => handleBookmark()}>
                        {bookmark ?  <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i> }
                    </button>
                    <button className={cx('card-cart')}>
                        <i className="bi bi-bag-plus"></i>
                    </button>
            </div>
        </div>
    )
}
export default Item