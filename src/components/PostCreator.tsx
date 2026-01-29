/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - PostCreator.tsx
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

import { useState, useRef } from 'react';
import { MediaFile, ScheduledPost } from '../types';
import { StorageService } from '../services/storage';
import { getAIProvider } from '../services/ai';

interface PostCreatorProps {
    onPostCreated: () => void;
    editingPost?: ScheduledPost;
}

/**
 * Component for creating, generating, and scheduling LinkedIn content.
 * 
 * This complex component integrates AI content generation, media handling
 * (including drag-and-drop), and scheduling logic. It supports both new post
 * creation and editing of existing posts/drafts.
 * 
 * @component
 * @param {PostCreatorProps} props - Component properties.
 * @returns {JSX.Element} The rendered post creation interface.
 */
export function PostCreator({ onPostCreated, editingPost }: PostCreatorProps) {
    /** @state {string} topic - The primary subject matter for AI content generation. */
    const [topic, setTopic] = useState(editingPost?.topic || '');
    
    /** @state {string} content - The actual text body of the LinkedIn post. */
    const [content, setContent] = useState(editingPost?.content || '');
    
    /** @state {MediaFile | undefined} media - Reference to the uploaded image, video, or PDF. */
    const [media, setMedia] = useState<MediaFile | undefined>(editingPost?.media);
    
    /** @state {string} scheduledTime - ISO timestamp for when the post should be published. */
    const [scheduledTime, setScheduledTime] = useState(editingPost?.scheduledTime || '');
    
    /** @state {boolean} isGenerating - Flag to indicate active AI processing. */
    const [isGenerating, setIsGenerating] = useState(false);
    
    /** @state {string[]} hookHistory - Stack of previously generated hooks for 'Undo' functionality. */
    const [hookHistory, setHookHistory] = useState<string[]>([]);
    
    /** @ref {HTMLInputElement} fileInputRef - Direct reference to the hidden file input element. */
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Handles browser file selection events.
     * Validates file types and sizes before generating local previews.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const mediaType = file.type.startsWith('image/') ? 'image' 
            : file.type.startsWith('video/') ? 'video'
            : file.type === 'application/pdf' ? 'pdf'
            : null;

        if (!mediaType) {
            alert('Unsupported file type. Please upload an image, video, or PDF.');
            return;
        }

        const mediaFile: MediaFile = {
            id: Date.now().toString(),
            type: mediaType,
            name: file.name,
            url: URL.createObjectURL(file),
            size: file.size
        };

        setMedia(mediaFile);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            const fakeEvent = { target: { files: [file] } } as any;
            handleMediaUpload(fakeEvent);
        }
    };

    const generateContent = async () => {
        if (!topic.trim()) {
            alert('Please enter a topic first!');
            return;
        }

        setIsGenerating(true);
        try {
            const settings = StorageService.getSettings();
            const aiProvider = getAIProvider(settings);
            
            const [generatedContent, optimalTime] = await Promise.all([
                aiProvider.generatePost(topic),
                aiProvider.analyzeTiming(topic)
            ]);

            // Save current hook to history
            if (content) {
                setHookHistory(prev => [...prev, content]);
            }

            setContent(generatedContent);
            setScheduledTime(optimalTime);
        } catch (error: any) {
            alert(`AI Generation failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const shuffleHook = async () => {
        await generateContent();
    };

    const undoHook = () => {
        if (hookHistory.length > 0) {
            const previous = hookHistory[hookHistory.length - 1];
            setContent(previous);
            setHookHistory(prev => prev.slice(0, -1));
        }
    };

    const saveAsDraft = () => {
        const post: ScheduledPost = {
            id: editingPost?.id || Date.now().toString(),
            topic,
            content,
            media,
            scheduledTime,
            status: 'draft',
            aiProvider: StorageService.getSettings().aiProvider
        };

        StorageService.savePost(post);
        onPostCreated();
        resetForm();
    };

    const schedulePost = () => {
        if (!content.trim()) {
            alert('Please generate or write content first!');
            return;
        }

        const post: ScheduledPost = {
            id: editingPost?.id || Date.now().toString(),
            topic,
            content,
            media,
            scheduledTime: scheduledTime || new Date(Date.now() + 86400000).toISOString(),
            status: 'scheduled',
            aiProvider: StorageService.getSettings().aiProvider
        };

        StorageService.savePost(post);
        onPostCreated();
        resetForm();
    };

    const launchToLinkedIn = () => {
        // Copy content to clipboard
        navigator.clipboard.writeText(content);
        
        // Open LinkedIn
        window.open('https://www.linkedin.com/feed/', '_blank');
        
        alert('✅ Content copied to clipboard! Paste it into LinkedIn.');
    };

    const resetForm = () => {
        setTopic('');
        setContent('');
        setMedia(undefined);
        setScheduledTime('');
        setHookHistory([]);
    };

    return (
        <div className="card flex flex-col gap-4">
            <h2>✍️ Create Post</h2>

            <div className="flex flex-col gap-2 text-left">
                <label>Topic</label>
                <input 
                    type="text" 
                    placeholder="e.g., AI Automation, Remote Work, Leadership"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <button 
                onClick={generateContent} 
                disabled={isGenerating}
                style={{ backgroundColor: 'var(--color-accent)' }}
            >
                {isGenerating ? '🤖 Generating...' : '✨ Generate with AI'}
            </button>

            {content && (
                <div className="flex gap-2">
                    <button onClick={shuffleHook} style={{ flex: 1 }}>
                        🎲 Shuffle Hook
                    </button>
                    <button 
                        onClick={undoHook} 
                        disabled={hookHistory.length === 0}
                        style={{ flex: 1 }}
                    >
                        ↩️ Undo
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-2 text-left">
                <label>Content</label>
                <textarea 
                    rows={10}
                    placeholder="Your post content will appear here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 text-left">
                <label>Media (Optional)</label>
                <div 
                    className="upload-zone"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        border: '2px dashed var(--color-border)',
                        borderRadius: '8px',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {media ? (
                        <div>
                            {media.type === 'image' && (
                                <img src={media.url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            )}
                            {media.type === 'video' && (
                                <video src={media.url} controls style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            )}
                            {media.type === 'pdf' && (
                                <div>📄 {media.name}</div>
                            )}
                        </div>
                    ) : (
                        <div>📎 Drag & Drop or Click to Upload</div>
                    )}
                </div>
                <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*,video/*,.pdf"
                    onChange={handleMediaUpload}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="flex flex-col gap-2 text-left">
                <label>Schedule Time (AI Optimized)</label>
                <input 
                    type="datetime-local"
                    value={scheduledTime ? new Date(scheduledTime).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setScheduledTime(new Date(e.target.value).toISOString())}
                />
            </div>

            <div className="flex gap-2">
                <button onClick={saveAsDraft} style={{ flex: 1 }}>
                    💾 Save Draft
                </button>
                <button onClick={schedulePost} style={{ flex: 1, backgroundColor: 'var(--color-success)' }}>
                    📅 Schedule
                </button>
                <button onClick={launchToLinkedIn} style={{ flex: 1, backgroundColor: 'var(--color-accent)' }}>
                    🚀 Launch Now
                </button>
            </div>
        </div>
    );
}
