import {
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiAward,
} from "react-icons/fi";

import RecruitmentCard from "./RecruitmentCard";

const RecruitmentStats = () => {

  return (

    <div className="stats-grid">

      <RecruitmentCard
        title="OPEN ROLES"
        value="4"
        icon={<FiBriefcase />}
        iconColor="#3B82F6"
        iconBg="rgba(59,130,246,.15)"
      />

      <RecruitmentCard
        title="TOTAL CANDIDATES"
        value="41"
        icon={<FiUsers />}
        iconColor="#A855F7"
        iconBg="rgba(168,85,247,.15)"
      />

      <RecruitmentCard
        title="INTERVIEWS THIS WEEK"
        value="6"
        icon={<FiCalendar />}
        iconColor="#06B6D4"
        iconBg="rgba(6,182,212,.15)"
      />

      <RecruitmentCard
        title="OFFERS EXTENDED"
        value="2"
        icon={<FiAward />}
        iconColor="#10B981"
        iconBg="rgba(16,185,129,.15)"
      />

    </div>

  );

};

export default RecruitmentStats;