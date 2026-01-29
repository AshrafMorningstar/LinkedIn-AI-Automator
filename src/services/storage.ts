/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - storage.ts
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

import { AppSettings, ScheduledPost } from "../types";

const KEYS = {
    SETTINGS: 'linkedin_automator_settings',
    POSTS: 'linkedin_automator_posts'
};

export const StorageService = {
    getSettings: (): AppSettings => {
        const stored = localStorage.getItem(KEYS.SETTINGS);
        if (stored) return JSON.parse(stored);
        return {
            aiProvider: 'mock',
            apiKeys: {}
        };
    },

    saveSettings: (settings: AppSettings) => {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    },

    getPosts: (): ScheduledPost[] => {
        const stored = localStorage.getItem(KEYS.POSTS);
        if (stored) return JSON.parse(stored);
        return [];
    },

    savePost: (post: ScheduledPost) => {
        const posts = StorageService.getPosts();
        const existingIndex = posts.findIndex(p => p.id === post.id);
        
        if (existingIndex >= 0) {
            posts[existingIndex] = post;
        } else {
            posts.push(post);
        }
        
        localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    },

    deletePost: (id: string) => {
        const posts = StorageService.getPosts().filter(p => p.id !== id);
        localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    },
    
    // Initializer to ensure storage works
    init: () => {
        if (!localStorage.getItem(KEYS.POSTS)) {
            localStorage.setItem(KEYS.POSTS, JSON.stringify([]));
        }
    }
};
