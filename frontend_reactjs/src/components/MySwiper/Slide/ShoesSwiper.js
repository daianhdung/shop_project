// import Swiper core and required modules
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import classNames from 'classnames/bind';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/swiper-bundle.css"
import config from '~/config';
import styles from './ShoesSwiper.module.scss';


const cx = classNames.bind(styles)


function ShoesSwiper() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      slidesPerGroup={1}
      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={cx('mySwiper')}
    >
      <SwiperSlide><Link className={cx('link-a')} to={config.routes.detail}>
        <img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} />
        <div className={cx('product-info')} >
          <h3 className="product-name">
              Nike Air Force 1 Low Pastel Reveal (DJ6901-600)
          </h3>
          <div className="price-box price-loop-style res-item">
            <span className="special-price">
              <span className="price">2.990.000₫</span>
            </span>
            <div className={cx('old-price')}>
              <span className={cx('price')}>
                3.950.000₫
              </span>
            </div>
          </div>
          <div className="product_swatch">
          </div>
        </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 2</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 3</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 4</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 5</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 6</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 7</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 8</SwiperSlide>
      <SwiperSlide><img width={250} height={250} src={process.env.PUBLIC_URL + '/image/nike-air-zoom-alphafly.jpeg'} /> 9</SwiperSlide>
    </Swiper>
  );
}

export default ShoesSwiper;