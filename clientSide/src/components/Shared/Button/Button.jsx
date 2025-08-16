import React from "react";

const Button = ({ label, onClick, disabled, sm, outline, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-primary ${outline ? "btn-outline" : ""} ${sm ? "btn-sm" : ""}${disabled ? "btn-disabled" : ""} `}
    >
      {Icon && <Icon size={24} className="absolute top-3 left-4" />}
      {label}
    </button>
  );
};

export default Button;
