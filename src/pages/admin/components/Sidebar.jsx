import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, handleLogout }) {
  return (
    <aside className="w-64 bg-brand-bg-secondary border-r border-white/5 flex flex-col h-[calc(100vh-6rem)] fixed left-0 top-24">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold text-white">Dashboard</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setActiveTab('portfolio')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'portfolio' ? 'bg-brand-primary/20 text-brand-primary-light' : 'text-brand-text-muted hover:bg-white/5'}`}>Manage Portfolio</button>
        <button onClick={() => setActiveTab('blog')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'blog' ? 'bg-brand-primary/20 text-brand-primary-light' : 'text-brand-text-muted hover:bg-white/5'}`}>Manage Blog</button>
        <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-brand-primary/20 text-brand-primary-light' : 'text-brand-text-muted hover:bg-white/5'}`}>Manage Profile</button>
        <button onClick={() => setActiveTab('messages')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-brand-primary/20 text-brand-primary-light' : 'text-brand-text-muted hover:bg-white/5'}`}>Contact Messages</button>
        <button onClick={() => setActiveTab('settings')} className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-brand-primary/20 text-brand-primary-light' : 'text-brand-text-muted hover:bg-white/5'}`}>Site Settings</button>
      </nav>
      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-brand-danger hover:bg-brand-danger/10 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
