const extractSkills = require("./skillExtractor");

function extractSalary(text) {

    const salaryRegex = /(\$?\d{1,3}(,\d{3})*(\s?-\s?\$?\d{1,3}(,\d{3})*)?)|(\d+\s?LPA)|₹?\d{1,3}(,\d{3})+/gi;

    const match = text.match(salaryRegex);

    return match ? match[0] : null;
}

function extractExperience(text) {

    const expRegex = /(\d+)\+?\s?(years|yrs)/i;

    const match = text.match(expRegex);

    return match ? parseInt(match[1]) : null;
}

function parseJD(text) {

    const skills = extractSkills(text);

    const salary = extractSalary(text);

    const experience = extractExperience(text);

    return {
        salary,
        experience,
        skills
    };
}

module.exports = parseJD;