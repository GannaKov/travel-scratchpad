/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Carousel = ({ images }) => {
  var settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    //speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <ArrowForwardIosIcon fontSize="large" />,
    prevArrow: <ArrowBackIosIcon fontSize="large" />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {/* <img src={baseUrl + "/abstract01.jpg"} /> */}
        {images.map((item) => (
          <div key={item} className={styles.imgWrp}>
            <img src={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
