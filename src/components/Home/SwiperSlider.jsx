import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
// Estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const SwiperSlider = () => {
  return (
    <section className="swiper__images text-white  grid pb-5  ">
      <Swiper
        className="home__swiper    h-[380px]"
        modules={[Autoplay]}
        loop={true}
        spaceBetween={-60}
        grabCursor={true}
        slidesPerView={"auto"}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide className="swiper__article border">
          <img
            src="../../../public/Images/akane.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper__article">
          <img
            src="../../../public/Images/fan.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper__article">
          <img
            src="../../../public/Images/kawa.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper__article">
          <img
            src="../../../public/Images/chizuru.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper__article">
          <img
            src="../../../public/Images/koe.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper__article">
          <img
            src="../../../public/Images/yumeko.jpg"
            alt="image-1"
            className="swiper__img"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SwiperSlider;
