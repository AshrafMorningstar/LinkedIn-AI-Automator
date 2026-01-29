/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - types.ts
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

export type ScheduledPost = {
    id: string;
    content: string;
    media?: MediaFile;
    scheduledTime: string; // ISO String
    status: 'draft' | 'scheduled' | 'posted' | 'failed';
    topic: string;
    aiProvider?: string;
};

export type MediaFile = {
    id: string;
    type: 'image' | 'video' | 'pdf';
    name: string;
    url: string; // Blob URL or Base64 (for local preview)
    size: number;
};

export type AppSettings = {
    aiProvider: 'openai' | 'gemini' | 'deepseek' | 'mock';
    apiKeys: {
        openai?: string;
        gemini?: string;
        deepseek?: string;
    };
    linkedinAccessToken?: string;
};

export interface AIProvider {
    generatePost(topic: string, context?: string): Promise<string>;
    analyzeTiming(topic: string): Promise<string>; // Returns ISO date string
}
