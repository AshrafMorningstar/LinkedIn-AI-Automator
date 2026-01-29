/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - Queue.tsx
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
import { ScheduledPost } from '../types';
import { StorageService } from '../services/storage';

interface QueueProps {
    onEdit: (post: ScheduledPost) => void;
    refreshTrigger: number;
}

export function Queue({ onEdit, refreshTrigger }: QueueProps) {
    const [posts, setPosts] = useState<ScheduledPost[]>([]);
    const [filter, setFilter] = useState<'all' | 'draft' | 'scheduled' | 'posted'>('all');

    useEffect(() => {
        loadPosts();
    }, [refreshTrigger]);

    const loadPosts = () => {
        setPosts(StorageService.getPosts());
    };

    const deletePost = (id: string) => {
        if (confirm('Delete this post?')) {
            StorageService.deletePost(id);
            loadPosts();
        }
    };

    const shareToLinkedIn = (post: ScheduledPost) => {
        navigator.clipboard.writeText(post.content);
        window.open('https://www.linkedin.com/feed/', '_blank');
        alert('✅ Content copied! Paste it into LinkedIn.');
    };

    const filteredPosts = posts.filter(p => 
        filter === 'all' || p.status === filter
    );

    return (
        <div className="card flex flex-col gap-4">
            <h2>📋 Post Queue</h2>

            <div className="flex gap-2">
                <button onClick={() => setFilter('all')} style={{ flex: 1, opacity: filter === 'all' ? 1 : 0.6 }}>
                    All ({posts.length})
                </button>
                <button onClick={() => setFilter('draft')} style={{ flex: 1, opacity: filter === 'draft' ? 1 : 0.6 }}>
                    Drafts ({posts.filter(p => p.status === 'draft').length})
                </button>
                <button onClick={() => setFilter('scheduled')} style={{ flex: 1, opacity: filter === 'scheduled' ? 1 : 0.6 }}>
                    Scheduled ({posts.filter(p => p.status === 'scheduled').length})
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {filteredPosts.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)' }}>No posts yet. Create your first one!</p>
                ) : (
                    filteredPosts.map(post => (
                        <div 
                            key={post.id} 
                            className="card"
                            style={{ 
                                backgroundColor: 'var(--color-bg-primary)',
                                textAlign: 'left'
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ 
                                            fontSize: '0.75rem',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: post.status === 'draft' ? '#64748b' : 
                                                           post.status === 'scheduled' ? '#3b82f6' : '#10b981'
                                        }}>
                                            {post.status.toUpperCase()}
                                        </span>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                            {post.topic}
                                        </span>
                                    </div>
                                    <p style={{ 
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: '0.5rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {post.content}
                                    </p>
                                    {post.media && (
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                            {post.media.type === 'image' && '🖼️ Image'}
                                            {post.media.type === 'video' && '🎥 Video'}
                                            {post.media.type === 'pdf' && '📄 PDF'}
                                            {' '}{post.media.name}
                                        </div>
                                    )}
                                    {post.scheduledTime && (
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                            📅 {new Date(post.scheduledTime).toLocaleString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={() => onEdit(post)}
                                    style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem' }}
                                >
                                    ✏️ Edit
                                </button>
                                <button 
                                    onClick={() => shareToLinkedIn(post)}
                                    style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem', backgroundColor: 'var(--color-accent)' }}
                                >
                                    🚀 Share
                                </button>
                                <button 
                                    onClick={() => deletePost(post.id)}
                                    style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem', backgroundColor: '#ef4444' }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
