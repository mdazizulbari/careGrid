import CampsSection from "./CampsSection";
import BannerSection from "./BannerSection";
import HowToSection from "./HowToSection";
import Container from "../../components/Shared/Container";
import RecommendedByCareGrid from "./RecommendedByCareGrid";
import JoinOurNewsletter from "./JoinOurNewsletter";
import CampsThisMonth from "./CampsThisMonth";
import TestimonialsSection from "./TestimonialsSection";
import HealthTipsSection from "./HealthTipsSection";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-30">
        <BannerSection />
        <CampsSection />
        <RecommendedByCareGrid />
        <CampsThisMonth />
        <TestimonialsSection />
        <HealthTipsSection />
        <HowToSection />
        <JoinOurNewsletter />
      </div>
    </Container>
  );
};

export default Home;
