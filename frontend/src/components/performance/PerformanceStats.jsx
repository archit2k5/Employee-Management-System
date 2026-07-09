import {
FiClock,
FiCheckCircle,
FiStar,
FiCalendar
} from "react-icons/fi";

import PerformanceCard from "./PerformanceCard";

const PerformanceStats = () => {

return(

<div className="stats-grid">

<PerformanceCard
title="REVIEWS PENDING"
value="8"
icon={<FiClock/>}
iconColor="#FACC15"
iconBg="rgba(250,204,21,.15)"
/>

<PerformanceCard
title="COMPLETED"
value="94"
icon={<FiCheckCircle/>}
iconColor="#10B981"
iconBg="rgba(16,185,129,.15)"
/>

<PerformanceCard
title="TEAM AVG RATING"
value="4.1"
icon={<FiStar/>}
iconColor="#3B82F6"
iconBg="rgba(59,130,246,.15)"
/>

<PerformanceCard
title="NEXT CYCLE"
value="Oct 1"
icon={<FiCalendar/>}
iconColor="#A855F7"
iconBg="rgba(168,85,247,.15)"
/>

</div>

)

}

export default PerformanceStats;