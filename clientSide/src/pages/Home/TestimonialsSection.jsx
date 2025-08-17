import Container from "../../components/Shared/Container";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Amina Khan",
      role: "Obstetrician",
      text: "CareGrid saved lives with their maternal health camps!",
    },
    {
      id: 2,
      name: "Rahim Uddin",
      role: "Patient",
      text: "The eye care camp was life-changing—thank you, CareGrid!",
    },
  ];

  return (
    <Container>
      <div className="mt-16">
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          What People Say
        </h2>
        <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card bg-base-200 rounded-2xl p-6 shadow-lg"
            >
              <p className="text-lg italic">"{testimonial.text}"</p>
              <p className="mt-4 font-bold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="/testimonials" className="btn btn-primary">
            View More
          </a>
        </div>
      </div>
    </Container>
  );
};

export default TestimonialsSection;
