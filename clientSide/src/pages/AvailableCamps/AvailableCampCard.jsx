import React from "react";
import { Link } from "react-router";

const AvailableCampCard = ({ camp }) => {
  const {
    name,
    campImage,
    dateTime,
    location,
    healthcareProfessional,
    participantCount,
    description,
    _id,
  } = camp || {};
  return (
    <Link
      to={`/camp-details/${_id}`}
      className="card bg-base-200 transition ease-in-out hover:scale-95"
    >
      <figure>
        <img src={campImage} className="h-50 w-full object-cover" alt={name} />
      </figure>
      <div className="card-body">
        <p>{healthcareProfessional}</p>
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary text-nowrap">
            {participantCount} Joined
          </div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{location}</div>
          <div className="badge badge-outline">{dateTime}</div>
        </div>
        <button className="btn btn-soft btn-primary mt-2">Learn More</button>
      </div>
    </Link>
  );
};

export default AvailableCampCard;
