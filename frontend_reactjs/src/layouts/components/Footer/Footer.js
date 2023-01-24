import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';


import config from '~/config';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeCircleCheck, faMobileScreen, faPhone } from '@fortawesome/free-solid-svg-icons';
import { getAllCategoryName } from '~/service/categoryService';
import { getAllBrandName } from '~/service/brandService';
import useFilter from '~/hooks/useFilter';

const cx = classNames.bind(styles);

function Footer() {
    const [over, setOver] = useState(false);

    const [allCategory, setAllCategory] = useState()
    const [allBrand, setAllBrand] = useState()

    const filterContext = useFilter()

    useEffect(() => {
        const fetchApiGetAllBrand = async () => {
            const response = await getAllBrandName()
            setAllBrand(response)
        }
        const fetchApiGetAllCategory = async () => {
            const response = await getAllCategoryName()
            setAllCategory(response)
        }
        fetchApiGetAllBrand()
        fetchApiGetAllCategory()

    }, [])

    const filterWithCategory = (idCate) => {
        filterContext.handleFilter({ categoryId: [idCate], brandId: [] })
    }
    const filterWithBrand = (idBrand) => {
        filterContext.handleFilter({ brandId: [idBrand], categoryId: [] })
    }


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
                            <span className='ms-3 fw-bold'>Hotline Order</span>
                        </div>
                        <h2 >(877) 834 1434</h2>
                        <ul className={cx('footer_icon')}>
                            <li>
                                <FontAwesomeIcon style={{ color: '#3e5693' }} icon={faFacebook} />
                            </li>
                            <li><FontAwesomeIcon style={{ color: '#009ded' }} icon={faTwitter} /></li>
                            <li><FontAwesomeIcon style={{ color: '#0071b0' }} icon={faPinterest} /></li>
                            <li><FontAwesomeIcon style={{ color: '#f01c2e' }} icon={faInstagram} /></li>
                        </ul>
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2 className='fw-bold'>THƯƠNG HIỆU</h2>
                        {allBrand && allBrand.map((item) => (<Link className='my-3 fs-3 ' onClick={() => filterWithBrand(item.id)} to={config.routes.product} key={item.id}>
                            <span>{item.name}</span>
                        </Link>
                        ))}
                    </div>
                    <div className={cx('footer_block_short')}>
                        <h2 className='fw-bold'>THỂ LOẠI</h2>
                        {allCategory && allCategory.map((item) => (<Link className='my-3 fs-3 ' onClick={() => filterWithBrand(item.id)} to={config.routes.product} key={item.id}>
                            <span>{item.name}</span>
                        </Link>
                        ))}
                    </div>
                    <div className={cx('footer_block_long', 'second-block')}>
                        <h2 className='fw-bold'>NEWSLETTER</h2>
                        <p className='fs-3'>Nhập email để may mắn nhận <span style={{color : '#ff7526'}}>10%</span> discount. Get E-mail updates about our latest shop and
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