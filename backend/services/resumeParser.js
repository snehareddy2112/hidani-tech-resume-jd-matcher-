import pdfParse from "pdf-parse";
import extractSkills from "./skillExtractor.js";

async function parseResume(fileBuffer) {
    const data = await pdfParse(fileBuffer);

    const text = data.text || "";

    const skills = extractSkills(text);

    return {
        resumeText: text,
        skills
    };
}

export default parseResume;