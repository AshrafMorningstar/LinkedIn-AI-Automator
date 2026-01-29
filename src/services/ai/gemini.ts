/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - gemini.ts
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * @fileoverview Professional copyright header and documentation
 *
 * @author Ashraf Morningstar
 * @copyright © 2022-2026 Ashraf Morningstar. All rights reserved.
 * @license MIT
 *
 * @description
 * This is a personal recreation developed for learning and skill development.
 * Original project concepts remain the intellectual property of their
 * respective creators.
 *
 * Repository: https://github.com/AshrafMorningstar/LinkedIn-AI-Automator
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { AIProvider } from "../../types";

export class GeminiProvider implements AIProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generatePost(topic: string, context?: string): Promise<string> {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a viral LinkedIn content strategist. Write an engaging LinkedIn post about: ${topic}${context ? `\n\nContext: ${context}` : ''}\n\nMake it professional, valuable, and viral-worthy with emojis and hashtags.`
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    async analyzeTiming(topic: string): Promise<string> {
        const now = new Date();
        const optimal = new Date(now);
        optimal.setDate(now.getDate() + 1);
        optimal.setHours(14, 0, 0, 0);
        return optimal.toISOString();
    }
}
