import "./PerformanceChart.css";

export default function ScoreCard({ data }) {
  return (
    <div className="score-list">
      {data.map((item) => (
        <div
          className="score-item"
          key={item.category}
        >
          <div className="score-header">
            <span>{item.category}</span>
            <span>{item.score}</span>
          </div>

          <div className="score-track">
            <div
              className="score-fill"
              style={{
                width: `${item.score}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}