import React from "react";
import Container from "../../components/Shared/Container";

const HowToSection = () => {
  return (
    <Container>
      <div className="flex w-full flex-col items-center justify-center gap-10 px-5">
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          How To Use CareGrid
        </h2>

        <div className="join join-vertical bg-base-100">
          <div className="collapse-arrow join-item border-base-300 collapse border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold">
              Step 1: Explore Available Camps
            </div>
            <div className="collapse-content text-sm">
              Discover a variety of medical camps offered by CareGrid. Each camp
              listing provides details like location, date, fees, and healthcare
              professionals involved, helping you find the right opportunity.
            </div>
          </div>
          <div className="collapse-arrow join-item border-base-300 collapse border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Step 2: Filter and Search Camps
            </div>
            <div className="collapse-content text-sm">
              Use our search bar and filters to narrow down camps by date,
              location, or fees. This makes it easy to find camps that match
              your schedule and budget.
            </div>
          </div>
          <div className="collapse-arrow join-item border-base-300 collapse border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Step 3: Review Camp Details
            </div>
            <div className="collapse-content text-sm">
              Click on a camp to view full details, including the camp name,
              description, healthcare team, participant count, and registration
              requirements, ensuring you’re fully informed.
            </div>
          </div>
          <div className="collapse-arrow join-item border-base-300 collapse border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Step 4: Register for a Camp
            </div>
            <div className="collapse-content text-sm">
              Hit the “Join Camp” button to open a registration modal. Fill in
              your details, including age and emergency contact, and submit to
              secure your spot.
            </div>
          </div>
          <div className="collapse-arrow join-item border-base-300 collapse border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Step 5: Manage Your Participation
            </div>
            <div className="collapse-content text-sm">
              Track your registered camps and payment status via the Participant
              Dashboard. Update your profile or provide feedback after attending
              to enhance your experience.
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowToSection;
