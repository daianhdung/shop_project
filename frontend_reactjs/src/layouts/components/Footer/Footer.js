import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';


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
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img
                                width="80"
                                height="58"
                                style={{ background: '#ebecf0' }}
                                src={images.logo}
                                alt="logo"
                            />
                        </Link>
                        <p>We know pets are like family, so we are committed to providing the highest-quality products
                            that you can trust</p>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>Hotline Order</span>
                        </div>
                        <h2>(877) 834 1434</h2>
                        <ul className={cx('footer_icon')}>
                            <li>
                                <FontAwesomeIcon icon={faFacebook} />
                            </li>
                            <li><FontAwesomeIcon icon={faTwitter} /></li>
                            <li><FontAwesomeIcon icon={faPinterest} /></li>
                            <li><FontAwesomeIcon icon={faInstagram} /></li>
                        </ul>
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2>USEFUL LINKS</h2>
                        <span>New Products</span>
                        <span>Best Seller</span>
                        <span>Bundle & Save</span>
                        <span>Online Gift Card</span>
                        <span>Discount</span>
                        <span>Pet Store Locator</span>
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2>USEFUL LINKS</h2>
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
                            <div className={cx('search_form')}>
                                <input type="text" placeholder="Nhập vào email của bạn..." />
                                <button onMouseOver={() => setOver(true)}
                                onMouseLeave={() => setOver(false)}
                                style={over ? { color: "black" } : {}} className={cx('btn-search')}>
                                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faMobileScreen} />
                            <span>Download Our App</span>
                        </div>
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