import { useEffect } from "react";
import SwiperSlider from "../../components/Home/SwiperSlider";

const Home = () => {
  useEffect(() => {
    // document.body.classList.add("linear__gradient__container");
    document.body.style.backgroundColor = "#0b0e15";
    document
      .getElementById("root")
      .classList.add("root__main", "nav__container");
  }, []);

  return (
    <>
      <SwiperSlider />
    </>
  );
};

export default Home;
