import React from "react";
import CampsSection from "./CampsSection";
import BannerSection from "./BannerSection";
import HowToSection from "./HowToSection";
import Container from "../../components/Shared/Container";
import RecommendedByCareGrid from "./RecommendedByCareGrid";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-30">
        <BannerSection />
        <CampsSection />
        <RecommendedByCareGrid />
        <HowToSection />
      </div>
    </Container>
  );
};

export default Home;
