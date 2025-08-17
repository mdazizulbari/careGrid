import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const HealthTipsSection = () => {
  const tips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description:
        "Keeping your body hydrated is essential for optimal health.\n\nWater boosts energy by fueling every cell, helping you feel more alert and energized.\nSupports digestion by aiding in breaking down food and absorbing nutrients.\nImproves skin health, keeping your skin glowing and reducing dryness or irritation.\nRegulates temperature as your body uses water to maintain a stable internal climate.\nFlushes toxins by helping kidneys remove waste effectively.\nEnhances focus, as even mild dehydration can impair concentration—stay topped up!\nPromotes weight management by curbing appetite and boosting metabolism.\nPrevents headaches, a common trigger of dehydration—hydrate to avoid them.\nSupports joint health by lubricating joints, reducing discomfort during movement.\nRecommended intake: Aim for 8 glasses (about 2 liters) daily, adjusting for activity.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256",
    },
    {
      id: 2,
      title: "Exercise Daily",
      description:
        "Incorporating daily exercise transforms your well-being in countless ways.\n\nRegular activity strengthens the heart, lowering blood pressure and improving circulation.\nBoosts mood by releasing endorphins, naturally lifting your spirits and reducing stress.\nBuilds muscle with strength training, enhancing strength and supporting bone density.\nImproves sleep, helping you fall asleep faster and enjoy deeper rest.\nControls weight by burning calories and maintaining a healthy body composition.\nEnhances flexibility with stretching or yoga, improving range of motion and reducing stiffness.\nBoosts immunity as moderate exercise strengthens your body’s defense system.\nIncreases longevity, with studies linking regular movement to a longer, healthier life.\nSharpens the mind, improving memory and cognitive function over time.\nStart small: Aim for 30 minutes of moderate exercise—like walking—most days.",
      link: "https://www.cdc.gov/physicalactivity/basics/index.htm",
    },
    {
      id: 3,
      title: "Eat a Balanced Diet",
      description:
        "A balanced diet is the cornerstone of vibrant health and vitality.\n\nIt provides nutrients, ensuring you get vitamins, minerals, and energy from varied foods.\nSupports immunity, rich in fruits and veggies that fortify your body’s defenses.\nMaintains weight by balancing calories to prevent excess gain or loss.\nImproves digestion with fiber from whole grains and legumes keeping your gut happy.\nEnhances mood with Omega-3s and antioxidants lifting your mental well-being.\nStrengthens bones with calcium and vitamin D from dairy or greens building bone health.\nReduces disease risk, lowering chances of diabetes, heart disease, and more.\nBoosts energy with complex carbs providing steady fuel throughout the day.\nPromotes longevity, a nutrient-rich diet supporting a longer, healthier life.\nPractical tip: Fill half your plate with veggies, a quarter with protein, and a quarter with grains.",
      link: "https://www.heart.org/en/healthy-living/healthy-eating",
    },
  ];

  return (
    <Container>
      <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
        Health Tips
      </h2>

      <div className="grid w-full grid-cols-1 gap-8 pt-12 md:grid-cols-2 xl:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="card bg-base-200 justify-between rounded-2xl p-6 shadow-lg"
          >
            <div className="">
              <h3 className="text-xl font-bold">{tip.title}</h3>
              <p
                className="mt-2 text-gray-400"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {tip.description}
              </p>
            </div>

            <Link
              to={tip.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-soft mt-4"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/health-tips" className="btn btn-primary">
          Explore All Tips
        </Link>
      </div>
    </Container>
  );
};

export default HealthTipsSection;