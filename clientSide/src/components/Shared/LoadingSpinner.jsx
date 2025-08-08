import { ScaleLoader, SyncLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"} text-primary flex flex-col items-center justify-center`}
    >
      <ScaleLoader
        height={100} // Controls the height of the bars
        width={12} // Controls the width of each bar
        radius={100} // Optional: Adjusts bar roundness
        margin={2} // Optional: Space between bars
        color="cyan"
      />
    </div>
  );
};

export default LoadingSpinner;
