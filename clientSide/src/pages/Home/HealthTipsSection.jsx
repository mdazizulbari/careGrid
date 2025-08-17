import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const HealthTipsSection = () => {
  const tips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description: "Drink 8 glasses of water daily to boost health.",
    },
    {
      id: 2,
      title: "Exercise Daily",
      description: "30 minutes of activity improves heart health.",
    },
  ];

  return (
    <Container>
      <div className="mt-16">
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          Health Tips
        </h2>
        <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 xl:grid-cols-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="card bg-base-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold">{tip.title}</h3>
              <p className="mt-2 text-gray-600">{tip.description}</p>
              <Link to="/tips" className="btn btn-link mt-4">
                Learn More
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/tips" className="btn btn-primary">
            Explore All Tips
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HealthTipsSection;
