// src/components/HeroSlider.tsx
import React from "react";
import Slider from "react-slick";

const HeroSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      <div
        className="h-[700px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/Bv0rf4V4/luxury-car-rental-promotional-web-banner-design-10669966.jpg')",
        }}
      ></div>
      <div
        className="h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://example.com/another-image.jpg')",
        }}
      ></div>
      <div
        className="h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://example.com/yet-another-image.jpg')",
        }}
      ></div>
    </Slider>
  );
};

export default HeroSlider;
