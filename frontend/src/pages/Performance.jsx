import PerformanceStats from "../components/performance/PerformanceStats";
import RatingChart from "../components/performance/RatingChart";
import ReviewsTable from "../components/performance/ReviewsTable";
import "../components/performance/performance.css";

const Performance = () => {
  return (
    <>
      <div className="page-header">
        <h1>Performance Reviews</h1>
        <p>Team ratings and review management</p>
      </div>

      <PerformanceStats />

      <RatingChart />

      <ReviewsTable />
    </>
  );
};

export default Performance;