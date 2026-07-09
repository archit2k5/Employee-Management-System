import RecruitmentStats from "../components/recruitment/RecruitmentStats";
import JobOpenings from "../components/recruitment/JobOpenings";
import CandidatePipeline from "../components/recruitment/CandidatePipeline";
import "../components/recruitment/recruitment.css";

const Recruitment = () => {
  return (
    <>
      <div className="page-header employee-header">
        <div>
          <h1>Recruitment</h1>
          <p>Job openings and candidate pipeline</p>
        </div>

        <button className="add-btn">
          + Post Job
        </button>
      </div>

      <RecruitmentStats />

      <JobOpenings />

      <CandidatePipeline />

    </>
  );
};

export default Recruitment;