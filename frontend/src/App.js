import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSample, setSelectedSample] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!resume || !jd) {
      alert("Upload resume and enter JD");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jd", jd);

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/match",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);
      alert("Error processing request");

    }

    setLoading(false);
  };


  const loadSample = async (sampleId) => {

    if (!sampleId) return;

    try {

      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/sample/${sampleId}`
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);
      alert("Sample not found");

    }

    setLoading(false);
  };


  return (

    <div className="container">

      <div className="card">

        <h1 className="title">Resume Matcher</h1>

        {/* SAMPLE DROPDOWN */}

        <div className="input-group">

          <label>Try Sample Test Cases (Evaluator Friendly)</label>

          <select
            value={selectedSample}
            onChange={(e) => {

              const id = e.target.value;
              setSelectedSample(id);
              loadSample(id);

            }}
          >

            <option value="">Select Sample</option>

            {[...Array(14)].map((_, i) => (

              <option key={i} value={i + 1}>
                Sample {i + 1}
              </option>

            ))}

          </select>

        </div>

        <hr style={{ margin: "25px 0", opacity: 0.3 }} />


        {/* MANUAL MODE */}

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Upload Resume</label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />

          </div>


          <div className="input-group">

            <label>Job Description</label>

            <textarea
              rows="6"
              placeholder="Paste job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />

          </div>


          <button className="btn" type="submit">

            {loading ? "Analyzing..." : "Match Resume"}

          </button>

        </form>


        {result && (

          <div className="results">

            <h2 className="score">

              Matching Score: {result.matchingJobs?.[0]?.matchingScore}%

            </h2>


            <div className="skills-section">


              <div>

                <h3>Resume Skills</h3>

                <ol>

                  {result.resumeSkills?.map((skill, i) => (

                    <li key={i}>{skill}</li>

                  ))}

                </ol>

              </div>


              <div>

                <h3>JD Skills</h3>

                <ol>

                  {result.matchingJobs?.[0]?.skillsAnalysis?.map((item, i) => (

                    <li key={i}>{item.skill}</li>

                  ))}

                </ol>

              </div>

            </div>


            <h3>Skill Analysis</h3>

            <ol>

              {result.matchingJobs?.[0]?.skillsAnalysis?.map((item, i) => (

                <li key={i}>

                  {item.skill} —

                  <span className={item.presentInResume ? "present" : "missing"}>

                    {item.presentInResume ? " Present" : " Missing"}

                  </span>

                </li>

              ))}

            </ol>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;