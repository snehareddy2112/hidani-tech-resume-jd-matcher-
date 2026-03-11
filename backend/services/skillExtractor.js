const SKILLS = require("../utils/skills");

function extractSkills(text) {

    if (!text) return [];

    const foundSkills = [];

    const normalizedText = text.toLowerCase();

    SKILLS.forEach(skill => {

        const skillLower = skill.toLowerCase();

        const regex = new RegExp(`\\b${skillLower}\\b`, "i");

        if (regex.test(normalizedText)) {
            foundSkills.push(skill);
        }

    });

    return foundSkills;
}

module.exports = extractSkills;