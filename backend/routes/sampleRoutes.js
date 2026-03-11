import express from "express";
import fs from "fs";
import path from "path";

import parseResume from "../services/resumeParser.js";
import parseJD from "../services/jdParser.js";
import { analyzeSkills, calculateMatchingScore } from "../services/matcher.js";

const router = express.Router();

router.get("/sample/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const resumePath = path.join(
      process.cwd(),
      "samples",
      `sample${id}`,
      "resume.pdf"
    );

    const jdPath = path.join(
      process.cwd(),
      "samples",
      `sample${id}`,
      "jd.txt"
    );

    if (!fs.existsSync(resumePath) || !fs.existsSync(jdPath)) {

      return res.status(404).json({
        error: "Sample files not found"
      });

    }

    const resumeBuffer = fs.readFileSync(resumePath);
    const jdText = fs.readFileSync(jdPath, "utf8");

    const resumeData = await parseResume(resumeBuffer);
    const jdData = parseJD(jdText);

    const skillsAnalysis = analyzeSkills(
      resumeData.skills,
      jdData.skills
    );

    const matchingScore = calculateMatchingScore(
      resumeData.skills,
      jdData.skills
    );

    res.json({

      name: resumeData.name || "Candidate",
      salary: jdData.salary || null,
      yearOfExperience: jdData.experience || null,

      resumeSkills: resumeData.skills,

      matchingJobs: [
        {
          jobId: `JD${String(id).padStart(3, "0")}`,
          role: jdData.role || "Software Engineer",
          aboutRole:
            jdData.aboutRole || "Role extracted from job description",

          skillsAnalysis: skillsAnalysis,
          matchingScore: matchingScore
        }
      ]

    });

  } catch (error) {

    console.error("Sample processing error:", error);

    res.status(500).json({
      error: "Failed to process sample"
    });

  }

});

export default router;