import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import CreateAccount from "../../components/Login/CreateAccount";
import LogIn from "../../components/Login/LogIn";

const Login = () => {
  // const loginRef = useRef(null);
  //const signUpRef = useRef(null);
  console.log("LogIn padre");
  const [login, setLogin] = useState(true);
  const currentWidth = window.innerWidth;
  const handleLogin = () => {
    setLogin((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.add("linear__gradient__container");
    document.body.style.backgroundColor = "#605b71";
    document
      .getElementById("root")
      .classList.remove("root__main", "nav__container");
  }, []);

  return (
    <div className="login__container login  container rounded-md h-screen flex justify-center items-center ">
      <div className="w-[90%] h-[620px] rounded-md  p-4 bg-[#2b2738] flex  shadow-2xl lg:gap-5 xl:gap-3 2xl:gap-0 ">
        {currentWidth >= 1024 && (
          <div
            className="login__images h-full w-[50%] xs:hidden lg:block 
        "
          >
            <Swiper
              className="home__swiper h-full  rounded-md xs:hidden lg:block"
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
              {[
                "akane.jpg",
                "fan.jpg",
                "kawa.jpg",
                "chizuru.jpg",
                "koe.jpg",
                "yumeko.jpg",
              ].map((image, index) => (
                <SwiperSlide key={index} className="w-full h-full rounded-md">
                  <img
                    src={`/Images/${image}`} // Ruta desde la raíz del proyecto
                    alt={`image-${index + 1}`}
                    className="w-full h-full rounded-md object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className=" h-full xs:w-[100%] lg:w-[50%]  flex justify-center items-center relative">
          {login && <LogIn login={login} handleLogin={handleLogin} />}
          {!login && (
            <CreateAccount
              login={login}
              handleLogin={handleLogin}
              // form={form}
              //handleChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
