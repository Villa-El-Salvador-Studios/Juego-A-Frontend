import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="imagen1.jpg" alt="Slide 1" />
      </div>
      <div>
        <img src="imagen2.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="imagen3.jpg" alt="Slide 3" />
      </div>
      {/* Agrega más slides según sea necesario */}
    </Slider>
  );
};

export default Carousel;