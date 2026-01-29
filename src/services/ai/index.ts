/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - AI Service Provider Factory
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * @fileoverview Central factory for managing multiple AI provider integrations.
 *               This module provides a unified interface to seamlessly switch
 *               between different AI services (OpenAI, Gemini, DeepSeek) based
 *               on user configuration.
 * 
 * @module services/ai
 * @requires ./mock - Mock AI provider for testing without API keys
 * @requires ./openai - OpenAI GPT-4 integration
 * @requires ./gemini - Google Gemini AI integration
 * @requires ./deepseek - DeepSeek AI integration
 * 
 * @author Ashraf Morningstar
 * @copyright © 2022-2026 Ashraf Morningstar. All rights reserved.
 * @license MIT
 * 
 * @description
 * This is a personal recreation developed for learning and skill development.
 * The AI provider abstraction pattern demonstrates professional software
 * architecture principles including dependency injection and strategy pattern.
 * 
 * Original project concepts remain the intellectual property of their
 * respective creators. This implementation is for educational purposes.
 * 
 * Repository: https://github.com/AshrafMorningstar/LinkedIn-AI-Automator
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { AIProvider, AppSettings } from "../../types";
import { MockAIProvider } from "./mock";
import { OpenAIProvider } from "./openai";
import { GeminiProvider } from "./gemini";
import { DeepSeekProvider } from "./deepseek";

/**
 * Factory function to instantiate the appropriate AI provider based on settings.
 * 
 * This function implements the Factory Pattern to create AI provider instances
 * dynamically based on user configuration. It handles validation of API keys
 * and provides fallback to mock mode for testing.
 * 
 * @param {AppSettings} settings - Application settings containing provider choice and API keys
 * @returns {AIProvider} Configured AI provider instance ready for use
 * @throws {Error} When API key is missing for selected provider
 * 
 * @example
 * ```typescript
 * const settings = { aiProvider: 'openai', apiKeys: { openai: 'sk-...' } };
 * const provider = getAIProvider(settings);
 * const content = await provider.generatePost('AI Automation');
 * ```
 */
export function getAIProvider(settings: AppSettings): AIProvider {
    switch (settings.aiProvider) {
        case 'openai':
            // Validate OpenAI API key presence before instantiation
            if (!settings.apiKeys.openai) {
                throw new Error('OpenAI API key not configured');
            }
            return new OpenAIProvider(settings.apiKeys.openai);
        
        case 'gemini':
            // Validate Google Gemini API key presence
            if (!settings.apiKeys.gemini) {
                throw new Error('Gemini API key not configured');
            }
            return new GeminiProvider(settings.apiKeys.gemini);
        
        case 'deepseek':
            // Validate DeepSeek API key presence
            if (!settings.apiKeys.deepseek) {
                throw new Error('DeepSeek API key not configured');
            }
            return new DeepSeekProvider(settings.apiKeys.deepseek);
        
        case 'mock':
        default:
            // Fallback to mock provider for testing without API costs
            return new MockAIProvider();
    }
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * End of AI Service Provider Factory
 * ═══════════════════════════════════════════════════════════════════════════
 */
