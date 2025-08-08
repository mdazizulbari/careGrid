import React from "react";
import CampsSection from "./CampsSection";
import BannerSection from "./BannerSection";
import HowToSection from "./HowToSection";
import Container from "../../components/Shared/Container";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-20">
        <BannerSection />
        <CampsSection />
        <HowToSection />
      </div>
    </Container>
  );
};

export default Home;
