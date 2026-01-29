/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LinkedIn AI Automator - App.tsx
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

import { useState, useEffect } from 'react'
import { Settings } from './components/Settings'
import { PostCreator } from './components/PostCreator'
import { Queue } from './components/Queue'
import { StorageService } from './services/storage'
import { ScheduledPost } from './types'

/**
 * Main application entry point for the LinkedIn AI Automator.
 * 
 * This component manages the high-level application state, including navigation
 * between primary application views (Create, Queue, Settings) and handles
 * the orchestration of post editing and list refreshing.
 * 
 * @component
 * @returns {JSX.Element} The rendered application layout and active view.
 */
function App() {
  /** @state {string} activeTab - Controls the currently visible primary view. */
  const [activeTab, setActiveTab] = useState<'create' | 'queue' | 'settings'>('create');
  
  /** @state {number} refreshTrigger - A counter used to force re-fetches in downstream components. */
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  /** @state {ScheduledPost | undefined} editingPost - Holds the reference to a post being actively modified. */
  const [editingPost, setEditingPost] = useState<ScheduledPost | undefined>();

  /**
   * Performs initial system checks and storage initialization on mount.
   */
  useEffect(() => {
    StorageService.init();
  }, []);

  /**
   * Callback executed after a post is successfully created or updated.
   * Increments the refresh trigger and clears any active editing state.
   */
  const handlePostCreated = () => {
    setRefreshTrigger(prev => prev + 1);
    setEditingPost(undefined);
  };

  /**
   * Initiates the editing flow for an existing scheduled post.
   * Switches the active view to 'create' and populates the editor with post data.
   * 
   * @param {ScheduledPost} post - The post object to be edited.
   */
  const handleEdit = (post: ScheduledPost) => {
    setEditingPost(post);
    setActiveTab('create');
  };

  return (
    <div className="flex flex-col gap-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          LinkedIn AI Automator
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Generate viral content with AI • Schedule automatically • Never post manually again
        </p>
      </header>

      <div className="flex gap-2" style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('create')}
          style={{ 
            flex: 1,
            backgroundColor: activeTab === 'create' ? 'var(--color-accent)' : 'var(--color-bg-secondary)'
          }}
        >
          ✍️ Create
        </button>
        <button 
          onClick={() => setActiveTab('queue')}
          style={{ 
            flex: 1,
            backgroundColor: activeTab === 'queue' ? 'var(--color-accent)' : 'var(--color-bg-secondary)'
          }}
        >
          📋 Queue
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{ 
            flex: 1,
            backgroundColor: activeTab === 'settings' ? 'var(--color-accent)' : 'var(--color-bg-secondary)'
          }}
        >
          ⚙️ Settings
        </button>
      </div>

      {activeTab === 'create' && (
        <PostCreator 
          onPostCreated={handlePostCreated}
          editingPost={editingPost}
        />
      )}

      {activeTab === 'queue' && (
        <Queue 
          onEdit={handleEdit}
          refreshTrigger={refreshTrigger}
        />
      )}

      {activeTab === 'settings' && (
        <Settings />
      )}

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '3rem',
        padding: '1rem',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem'
      }}>
        <p>⚡ Powered by AI • Built for LinkedIn Growth</p>
      </footer>
    </div>
  )
}

export default App
