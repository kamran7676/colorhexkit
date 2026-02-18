"use strict";

import React from "react";
import { cn } from "@/lib/utils";

interface CodeHighlighterProps {
    code: string;
    language: "css" | "javascript" | "json" | "typescript";
    className?: string;
}

export function CodeHighlighter({ code, language, className }: CodeHighlighterProps) {
    const highlightCode = (code: string, lang: string) => {
        // Token storage to prevent double-highlighting
        const tokens: { [key: string]: string } = {};
        let tokenIndex = 0;

        // Helper to safely replace and store result as a token
        const safeReplace = (text: string, regex: RegExp, className: string) => {
            // Create a new regex with 'g' flag if not present, to match all occurrences
            const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
            const globalRegex = new RegExp(regex.source, flags);

            return text.replace(globalRegex, (match) => {
                // If the match is already a token, don't touch it
                if (match.startsWith('__TOKEN_')) return match;

                const token = `__TOKEN_${tokenIndex++}__`;
                // Escape HTML in the match content before wrapping
                const escapedMatch = match
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");

                tokens[token] = `<span class="${className}">${escapedMatch}</span>`;
                return token;
            });
        };

        // Helper for complex replacements (e.g. groups) where we only want to color part of the match
        // For now, simpler regexes are preferred.

        let current = code;

        /*
          COLOR PALETTE (Based on Screenshots)
          - Comments: Zinc/Grey (text-zinc-500)
          - CSS Selectors: Pink (text-pink-400)
          - CSS Properties: Blue/Sky (text-sky-300) -- Screenshot shows blue-ish
          - CSS Hex Values: Emerald/Green (text-emerald-400)
          - JS/JSON Keys: Purple (text-purple-400)
          - JS/JSON Strings: Sky/Cyan (text-sky-300)
          - Numbers: Orange (text-orange-300)
          - Punctuation: White (default)
        */

        if (lang === "css") {
            // 1. Comments
            current = safeReplace(current, /(\/\*[\s\S]*?\*\/)/g, "text-zinc-500");

            // 2. CSS Hex Colors (e.g. #fef56d) - Green
            current = safeReplace(current, /(#[0-9a-fA-F]{3,8})/g, "text-emerald-400");

            // 3. CSS Variables/Properties (e.g. --wattle-50) - Blue/Sky
            // Match starts with -- or word, followed by colon
            current = safeReplace(current, /(--[\w-]+)(?=:)/g, "text-sky-300");
            // Standard properties?
            // current = safeReplace(current, /([\w-]+)(?=:)/g, "text-sky-300");

            // 4. Selectors (e.g. :root) - Pink/Red
            current = safeReplace(current, /(:root|[\.\#][\w-]+)/g, "text-pink-400");
        }

        if (lang === "javascript" || lang === "typescript" || lang === "json") {
            // 1. Comments
            current = safeReplace(current, /(\/\/.*)/g, "text-zinc-500");
            current = safeReplace(current, /(\/\*[\s\S]*?\*\/)/g, "text-zinc-500");

            if (lang !== "json") {
                // 2. Keywords - Pink/Red
                current = safeReplace(current, /\b(export|const|let|var|return|module|exports|default|function|if|else|import|from)\b/g, "text-pink-400");
            }

            // 3. Strings (Values) - Sky/Cyan
            // In JSON/JS, strings are values.
            // BUT, keys are also quoted strings in JSON. We need to distinguish Keys vs Values.
            // Regex for strings in general first? No, specific ordering.

            if (lang === "json") {
                // JSON Keys (quoted string followed by colon) - Purple
                current = safeReplace(current, /"([^"]+)"(?=\s*:)/g, "text-purple-400");
                // Note: safeReplace wraps the *whole match* (including quotes).
                // Screenshot shows quotes are same color as key. Correct.

                // JSON String Values (quoted string NOT followed by colon) - Sky/Cyan
                // We can match all remaining strings now, since keys are tokenized.
                current = safeReplace(current, /"([^"]+)"/g, "text-sky-300");
            } else {
                // JS Object Keys (unquoted word followed by colon) - Purple
                current = safeReplace(current, /(\b\w+\b)(?=\s*:)/g, "text-purple-400");

                // JS Quoted Keys (quoted followed by colon) - Purple
                current = safeReplace(current, /(['"`])([^'"`]+)\1(?=\s*:)/g, "text-purple-400");

                // JS Strings (Values) - Sky/Cyan
                current = safeReplace(current, /(['"`])(?:(?=(\\?))\2.)*?\1/g, "text-sky-300");
            }

            // 4. Numbers - Orange
            current = safeReplace(current, /\b(\d+(\.\d+)?)\b/g, "text-orange-300");

            // 5. Booleans/Null - Pink/Red
            current = safeReplace(current, /\b(true|false|null)\b/g, "text-pink-400");
        }

        // Now escape HTML in the *remaining* text (delimiters, whitespace, etc.)
        current = current
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Restore tokens
        // Since we output HTML in tokens, we just replace the token placeholder with the stored HTML
        return current.replace(/__TOKEN_\d+__/g, (match) => tokens[match] || match);
    };

    return (
        <pre className={cn("font-mono text-xs sm:text-sm leading-relaxed text-[#eee]", className)}>
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }} />
        </pre>
    );
}
