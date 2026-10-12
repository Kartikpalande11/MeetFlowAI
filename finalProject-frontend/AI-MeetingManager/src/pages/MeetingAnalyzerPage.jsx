import MeetingAnalyzer
  from "../components/MeetingAnalyzer";

function MeetingAnalyzerPage({
  addAiTask
}) {

  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>
            Meeting Analyzer
          </h1>

          <p>
            Convert your meeting discussion
            into actionable tasks using AI.
          </p>

        </div>

      </div>


      <MeetingAnalyzer
        addAiTask={addAiTask}
      />

    </div>
  );
}

export default MeetingAnalyzerPage;