import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link} from 'react-router-dom';


import config from '~/config';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeCircleCheck, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    const [over, setOver] = useState(false);

    return (<footer>
        <div className={cx('wrapper')}>
            <div className={cx('footer_top')}>
                <div className={cx('footer_col')}>
                    <div className={cx('footer_block_long')}>
                        <Link to={config.routes.home} className={cx('logo-link', 'f-center-align')}>
                            <img
                                width="60"
                                height="60"
                                style={{ background: '#ebecf0', borderRadius: '50%' }}
                                src={images.logo}
                                alt="logo"
                            />
                            <h2 className='ms-3 text-primary'>Shoes Shop</h2>
                        </Link>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda repudiandae, quas natus placeat eligendi reprehenderit. Incidunt officia, sit distinctio minus consequuntur minima dolores ducimus voluptatum commodi nobis dolorum nam molestiae?</p>
                        <div className='my-2'>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>Hotline Order</span>
                        </div>
                        <h2 >(877) 834 1434</h2>
                        <ul className={cx('footer_icon')}>
                            <li>
                                <FontAwesomeIcon style={{color: '#3e5693'}} icon={faFacebook} />
                            </li>
                            <li><FontAwesomeIcon style={{color: '#009ded'}} icon={faTwitter} /></li>
                            <li><FontAwesomeIcon style={{color: '#0071b0'}} icon={faPinterest} /></li>
                            <li><FontAwesomeIcon style={{color: '#f01c2e'}} icon={faInstagram} /></li>
                        </ul>
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2>THƯƠNG HIỆU</h2>
                        <span>New Products</span>
                        <span>Best Seller</span>
                        <span>Bundle & Save</span>
                        <span>Online Gift Card</span>
                        <span>Discount</span>
                        <span>Pet Store Locator</span>
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2>THỂ LOẠI</h2>
                        <span>New Products</span>
                        <span>Best Seller</span>
                        <span>Bundle & Save</span>
                        <span>Online Gift Card</span>
                        <span>Discount</span>
                        <span>Pet Store Locator</span>
                    </div>
                    <div className={cx('footer_block_long', 'second-block')}>
                        <h2>NEWSLETTER</h2>
                        <p>Subscrible & get <span>10%</span> discount. Get E-mail updates about our latest shop and
                            <span>special offers.</span></p>
                        <div>
                            <div className={cx('search_form', 'mt-3')}>
                                <input type="text" placeholder="Nhập vào email của bạn..." />
                                <button onMouseOver={() => setOver(true)}
                                onMouseLeave={() => setOver(false)}
                                style={over ? { color: "black" } : {}} className={cx('btn-search')}>
                                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                                </button>
                            </div>
                        </div>
                        {/* <div>
                            <FontAwesomeIcon icon={faMobileScreen} />
                            <span>Download Our App</span>
                        </div> */}
                        <div>
                            <img src="./assest/Homepage/App-Store.jpg" alt="" />
                            <img src="./assest/Homepage/Google-Play.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer_bot')}>

            </div>
        </div>
    </footer>);
}

export default Footer;