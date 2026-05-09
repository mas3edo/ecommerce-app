const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

const replacements = [
    // 1. Remove Orange
    [/orange-50/g, "emerald-50"],
    [/orange-100/g, "emerald-100"],
    [/orange-200/g, "emerald-200"],
    [/orange-300/g, "emerald-300"],
    [/orange-400/g, "emerald-400"],
    [/orange-500/g, "emerald-500"],
    [/orange-600/g, "emerald-600"],
    [/orange-700/g, "emerald-700"],
    [/orange-800/g, "emerald-800"],
    [/orange-900/g, "emerald-900"],
    [/orange-950/g, "emerald-950"],
    [/#ea580c/gi, "#10B981"], // emerald-500
    [/#c2410c/gi, "#059669"], // emerald-600
    [/#fed7aa/gi, "#a7f3d0"], // emerald-200

    // 2. Fix Light Mode Contrast ("too much white")
    // Sections that became bg-[#F8F9FA] (which is gray-50) blend in with the body.
    // Make them pure white to stand out, and add stronger borders.
    [/(?<!dark:)bg-\[\#F8F9FA\]/g, "bg-white"],
    [/(?<!dark:)bg-gray-50(?!0)/g, "bg-white"], // change bg-gray-50 to bg-white for cards, except body is still gray-50 in layout.tsx
    
    // Strengthen borders in light mode for better card separation
    [/(?<!dark:)border-gray-100/g, "border-gray-200"],
    [/(?<!dark:)border-slate-100/g, "border-gray-200"],
];

function processFile(filePath) {
    if (filePath.includes('globals.css')) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    
    for (const [regex, newVal] of replacements) {
        newContent = newContent.replace(regex, newVal);
    }
    
    // Special fix for layout.tsx so body stays bg-gray-50
    if (filePath.includes('layout.tsx')) {
        newContent = newContent.replace(/bg-white text-gray-900 dark:bg-\[\#040608\]/, "bg-gray-50 text-gray-900 dark:bg-[#040608]");
    }
    
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (stat.isFile() && /\.(jsx|tsx|js|ts)$/.test(file)) {
            processFile(fullPath);
        }
    }
}

walkDir(appDir);
console.log("Done!");
