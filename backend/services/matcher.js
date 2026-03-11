function analyzeSkills(resumeSkills, jdSkills) {

    const analysis = jdSkills.map(skill => {
        return {
            skill,
            presentInResume: resumeSkills.includes(skill)
        };
    });

    return analysis;
}

function calculateMatchingScore(resumeSkills, jdSkills) {

    if (jdSkills.length === 0) return 0;

    const matchedSkills = jdSkills.filter(skill =>
        resumeSkills.includes(skill)
    );

    const score = (matchedSkills.length / jdSkills.length) * 100;

    return Math.round(score);
}

module.exports = {
    analyzeSkills,
    calculateMatchingScore
};