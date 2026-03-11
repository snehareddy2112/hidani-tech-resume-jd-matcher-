
Resume–Job Description Matching System

A full-stack application that analyzes a candidate’s resume against a job description and calculates a matching score based on required skills.

The system parses resumes (PDF), extracts skills, compares them with job description requirements, and returns a structured JSON result including skill analysis and matching percentage.

---

Live Demo

Frontend
https://hidani-tech-resume-jd-matcher.vercel.app

Backend API
https://hidani-tech-resume-jd-matcher.onrender.com

Example API test

https://hidani-tech-resume-jd-matcher.onrender.com/api/sample/1
https://hidani-tech-ressume-jd-matcher.onrender.com/api/sample/2

----
https://hidani-tech-resume-jd-matcher.onrender.com/api/sample/13


Note: The backend is hosted on Render free tier and may take a few seconds to wake up on the first request.

---

Features

• Resume parsing from PDF files
• Job description parsing
• Skill extraction using skill dictionary and aliases
• Resume vs Job Description skill comparison
• Matching score calculation
• REST API for resume matching
• Predefined sample test cases (1–14)
• React UI for manual testing
• Evaluator-friendly sample dropdown testing

---

Tech Stack

Backend

Node.js
Express.js
pdf-parse
Multer
JavaScript (ES Modules)

Frontend

React
Axios
CSS

Deployment

Render (Backend API)
Vercel (Frontend)

---

Project Structure

hidani-tech-resume-jd-matcher
│
├── backend
│   ├── routes
│   │   ├── matchRoutes.js
│   │   └── sampleRoutes.js
│   │
│   ├── services
│   │   ├── resumeParser.js
│   │   ├── jdParser.js
│   │   └── matcher.js
│   │
│   ├── utils
│   │   └── Skills.js
│   │
│   ├── samples
│   │   ├── sample1
│   │   │   ├── resume.pdf
│   │   │   └── jd.txt
│   │   └── sample14
│   │
│   └── app.js
│
└── frontend
    ├── src
    │   ├── App.js
    │   └── App.css

---

How It Works

1. Resume PDF is uploaded
2. Text is extracted using pdf-parse
3. Skills are detected from a predefined skill dictionary
4. Job description skills are extracted
5. Skills are compared
6. Matching score is calculated

Matching formula:

Matching Score = (Matched Skills / Total JD Skills) × 100

---

Setup Instructions

1 Clone Repository

git clone https://github.com/snehareddy2112/hidani-tech-resume-jd-matcher.git
cd hidani-tech-resume-jd-matcher

---

Backend Setup

Navigate to backend folder

cd backend

Install dependencies

npm install

Start backend server

npm run dev

Backend runs on

http://localhost:5000

---

Frontend Setup

Navigate to frontend folder

cd frontend

Install dependencies

npm install

Start React app

npm start

Frontend runs on

http://localhost:3000

---

API Endpoints

Resume Matching

Upload resume and job description

POST /api/match

Request

Form Data

resume : PDF file
jd     : Job description text

Response Example

{
 "name": "Candidate",
 "salary": "12 LPA",
 "yearOfExperience": 3,
 "resumeSkills": ["React","Node.js"],
 "matchingJobs": [
  {
   "jobId": "JD001",
   "role": "Backend Developer",
   "aboutRole": "Role extracted from job description",
   "skillsAnalysis": [
    {"skill":"Java","presentInResume":false},
    {"skill":"MongoDB","presentInResume":true}
   ],
   "matchingScore": 50
  }
 ]
}

---

Sample Testing Endpoints

To simplify evaluation, predefined sample test cases are included.

GET /api/sample/:id

Examples

/api/sample/1
/api/sample/2
...
/api/sample/14

Each sample contains

resume.pdf
jd.txt

---

UI Usage

The React interface supports two modes.

Manual Mode

Upload resume and paste job description

Steps

Upload Resume
Paste Job Description
Click Match Resume

---

Sample Testing Mode

Evaluator can quickly test predefined cases.

Steps

Select Sample 1–14 from dropdown.

The system automatically runs the matching process.
