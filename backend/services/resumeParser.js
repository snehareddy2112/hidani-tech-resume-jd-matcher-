const pdfParse = require("pdf-parse");
const extractSkills = require("./skillExtractor");

async function parseResume(fileBuffer) {

    const data = await pdfParse(fileBuffer);

    const text = data.text;

    const skills = extractSkills(text);

    return {
        resumeText: text,
        skills
    };
}

module.exports = parseResume;