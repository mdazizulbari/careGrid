import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const HealthTipsPage = () => {
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
    {
      id: 4,
      title: "Get Enough Sleep",
      description:
        "Quality sleep is vital for your body and mind to recharge.\n\nImproves memory and learning by consolidating daily experiences.\nSupports heart health by regulating blood pressure and stress hormones.\nBoosts immunity, helping your body fight off illnesses.\nEnhances mood, reducing irritability and depression risks.\nPromotes weight control by balancing hunger hormones.\nRepairs tissues, aiding muscle recovery and growth.\nSharpens focus, improving decision-making and productivity.\nReduces inflammation, lowering chronic disease risk.\nAims for 7-9 hours nightly, creating a consistent sleep routine.\nAvoid screens before bed to improve sleep quality.",
      link: "https://www.sleepfoundation.org/how-sleep-works",
    },
    {
      id: 5,
      title: "Manage Stress",
      description:
        "Effective stress management keeps you balanced and healthy.\n\nReduces anxiety by calming the mind through techniques like meditation.\nLowers blood pressure, protecting your heart from strain.\nImproves sleep quality, helping you rest more deeply.\nBoosts immunity by reducing stress-related hormone spikes.\nEnhances focus, clearing mental fog for better decisions.\nPromotes emotional resilience, aiding in tough times.\nPrevents burnout with regular breaks and relaxation.\nSupports relationships by improving patience and communication.\nTry deep breathing or yoga for 10 minutes daily.\nSeek support from friends or professionals when needed.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/stress-management",
    },
    {
      id: 6,
      title: "Quit Smoking",
      description:
        "Quitting smoking transforms your health dramatically.\n\nImproves lung function within weeks of stopping.\nReduces heart disease risk by lowering blood pressure.\nEnhances oxygen levels, boosting energy and stamina.\nLowers cancer risk, especially lung and throat cancers.\nImproves skin appearance by increasing blood flow.\nStrengthens immunity, reducing infection susceptibility.\nSaves money and improves overall quality of life.\nSupports mental health by reducing anxiety over time.\nSeek nicotine replacement or counseling for support.\nCelebrate milestones to stay motivated.",
      link: "https://www.cdc.gov/tobacco/quit/index.htm",
    },
    {
      id: 7,
      title: "Limit Alcohol",
      description:
        "Moderating alcohol intake benefits your long-term health.\n\nProtects the liver from damage and fatty buildup.\nReduces heart disease risk with controlled consumption.\nImproves sleep quality by avoiding disruptions.\nLowers cancer risk, particularly mouth and liver cancers.\nEnhances mental clarity by reducing brain fog.\nSupports weight management by cutting empty calories.\nBoosts mood stability, reducing depression links.\nPromotes better digestion and nutrient absorption.\nAim for no more than one drink per day if you drink.",
      link: "https://www.niaaa.nih.gov/alcohols-effects-health",
    },
    {
      id: 8,
      title: "Practice Good Hygiene",
      description:
        "Good hygiene prevents illness and boosts confidence.\n\nWashing hands reduces germ spread and infections.\nRegular bathing keeps skin clean and healthy.\nBrushing teeth prevents cavities and gum disease.\nClean clothes reduce bacteria and odor buildup.\nProper wound care avoids infections and scarring.\nFrequent hand sanitizer use protects in public.\nHealthy nails prevent fungal or bacterial growth.\nGood hygiene boosts self-esteem and social interactions.\nMake it a daily routine for lasting benefits.",
      link: "https://www.who.int/health-topics/hygiene",
    },
    {
      id: 9,
      title: "Get Regular Checkups",
      description:
        "Routine checkups catch health issues early.\n\nDetects diseases like hypertension before symptoms appear.\nMonitors cholesterol and heart health over time.\nScreens for cancer with timely interventions.\nTracks diabetes management with blood sugar tests.\nEnsures vaccinations are up to date.\nAssesses mental health with professional input.\nPromotes preventive care and lifestyle advice.\nReduces treatment costs with early detection.\nSchedule annually or as recommended by your doctor.",
      link: "https://www.webmd.com/a-to-z-guides/importance-of-medical-checkups",
    },
    {
      id: 10,
      title: "Maintain Oral Health",
      description:
        "Oral health impacts your overall well-being.\n\nBrushing twice daily prevents plaque and cavities.\nFlossing removes food particles between teeth.\nRegular dental visits catch issues early.\nHealthy gums reduce heart disease links.\nFresh breath boosts confidence in social settings.\nAvoids tooth loss with proper care.\nReduces infection risk from poor hygiene.\nSupports digestion by aiding initial food breakdown.\nUse fluoride toothpaste for added protection.",
      link: "https://www.mouthhealthy.org/en",
    },
    {
      id: 11,
      title: "Stay Sun-Safe",
      description:
        "Protecting your skin from the sun prevents damage.\n\nUse sunscreen to block harmful UV rays.\nWear hats and sunglasses for extra coverage.\nAvoid peak sun hours from 10 AM to 4 PM.\nReduces skin cancer risk with consistent care.\nPrevents premature aging like wrinkles.\nMaintains even skin tone and texture.\nHydrates skin to combat sun dryness.\nCheck skin regularly for unusual spots.\nSeek shade during long outdoor activities.",
      link: "https://www.skincancer.org/skin-cancer-prevention/sun-protection",
    },
    {
      id: 12,
      title: "Practice Mindfulness",
      description:
        "Mindfulness enhances mental and physical health.\n\nReduces stress with focused breathing exercises.\nImproves concentration through present-moment awareness.\nLowers blood pressure with regular practice.\nBoosts emotional regulation and patience.\nEnhances sleep quality with calm routines.\nReduces anxiety with daily meditation.\nSupports better decision-making skills.\nPromotes self-awareness and inner peace.\nStart with 5-10 minutes of quiet reflection.",
      link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
    },
    {
      id: 13,
      title: "Maintain Healthy Weight",
      description:
        "A healthy weight supports overall wellness.\n\nReduces strain on joints and muscles.\nLowers risk of diabetes and heart disease.\nImproves mobility and energy levels.\nEnhances self-esteem and body image.\nSupports better sleep and breathing.\nBalances hormones for overall health.\nPrevents chronic conditions over time.\nCombines diet and exercise for success.\nConsult a professional for personalized goals.",
      link: "https://www.nhs.uk/live-well/healthy-weight/",
    },
    {
      id: 14,
      title: "Avoid Processed Foods",
      description:
        "Cutting processed foods improves health outcomes.\n\nReduces sugar intake linked to obesity.\nLowers sodium to protect heart health.\nIncreases nutrient intake from whole foods.\nImproves digestion with natural fibers.\nReduces inflammation in the body.\nSupports weight loss efforts naturally.\nLowers risk of chronic diseases.\nEnhances taste with fresh ingredients.\nOpt for home-cooked meals when possible.",
      link: "https://www.hsph.harvard.edu/nutritionsource/processed-foods/",
    },
    {
      id: 15,
      title: "Boost Mental Health",
      description:
        "Mental health care is key to a balanced life.\n\nPractice gratitude to lift your mood.\nSeek therapy for professional support.\nConnect with friends to reduce isolation.\nExercise regularly to release endorphins.\nMeditate for stress relief and focus.\nSet realistic goals to build confidence.\nLimit screen time for better rest.\nRecognize signs of burnout early.\nPrioritize self-care daily routines.",
      link: "https://www.mentalhealth.org.uk",
    },
    {
      id: 16,
      title: "Stay Active Outdoors",
      description:
        "Outdoor activity benefits body and mind.\n\nIncreases vitamin D from sunlight exposure.\nBoosts mood with fresh air and nature.\nImproves fitness with varied terrain.\nReduces stress through natural settings.\nEnhances lung capacity with clean air.\nPromotes social interaction if with others.\nSupports better sleep cycles.\nLowers blood pressure naturally.\nAim for 20-30 minutes daily.",
      link: "https://www.nhs.uk/live-well/exercise/outdoor-activities/",
    },
    {
      id: 17,
      title: "Practice Good Posture",
      description:
        "Good posture prevents pain and boosts confidence.\n\nReduces back and neck strain.\nImproves breathing with an open chest.\nEnhances appearance with a straight spine.\nPrevents joint issues over time.\nBoosts energy by optimizing muscle use.\nSupports digestion with proper alignment.\nReduces fatigue during long sitting.\nStrengthens core muscles naturally.\nAdjust your workspace for ergonomics.",
      link: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/posture/art-20045281",
    },
    {
      id: 18,
      title: "Limit Screen Time",
      description:
        "Reducing screen time improves overall health.\n\nPrevents eye strain and dryness.\nImproves sleep by reducing blue light.\nReduces stress from constant notifications.\nEncourages physical activity instead.\nBoosts mental clarity and focus.\nSupports better social interactions.\nLowers risk of headaches.\nPromotes relaxation and downtime.\nAim for a digital detox hourly.",
      link: "https://www.eyes.org/articles/how-too-much-screen-time-affects-eye-health",
    },
    {
      id: 19,
      title: "Stay Vaccinated",
      description:
        "Vaccinations protect you and your community.\n\nPrevents serious diseases like measles.\nReduces spread of infections to others.\nBoosts herd immunity effectively.\nProtects vulnerable populations like children.\nUpdates immunity with new strains.\nLowers healthcare costs long-term.\nEnsures travel safety requirements.\nSupports public health initiatives.\nFollow your doctor’s vaccination schedule.",
      link: "https://www.who.int/health-topics/vaccines",
    },
    {
      id: 20,
      title: "Practice Deep Breathing",
      description:
        "Deep breathing enhances physical and mental health.\n\nReduces stress by calming the nervous system.\nImproves oxygen flow to the brain.\nLowers blood pressure naturally.\nEnhances focus and concentration.\nPromotes relaxation and sleep quality.\nStrengthens lung capacity over time.\nReduces anxiety with regular practice.\nSupports better posture during sessions.\nTry 5 minutes daily with slow breaths.",
      link: "https://www.healthline.com/health/breathing-exercises-for-anxiety",
    },
    {
      id: 21,
      title: "Maintain Eye Health",
      description:
        "Protecting your eyes ensures long-term vision clarity.\n\nTake regular breaks from screens to reduce strain.\nWear sunglasses to shield from UV rays.\nEat foods rich in vitamin A like carrots.\nGet annual eye exams to catch issues early.\nAvoid rubbing eyes to prevent irritation.\nUse proper lighting for reading or work.\nStay hydrated to support eye moisture.\nLimit exposure to smoke or allergens.\nPractice the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.\nConsult an optometrist for personalized care.",
      link: "https://www.aao.org/eye-health/tips-prevention",
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
    </Container>
  );
};

export default HealthTipsPage;
