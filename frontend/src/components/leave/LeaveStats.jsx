import {
    FiClock,
    FiCheckCircle,
    FiXCircle
} from "react-icons/fi";

import LeaveStatCard from "./LeaveStatCard";

const LeaveStats = () => {

    return (

        <div className="leave-stats">

            <LeaveStatCard
                title="PENDING"
                value="3"
                icon={<FiClock />}
                bg="#3a2e0b"
                color="#FACC15"
            />

            <LeaveStatCard
                title="APPROVED THIS MONTH"
                value="12"
                icon={<FiCheckCircle />}
                bg="#063d35"
                color="#10B981"
            />

            <LeaveStatCard
                title="REJECTED"
                value="2"
                icon={<FiXCircle />}
                bg="#3f1820"
                color="#EF4444"
            />

        </div>

    )

}

export default LeaveStats;