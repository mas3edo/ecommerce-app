const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

const replacements = {
    // Gradients & brand colors
    "from-indigo-500": "from-emerald-400",
    "to-violet-600": "to-cyan-500",
    "text-indigo-600": "text-emerald-400",
    "text-indigo-500": "text-emerald-400",
    "bg-indigo-50": "bg-emerald-500/10",
    "hover:bg-indigo-50": "hover:bg-emerald-500/10",
    "hover:text-indigo-600": "hover:text-emerald-400",
    "border-indigo-100": "border-emerald-500/20",
    "border-indigo-500": "border-emerald-400",
    "border-indigo-300": "border-emerald-400/50",
    "shadow-[0_4px_12px_rgba(99,102,241,0.4)]": "shadow-[0_4px_12px_rgba(16,185,129,0.4)]",
    "shadow-[0_12px_40px_rgba(99,102,241,0.15)]": "shadow-[0_12px_40px_rgba(16,185,129,0.15)]",
    "shadow-[0_2px_8px_rgba(99,102,241,0.35)]": "shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
    "shadow-[0_16px_48px_rgba(99,102,241,0.18)]": "shadow-[0_16px_48px_rgba(16,185,129,0.18)]",
    "bg-[rgba(139,92,246,0.15)]": "bg-white/5",
    "border-[rgba(139,92,246,0.2)]": "border-[rgba(16,185,129,0.2)]",
    "focus:border-[rgba(139,92,246,0.6)]": "focus:border-[rgba(16,185,129,0.6)]",
    "focus:ring-[rgba(139,92,246,0.1)]": "focus:ring-[rgba(16,185,129,0.1)]",
    "text-orange-500": "text-emerald-400",
    "border-orange-500": "border-emerald-400",
    "hover:bg-orange-50": "hover:bg-emerald-500/10",
    "bg-red-50": "bg-red-500/10",
    "hover:bg-red-50": "hover:bg-red-500/10",
    
    // Structural colors (Light mode -> Dark mode)
    "bg-white": "bg-[#0B0F15]",
    "bg-[#F8FAFC]": "bg-[#10161F]",
    "bg-gray-50": "bg-[#10161F]",
    "bg-[#07080F]": "bg-[#040608]",
    "text-gray-900": "text-white",
    "text-slate-900": "text-white",
    "text-slate-800": "text-[#DFE6EE]",
    "text-gray-700": "text-[#AABDD1]",
    "text-gray-600": "text-[#7C94B0]",
    "text-gray-500": "text-[#536B88]",
    "text-gray-400": "text-[#536B88]",
    "border-gray-200": "border-[rgba(16,185,129,0.15)]",
    "border-gray-100": "border-[rgba(16,185,129,0.1)]",
    "border-gray-50": "border-white/5",
    "text-[#111827]": "text-white",
    
    // Fonts
    "font-['Inter',sans-serif]": "font-['Plus_Jakarta_Sans',sans-serif]",
    "font-['Space_Grotesk',sans-serif]": "font-['Outfit',sans-serif]"
};

function processFile(filePath) {
    if (filePath.includes('globals.css') || filePath.includes('layout.tsx')) {
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    
    for (const [oldVal, newVal] of Object.entries(replacements)) {
        // Simple string replace across the file
        newContent = newContent.split(oldVal).join(newVal);
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
