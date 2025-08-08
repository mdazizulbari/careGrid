import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import ParticipantStatistics from "../Statistics/ParticipantStatistics";
import OrganizerStatistics from "../Statistics/OrganizerStatistics";

const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div>
      {role === "participant" && <ParticipantStatistics />}
      {role === "organizer" && <OrganizerStatistics />}
    </div>
  );
};

export default Statistics;
