const express = require("express");
const multer = require("multer");

const parseResume = require("../services/resumeParser");
const parseJD = require("../services/jdParser");
const { analyzeSkills, calculateMatchingScore } = require("../services/matcher");

const router = express.Router();

/* configure multer for file upload */

const upload = multer();

/* API endpoint */

router.post("/match", upload.single("resume"), async (req, res) => {

    try {

        const jdText = req.body.jd;

        const resumeBuffer = req.file.buffer;

        /* parse resume */

        const resumeData = await parseResume(resumeBuffer);

        /* parse job description */

        const jdData = parseJD(jdText);

        /* skill comparison */

        const skillAnalysis = analyzeSkills(resumeData.skills, jdData.skills);

        const matchingScore = calculateMatchingScore(
            resumeData.skills,
            jdData.skills
        );

        /* final response */

        res.json({
            resumeSkills: resumeData.skills,
            jdSkills: jdData.skills,
            salary: jdData.salary,
            experience: jdData.experience,
            skillsAnalysis: skillAnalysis,
            matchingScore
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error processing request"
        });

    }

});

module.exports = router;