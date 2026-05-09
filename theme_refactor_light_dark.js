const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

const replacements = [
    // Backgrounds
    [/(?<!dark:)bg-\[\#0B0F15\]/g, "bg-white dark:bg-[#0B0F15]"],
    [/(?<!dark:)bg-\[\#10161F\]/g, "bg-gray-50 dark:bg-[#0f151c]"], // Made dark background slightly lighter for contrast
    [/(?<!dark:)bg-\[\#040608\]/g, "bg-[#F8F9FA] dark:bg-[#040608]"],
    
    // Text colors (Improve dark mode contrast by using lighter shades in dark mode)
    [/(?<!dark:)text-white(?!(\/|\]))/g, "text-gray-900 dark:text-white"],
    [/(?<!dark:)text-\[\#DFE6EE\]/g, "text-gray-800 dark:text-[#f8f9fa]"], // brighter white
    [/(?<!dark:)text-\[\#AABDD1\]/g, "text-gray-700 dark:text-[#DFE6EE]"], // much brighter
    [/(?<!dark:)text-\[\#7C94B0\]/g, "text-gray-600 dark:text-[#AABDD1]"], // brighter
    [/(?<!dark:)text-\[\#536B88\]/g, "text-gray-500 dark:text-[#7C94B0]"], // brighter
    
    // Borders
    [/(?<!dark:)border-\[rgba\(16,185,129,0\.15\)\]/g, "border-gray-200 dark:border-white/10"],
    [/(?<!dark:)border-\[rgba\(16,185,129,0\.1\)\]/g, "border-gray-100 dark:border-white/5"],
];

function processFile(filePath) {
    if (filePath.includes('globals.css') || filePath.includes('layout.tsx')) {
        return; // already handled
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    
    for (const [regex, newVal] of replacements) {
        newContent = newContent.replace(regex, newVal);
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
