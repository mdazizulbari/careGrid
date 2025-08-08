import { Link } from "react-router";
import Button from "./Button/Button";

const EmptyState = ({ message, address, label }) => {
  return (
    <div className="flex py-50 flex-col items-center justify-center gap-5">
      <p className="text-xl lg:text-3xl">{message}</p>
      {address && (
        <Link to={address}>
          <Button label={label} />
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
