/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - Settings.tsx
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

import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { AppSettings } from '../types';

export function Settings() {
    const [settings, setSettings] = useState<AppSettings>({
        aiProvider: 'mock',
        apiKeys: {}
    });

    useEffect(() => {
        setSettings(StorageService.getSettings());
    }, []);

    const handleSave = () => {
        StorageService.saveSettings(settings);
        alert('Settings Saved!');
    };

    return (
        <div className="card flex flex-col gap-4">
            <h2>⚙️ Configuration</h2>
            
            <div className="flex flex-col gap-2 text-left">
                <label>Preferred AI Provider</label>
                <select 
                    value={settings.aiProvider}
                    onChange={(e) => setSettings({...settings, aiProvider: e.target.value as any})}
                >
                    <option value="mock">Mock Mode (Free Testing)</option>
                    <option value="openai">OpenAI (GPT-4)</option>
                    <option value="gemini">Google Gemini</option>
                    <option value="deepseek">DeepSeek</option>
                </select>
            </div>

            <div className="flex flex-col gap-2 text-left">
                <label>OpenAI API Key</label>
                <input 
                    type="password" 
                    placeholder="sk-..." 
                    value={settings.apiKeys.openai || ''}
                    onChange={(e) => setSettings({
                        ...settings, 
                        apiKeys: { ...settings.apiKeys, openai: e.target.value }
                    })}
                />
            </div>

            <div className="flex flex-col gap-2 text-left">
                <label>Gemini API Key</label>
                <input 
                    type="password" 
                    placeholder="AIza..." 
                    value={settings.apiKeys.gemini || ''}
                    onChange={(e) => setSettings({
                        ...settings, 
                        apiKeys: { ...settings.apiKeys, gemini: e.target.value }
                    })}
                />
            </div>
            
             <div className="flex flex-col gap-2 text-left">
                <label>DeepSeek API Key</label>
                <input 
                    type="password" 
                    placeholder="sk-..." 
                    value={settings.apiKeys.deepseek || ''}
                    onChange={(e) => setSettings({
                        ...settings, 
                        apiKeys: { ...settings.apiKeys, deepseek: e.target.value }
                    })}
                />
            </div>

            <div className="flex flex-col gap-2 text-left">
                <label>LinkedIn Access Token (Optional)</label>
                <input 
                    type="password" 
                    placeholder="AQ..." 
                    value={settings.linkedinAccessToken || ''}
                    onChange={(e) => setSettings({...settings, linkedinAccessToken: e.target.value})}
                />
            </div>

            <button onClick={handleSave} className="mt-4">Save Configuration</button>
        </div>
    );
}
