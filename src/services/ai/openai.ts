/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - openai.ts
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

export class OpenAIProvider implements AIProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generatePost(topic: string, context?: string): Promise<string> {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [
                    {
                        role: 'system',
                        content: `You are a viral LinkedIn content strategist. Create engaging, professional posts that:
- Start with a strong hook
- Provide actionable value
- Use clean formatting with emojis
- Include relevant hashtags
- Encourage engagement`
                    },
                    {
                        role: 'user',
                        content: `Write a LinkedIn post about: ${topic}${context ? `\n\nAdditional context: ${context}` : ''}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async analyzeTiming(topic: string): Promise<string> {
        // Simple heuristic for now
        const now = new Date();
        const optimal = new Date(now);
        optimal.setDate(now.getDate() + 1);
        optimal.setHours(10, 0, 0, 0);
        return optimal.toISOString();
    }
}
