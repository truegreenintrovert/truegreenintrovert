import { API_URL } from '../../../lib/api';
import React, { useState, useEffect } from 'react';

export default function ManageSettings({ token, setMessage }) {
  const [settings, setSettings] = useState({
    email: '',
    mobile: '',
    leetcode: '',
    instagram: '',
    youtube: '',
    linkedin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(API_URL + '/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          email: data.email || '',
          mobile: data.mobile || '',
          leetcode: data.leetcode || '',
          instagram: data.instagram || '',
          youtube: data.youtube || '',
          linkedin: data.linkedin || ''
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      const res = await fetch(API_URL + '/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Site Settings updated successfully!');
      } else {
        setMessage('Failed to update settings.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Site Settings (Contact & Socials)</h2>
      <form onSubmit={handleUpdateSettings} className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-brand-text-muted mb-1">Contact Email</label>
            <input type="email" name="email" value={settings.email} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-brand-text-muted mb-1">Contact Mobile</label>
            <input type="text" name="mobile" value={settings.mobile} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="+91-0000000000" />
          </div>
        </div>
        
        <div className="pt-4 mt-4 border-t border-white/5">
          <h3 className="text-lg font-bold mb-4 text-white">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-brand-text-muted mb-1">LeetCode URL</label>
              <input type="url" name="leetcode" value={settings.leetcode} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="https://leetcode.com/u/..." />
            </div>
            <div>
              <label className="block text-sm text-brand-text-muted mb-1">Instagram URL</label>
              <input type="url" name="instagram" value={settings.instagram} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm text-brand-text-muted mb-1">YouTube URL</label>
              <input type="url" name="youtube" value={settings.youtube} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="block text-sm text-brand-text-muted mb-1">LinkedIn URL</label>
              <input type="url" name="linkedin" value={settings.linkedin} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-brand-primary px-6 py-2 rounded-lg font-bold disabled:opacity-50 mt-6">
          {isSubmitting ? 'Saving...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
}
