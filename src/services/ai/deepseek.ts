/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - deepseek.ts
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

export class DeepSeekProvider implements AIProvider {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generatePost(topic: string, context?: string): Promise<string> {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a viral LinkedIn content strategist. Create engaging professional posts with hooks, value, and CTAs.'
                    },
                    {
                        role: 'user',
                        content: `Write a LinkedIn post about: ${topic}${context ? `\n\nContext: ${context}` : ''}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async analyzeTiming(topic: string): Promise<string> {
        const now = new Date();
        const optimal = new Date(now);
        optimal.setDate(now.getDate() + 1);
        optimal.setHours(10, 30, 0, 0);
        return optimal.toISOString();
    }
}
