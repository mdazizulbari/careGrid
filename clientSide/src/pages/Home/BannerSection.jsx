import React from "react";
import { TbH3 } from "react-icons/tb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const BannerSection = () => {
  const slides = [
    {
      title: "Transforming Lives with Mobile Clinics",
      text: "A mobile clinic served 1,200 individuals in remote areas this year. Several critical cases were diagnosed early, leading to timely treatments.",
      image:
        "https://images.unsplash.com/photo-1662046184230-404233fea380?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Healing Hearts in Rural Outreach",
      text: "Over 500 patients received free cardiac screenings in our latest rural camp. Local communities now have better access to life-saving healthcare services.",
      image:
        "https://plus.unsplash.com/premium_photo-1661542658476-e0fd50dfe5b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Empowering Youth Through Health Education",
      text: "Our camp educated 300+ teens on nutrition and mental wellness last season. Many participants reported improved confidence and healthier habits.",
      image:
        "https://images.unsplash.com/photo-1625657292752-c41ada213c88?q=80&w=1158&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Building Community Resilience Post-Disaster",
      text: "Post-flood relief camps provided care to 800+ affected families. Survivors gained hope and resources, strengthening community bonds.",
      image:
        "https://images.unsplash.com/photo-1529209076408-5a115ec9f1c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="max-w-5xl">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        stopOnHover={false}
      >
        {slides.map((slide) => (
          <div className="">
            <img
              src={slide.image}
              alt=""
              className="max-h-[500px] rounded-2xl object-cover md:rounded-4xl"
            />
            <p className="legend">{slide.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSection;
