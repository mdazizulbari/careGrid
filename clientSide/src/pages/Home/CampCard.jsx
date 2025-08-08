import React from "react";
import { Link } from "react-router";

const CampCard = ({ camp }) => {
  const {
    name,
    campFee,
    campImage,
    dateTime,
    location,
    healthcareProfessional,
    participantCount,
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
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary text-nowrap">{campFee}$</div>
        </h2>
        <p>{healthcareProfessional}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {participantCount} participants
          </div>
          <div className="badge badge-outline">{location}</div>
          <div className="badge badge-outline">{dateTime}</div>
        </div>
        <button className="btn btn-soft btn-primary mt-2">Learn More</button>
      </div>
    </Link>
  );
};

export default CampCard;
