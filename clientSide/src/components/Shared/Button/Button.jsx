import React from "react";

const Button = ({ label, onClick, disabled, sm, accent, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${sm ? "btn-sm" : ""} ${accent ? "btn-accent" : "btn-primary"} ${disabled ? "btn-disabled" : ""} `}
    >
      {Icon && <Icon size={24} className="absolute top-3 left-4" />}
      {label}
    </button>
  );
};

export default Button;
