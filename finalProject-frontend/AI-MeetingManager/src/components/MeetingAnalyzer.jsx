import { useState } from "react";
import { analyzeMeeting as analyzeMeetingApi } from "../api/meetingApi";


// =====================================================
// DATE / DEADLINE HANDLING
// =====================================================

const formatDate = (date) => {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


const convertDeadlineToDate = (deadline) => {

    if (!deadline) {
        return null;
    }

    const text =
        deadline
            .toString()
            .trim()
            .toLowerCase();

    console.log(
        "Converting AI deadline:",
        deadline
    );


    // =================================================
    // 1. ALREADY YYYY-MM-DD
    // =================================================

    if (
        /^\d{4}-\d{2}-\d{2}$/.test(text)
    ) {

        console.log(
            "Deadline is already a valid date:",
            text
        );

        return text;
    }


    // =================================================
    // 2. TODAY
    // =================================================

    if (text === "today") {

        const today =
            new Date();

        const result =
            formatDate(today);

        console.log(
            "Converted today to:",
            result
        );

        return result;
    }


    // =================================================
    // 3. TOMORROW
    // =================================================

    if (text === "tomorrow") {

        const tomorrow =
            new Date();

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const result =
            formatDate(tomorrow);

        console.log(
            "Converted tomorrow to:",
            result
        );

        return result;
    }


    // =================================================
    // 4. WEEKDAY HANDLING
    // =================================================

    const weekdays = {

        sunday: 0,

        monday: 1,

        tuesday: 2,

        wednesday: 3,

        thursday: 4,

        friday: 5,

        saturday: 6

    };


    if (
        Object.prototype.hasOwnProperty.call(
            weekdays,
            text
        )
    ) {

        const today =
            new Date();

        const currentDay =
            today.getDay();

        const targetDay =
            weekdays[text];

        let daysToAdd =
            targetDay - currentDay;


        // If the target day is today
        // or already passed, use next week.

        if (daysToAdd <= 0) {

            daysToAdd += 7;

        }


        const resultDate =
            new Date(today);

        resultDate.setDate(
            today.getDate() + daysToAdd
        );


        const result =
            formatDate(resultDate);


        console.log(
            `Converted ${deadline} to:`,
            result
        );


        return result;
    }


    // =================================================
    // 5. NORMAL DATE STRING
    // =================================================

    const parsedDate =
        new Date(deadline);


    if (
        !isNaN(
            parsedDate.getTime()
        )
    ) {

        const result =
            formatDate(parsedDate);


        console.log(
            "Converted normal date to:",
            result
        );


        return result;
    }


    // =================================================
    // 6. UNKNOWN DEADLINE
    // =================================================

    console.warn(
        "Could not convert deadline:",
        deadline
    );


    return null;
};


// =====================================================
// MEETING ANALYZER
// =====================================================

function MeetingAnalyzer({ addAiTask }) {

  const [meetingTitle, setMeetingTitle] =
    useState("");

  const [meetingText, setMeetingText] =
    useState("");

  const [aiResult, setAiResult] =
    useState(null);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);


  // =====================================================
  // ANALYZE MEETING
  // =====================================================

  const handleAnalyzeMeeting = async () => {

    if (!meetingTitle.trim()) {

      alert("Please enter meeting title.");

      return;
    }

    if (!meetingText.trim()) {

      alert("Please enter meeting notes.");

      return;
    }


    setIsAnalyzing(true);


    try {

      const result =
        await analyzeMeetingApi(
          meetingTitle,
          meetingText
        );


      console.log(
        "AI MEETING RESULT:",
        result
      );


      setAiResult(result);


    } catch (error) {

      console.error(
        "Meeting analysis error:",
        error
      );

      alert(
        "Failed to analyze meeting. Please try again."
      );


    } finally {

      setIsAnalyzing(false);

    }
  };


  // =====================================================
  // ADD ALL TASKS
  // =====================================================

  const addAllTasks = () => {

    if (!aiResult) {
      return;
    }

    aiResult.actionItems.forEach(
      (item) => {

        addAiTask(item);

      }
    );

    alert(
      "All action items added to Tasks."
    );
  };


  // =====================================================
  // RESET ANALYZER
  // =====================================================

  const resetAnalyzer = () => {

    setMeetingTitle("");

    setMeetingText("");

    setAiResult(null);

  };


  // =====================================================
  // ANALYZER SCREEN
  // =====================================================

  if (!aiResult) {

    return (

      <div className="meeting-wrapper">

        <div className="meeting-card">

          {/* HEADER */}

          <div className="meeting-header">

            <div className="ai-large-icon">
              🤖
            </div>

            <div>

              <h1>
                AI Meeting Analyzer
              </h1>

              <p>
                Convert your meeting discussion
                into a summary and actionable tasks.
              </p>

            </div>

          </div>


          {/* MEETING TITLE */}

          <div className="meeting-form-group">

            <label>
              Meeting Title
            </label>

            <input
              type="text"
              className="meeting-input"
              placeholder="Example: Weekly Project Meeting"
              value={meetingTitle}
              onChange={(event) =>
                setMeetingTitle(
                  event.target.value
                )
              }
            />

          </div>


          {/* MEETING NOTES */}

          <div className="meeting-form-group">

            <div className="textarea-header">

              <label>
                Meeting Notes
              </label>

              <span>
                {meetingText.length} characters
              </span>

            </div>


            <textarea
              className="meeting-textarea"
              placeholder="Paste your meeting notes here...

Example:

Today we discussed the new e-commerce project.

Rahul will complete the database by Monday.

Amit will create the login page by Tuesday.

Priya will test the application by Wednesday."
              value={meetingText}
              onChange={(event) =>
                setMeetingText(
                  event.target.value
                )
              }
            />

          </div>


          {/* ANALYZE BUTTON */}

          <button
            className="analyze-btn"
            onClick={handleAnalyzeMeeting}
            disabled={isAnalyzing}
          >

            {isAnalyzing ? (
              <>
                ⏳ Analyzing Meeting...
              </>
            ) : (
              <>
                ✨ Analyze Meeting
              </>
            )}

          </button>


          {/* EXAMPLE */}

          <div className="example-box">

            <span>
              💡
            </span>

            <div>

              <strong>
                How it works
              </strong>

              <p>
                Paste your meeting notes and our AI
                will identify the important discussion
                points and convert action items into
                tasks.
              </p>

            </div>

          </div>

        </div>

      </div>

    );
  }


  // =====================================================
  // RESULT SCREEN
  // =====================================================

  return (

    <div className="meeting-wrapper">

      <div className="ai-result-card">


        {/* RESULT HEADER */}

        <div className="result-title">

          <div className="ai-large-icon">
            ✨
          </div>

          <div>

            <h1>
              AI Analysis Result
            </h1>

            <p>
              {meetingTitle}
            </p>

          </div>

        </div>


        {/* SUMMARY */}

        <div className="summary-box">

          <h3>
            📋 Meeting Summary
          </h3>

          <p>
            {aiResult.summary}
          </p>

        </div>


        {/* KEY POINTS */}

        <div className="key-points-box">

          <h3>
            💡 Key Discussion Points
          </h3>

          <ul>

            {aiResult.keyPoints.map(
              (point, index) => (

                <li key={index}>
                  {point}
                </li>

              )
            )}

          </ul>

        </div>


        {/* ACTION ITEMS */}

        <div className="action-section">

          <div className="action-section-header">

            <div>

              <h3>
                ✨ Action Items
              </h3>

              <p>
                Tasks identified from this meeting
              </p>

            </div>


            <button
              className="add-all-btn"
              onClick={addAllTasks}
            >
              + Add All Tasks
            </button>

          </div>


          {aiResult.actionItems.map(
            (item) => (

              <div
                className="action-item"
                key={item.id}
              >

                <div className="person-avatar">

                  {item.person.charAt(0)}

                </div>


                <div className="action-info">

                  <strong>
                    {item.person}
                  </strong>

                  <span>
                    {item.task}
                  </span>

                </div>


                <div className="action-deadline">

                  📅 {item.deadline || "No deadline"}

                </div>


                <button
                  className="add-task-small"
                  onClick={() =>
                    addAiTask(item)
                  }
                >
                  Add to Tasks
                </button>

              </div>

            )
          )}

        </div>


        {/* BOTTOM BUTTONS */}

        <div className="result-actions">

          <button
            className="back-btn"
            onClick={resetAnalyzer}
          >
            ← Analyze Another Meeting
          </button>

        </div>

      </div>

    </div>

  );
}

export default MeetingAnalyzer;