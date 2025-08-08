import EmptyState from "../../components/Shared/EmptyState";
import Container from "../../components/Shared/Container";
import AvailableCampCard from "./AvailableCampCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const AvailableCamps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [threeColLayout, setThreeColLayout] = useState(true);

  const { data: camps, isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/camps`);
      return data;
    },
  });
  console.log(camps);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const filteredCamps = camps?.filter((camp) => {
    const search = searchTerm.toLowerCase().trim();
    const campDate = new Date(camp.dateTime).toISOString().slice(0, 10);
    return (
      camp.name.toLowerCase().includes(search) ||
      camp.healthcareProfessional.toLowerCase().includes(search) ||
      camp.location.toLowerCase().includes(search) ||
      campDate.includes(search)
    );
  });

  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "fee") {
      return a.campFee - b.campFee;
    }
    if (sortBy === "popular") {
      return (b.participantCount || 0) - (a.participantCount || 0);
    }
    return 0;
  });

  return (
    <Container>
      <div>
        <h2 className="text-primary font-gummy text-center text-4xl font-bold md:text-5xl">
          Popular Medical Camps
        </h2>

        <div className="mt-10 flex justify-between">
          <label className="input bg-base-200">
            <FaSearch />
            <input
              type="search"
              required
              value={searchTerm}
              placeholder="Name, date, doctor or location"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          <div className="flex gap-5">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                {sortBy ? `Sorted by ${sortBy}` : "Sort By"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a onClick={() => setSortBy("name")}>Alphabetical Order</a>
                </li>
                <li>
                  <a onClick={() => setSortBy("fee")}>Camp Fee</a>
                </li>
                <li>
                  <a onClick={() => setSortBy("popular")}>Most Registered</a>
                </li>
              </ul>
            </div>

            <button
              className="btn mt-1"
              onClick={() => setThreeColLayout(!threeColLayout)}
            >
              {threeColLayout ? "Switch to 2 Columns" : "Switch to 3 Columns"}
            </button>
          </div>
        </div>

        {sortedCamps.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-8 pt-12 ${threeColLayout ? "md:grid-cols-3" : "md:grid-cols-2"} `}
          >
            {sortedCamps.map((camp) => (
              <AvailableCampCard key={camp._id} camp={camp} />
            ))}
          </div>
        ) : (
          <EmptyState message={"No camp data available!"} />
        )}
      </div>
    </Container>
  );
};

export default AvailableCamps;
