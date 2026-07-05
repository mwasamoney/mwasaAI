/**
 * rebrand.js  (v2 - SALAMA)
 * -----------------------------------------------------------------
 * v1 ilikuwa na hitilafu: ilibadilisha maneno kama "adams" hata
 * palipokuwa jina la variable ndani ya code (const adams = ...),
 * na kuvunja bot. v2 hii inabadilisha TU misemo ya "credit/branding"
 * (yenye nafasi au hyphen — ambayo haiwezi kamwe kuwa jina la
 * variable kwenye JavaScript), hivyo haiwezi kuvunja code.
 *
 * HAIGUSI: majina ya variable ndani ya code, wala link za huduma za
 * nje (kama tovuti za session/pairing za mwandishi wa awali) - hizo
 * zikibadilishwa kwa maandishi tu zitavunjika kwa sababu si zako.
 *
 * JINSI YA KUTUMIA:
 *   1. Jaza MY_INFO hapa chini.
 *   2. node rebrand.js
 *   3. node -c mwasaAI.js   (ithibitishe hakuna error kabla ya deploy)
 * -----------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

// ============ 1. JAZA TAARIFA ZAKO HAPA ============
const MY_INFO = {
    botName: "mwasaAI",
    ownerName: "Gooodluck Mwasangwale",
    ownerNumber: "255757055233",
    menuImage: "https://i.ibb.co/tVf39xL/mwasaai.png",
    githubRepo: "https://github.com/YOUR-GITHUB-USERNAME/mwasaAI",
};
// =====================================================

// ============ 2. MISEMO SALAMA YA KUBADILISHA ============
// Kila kimoja kina NAFASI au HYPHEN (-) ndani yake -> haiwezi kuwa
// jina la variable ya JS, hivyo ni salama kubadilisha popote.
const REPLACEMENTS = [
    ["CRISS VEVO", MY_INFO.botName],
    ["Criss Vevo", MY_INFO.botName],
    ["criss vevo", MY_INFO.botName],
    ["CRISS-VMD", MY_INFO.botName],
    ["Criss-VMd", MY_INFO.botName],
    ["criss-VMd", MY_INFO.botName],
    ["Ibrahim Adams", MY_INFO.ownerName],
    ["IBRAHIM ADAMS", MY_INFO.ownerName.toUpperCase()],
    ["ibrahim adams", MY_INFO.ownerName.toLowerCase()],
    ["Ibrahim adams", MY_INFO.ownerName],
    ["Ibrahim-tech", MY_INFO.botName],
    ["BMW MD", MY_INFO.botName],
    ["BMW-MD", MY_INFO.botName],
    ["Bmw-MD", MY_INFO.botName],
    ["Bmw-Md", MY_INFO.botName],
    ["Bmw-md", MY_INFO.botName],
    ["bmw-md-boy", MY_INFO.botName],
    ["bmw-md", MY_INFO.botName],
    ["BELTAH-MD", MY_INFO.botName],

    // --- Majina mengine ya "DEV2" / waandishi wenza / credit lines ---
    ["MR Anyaway", MY_INFO.ownerName],
    ["mr anyway", MY_INFO.ownerName.toLowerCase()],
    ["Anyway-md", MY_INFO.botName],
    ["Anyway-MD", MY_INFO.botName],
    ["anyway-Md", MY_INFO.botName],
    ["Anyway-Md", MY_INFO.botName],
    ["ANYWAY-MD-WABOT", MY_INFO.botName],
    ["ANYWAY-MD-V1", MY_INFO.botName],
    ["ANYWAY-MD", MY_INFO.botName],
    ["Anyway Tech", MY_INFO.botName],
    ["Zokou-MD", MY_INFO.botName],
    ["criss projects", MY_INFO.ownerName],
    ["Criss Tech", MY_INFO.botName],
    ["criss Tech", MY_INFO.botName],
    ["criss tech", MY_INFO.ownerName],
    ["crisstech", MY_INFO.ownerName],
    ["Baraka Bega", MY_INFO.ownerName],
    ["MRHRTZ", MY_INFO.ownerName],
    ["ibrahimada", MY_INFO.ownerName.toLowerCase()],
    ["254710772666", MY_INFO.ownerNumber],
    ["https://github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS-INFO", MY_INFO.githubRepo],
    ["github.com/IBRAHIM-TECH-AI/IBRAHIM-ADAMS-INFO", MY_INFO.githubRepo.replace("https://", "")],

    // --- Namba na link za picha ---
    ["255687068672", MY_INFO.ownerNumber],
    ["https://files.catbox.moe/a7p6tw.jpg", MY_INFO.menuImage],
    ["https://telegra.ph/file/17c83719a1b40e02971e4.jpg", MY_INFO.menuImage],
    ["https://github.com/criss-vevo/CRISS-VMD", MY_INFO.githubRepo],

    // --- Link za channel/group/telegram za mwandishi wa awali (zinamtangaza yeye, siyo wewe) ---
    ["https://whatsapp.com/channel/0029Vb0HIV2G3R3s2II4181g", "https://whatsapp.com/channel/WEKA-LINK-YAKO-HAPA"],
    ["whatsapp.com/channel/0029Vb0HIV2G3R3s2II4181g", "whatsapp.com/channel/WEKA-LINK-YAKO-HAPA"],
    ["https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y", "https://whatsapp.com/channel/WEKA-LINK-YAKO-HAPA"],
    ["whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y", "whatsapp.com/channel/WEKA-LINK-YAKO-HAPA"],
    ["https://chat.whatsapp.com/Lh5EQEYJn5VIa4atNRPBm5", "https://chat.whatsapp.com/WEKA-LINK-YAKO-HAPA"],
    ["chat.whatsapp.com/Lh5EQEYJn5VIa4atNRPBm5", "chat.whatsapp.com/WEKA-LINK-YAKO-HAPA"],
    ["https://youtube.com/@criss_vevo?si=Va1vaZrdlfok0SWP", "https://youtube.com/@WEKA-CHANNEL-YAKO"],
    ["youtube.com/@criss_vevo", "youtube.com/@WEKA-CHANNEL-YAKO"],
    ["https://t.me/ibrahimtechai", "https://t.me/WEKA-CHANNEL-YAKO"],
    ["t.me/ibrahimtechai", "t.me/WEKA-CHANNEL-YAKO"],
];
// =====================================================

const ROOT_DIR = __dirname;
const INCLUDE_EXT = [".js", ".json", ".md"];
const EXCLUDE_DIRS = ["node_modules", ".git", "auth"];
const EXCLUDE_FILES = ["rebrand.js"]; // usijibadilishe mwenyewe

function walk(dir, fileList = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (EXCLUDE_DIRS.includes(entry.name) || EXCLUDE_FILES.includes(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(fullPath, fileList);
        else if (INCLUDE_EXT.some((ext) => entry.name.endsWith(ext))) fileList.push(fullPath);
    }
    return fileList;
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rebrandFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    const original = content;
    for (const [oldVal, newVal] of REPLACEMENTS) {
        content = content.replace(new RegExp(escapeRegExp(oldVal), "g"), newVal);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, "utf8");
        return true;
    }
    return false;
}

console.log("🔄 Inatafuta faili za kubadilisha branding (njia salama)...\n");
let changed = 0;
for (const file of walk(ROOT_DIR)) {
    if (rebrandFile(file)) {
        changed++;
        console.log("✅ " + path.relative(ROOT_DIR, file));
    }
}
console.log(`\n🎉 Faili ${changed} zimebadilishwa.`);
console.log("👉 Sasa endesha: node -c mwasaAI.js   (kuthibitisha code bado ni sahihi)");
