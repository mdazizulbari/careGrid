import React from "react";
import { Link } from "react-router"; // Adjusted per your note
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
    {
      id: 3,
      name: "Dr. Sanjay Patel",
      role: "Cardiologist",
      text: "The heart health initiatives by CareGrid are groundbreaking!",
    },
    {
      id: 4,
      name: "Fatima Begum",
      role: "Nurse",
      text: "Working with CareGrid camps has been a rewarding experience.",
    },
    {
      id: 5,
      name: "Ali Hassan",
      role: "Patient",
      text: "The dental camp restored my confidence—amazing service!",
    },
    {
      id: 6,
      name: "Dr. Priya Sharma",
      role: "Pediatrician",
      text: "CareGrid’s child health camps are a boon for our community.",
    },
    {
      id: 7,
      name: "Zara Ahmed",
      role: "Volunteer",
      text: "Volunteering with CareGrid opened my eyes to healthcare access.",
    },
    {
      id: 8,
      name: "Mohammed Iqbal",
      role: "Patient",
      text: "The diabetes camp helped me manage my health—grateful to CareGrid!",
    },
    {
      id: 9,
      name: "Dr. Neelam Gupta",
      role: "Pulmonologist",
      text: "CareGrid’s respiratory care camps have transformed patient outcomes in my area!",
    },
  ];

  return (
    <Container>
      <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-2 lg:grid-cols-3">
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
        <Link href="/testimonials" className="btn btn-primary">
          View More
        </Link>{" "}
        {/* Adjusted to href for react-router */}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
