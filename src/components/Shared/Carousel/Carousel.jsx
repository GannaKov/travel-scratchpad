/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <ArrowBackIosIcon fontSize="large" />,
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    {" "}
    <ArrowForwardIosIcon fontSize="large" />,
  </button>
);
const Carousel = ({ images }) => {
  console.log("images", images);
  const settings = {
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

    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "linear",
  };
  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {/* <img src={baseUrl + "/abstract01.jpg"} /> */}
        {images.map((item) => (
          <div key={item}>
            <img src={item} className={styles.imgWrp} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
