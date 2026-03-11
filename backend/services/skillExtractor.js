import { SKILLS, SKILL_ALIASES } from "../utils/Skills.js";

function extractSkills(text) {

    if (!text) return [];

    const foundSkills = new Set();

    // Normalize text to handle punctuation issues
    const normalizedText = text
        .toLowerCase()
        .replace(/[^a-z0-9+#.]/g, " ");

    /* =========================
       Match canonical skills
       ========================= */

    SKILLS.forEach(skill => {

        const escapedSkill = skill
            .toLowerCase()
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(`\\b${escapedSkill}\\b`, "i");

        if (regex.test(normalizedText)) {
            foundSkills.add(skill);
        }

    });

    /* =========================
       Match alias skills
       ========================= */

    Object.entries(SKILL_ALIASES).forEach(([alias, realSkill]) => {

        const escapedAlias = alias
            .toLowerCase()
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(`\\b${escapedAlias}\\b`, "i");

        if (regex.test(normalizedText)) {
            foundSkills.add(realSkill);
        }

    });

    return [...foundSkills];
}

export default extractSkills;