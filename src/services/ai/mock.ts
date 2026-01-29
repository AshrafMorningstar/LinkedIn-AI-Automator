/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - mock.ts
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

export class MockAIProvider implements AIProvider {
    async generatePost(topic: string, context?: string): Promise<string> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const hooks = [
            `🚀 Here's what nobody tells you about ${topic}...`,
            `💡 I just discovered something game-changing about ${topic}.`,
            `🔥 ${topic} is evolving faster than most people realize.`,
            `⚡ The future of ${topic} is already here.`
        ];
        
        const hook = hooks[Math.floor(Math.random() * hooks.length)];
        
        return `${hook}

After ${Math.floor(Math.random() * 5) + 1} years working with ${topic}, I've learned that success comes down to 3 things:

1️⃣ Consistency beats perfection
2️⃣ Community accelerates growth
3️⃣ Automation frees creativity

${context ? `\n💭 Context: ${context}\n` : ''}
What's your experience with ${topic}? Drop a comment below! 👇

#${topic.replace(/\s+/g, '')} #Innovation #Growth #TechTrends`;
    }

    async analyzeTiming(topic: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Best times: Tuesday-Thursday, 10 AM or 2 PM
        const now = new Date();
        const optimal = new Date(now);
        
        // Set to next Tuesday at 10 AM
        const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7;
        optimal.setDate(now.getDate() + daysUntilTuesday);
        optimal.setHours(10, 0, 0, 0);
        
        return optimal.toISOString();
    }
}
