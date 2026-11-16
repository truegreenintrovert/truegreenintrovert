import { API_URL } from '../../lib/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(API_URL + '/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <footer id="contact" className="bg-brand-bg-secondary pt-20 border-t border-white/5">
      <div className="container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 mb-[60px]">
        
        <div>
          <h2 className="font-heading font-bold tracking-[2px] text-brand-text mb-2">TGI</h2>
          <p>True Green Introvert</p>
          <p className="text-brand-text-muted text-[0.9rem] mt-4">Explore, Contribute, Innovate.</p>
        </div>

        <div>
          <h3 className="text-[1.2rem] mb-6 text-white">Contact</h3>
          <p className="text-brand-text-muted mb-3">Email: {settings?.email || 'yogesh@fruitenium.in'}</p>
          <p className="text-brand-text-muted mb-3">Mobile: {settings?.mobile || '+91-9521876282'}</p>
        </div>

        <div>
          <h3 className="text-[1.2rem] mb-6 text-white">Social Media</h3>
          <div className="flex flex-col gap-4">
            <a href={settings?.leetcode || "https://leetcode.com/"} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted flex items-center gap-2 hover:text-brand-danger transition-colors">
              <i className="fas fa-code"></i> LeetCode
            </a>
            <a href={settings?.instagram || "https://www.instagram.com/truegreenintrovert"} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted flex items-center gap-2 hover:text-brand-danger transition-colors">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href={settings?.youtube || "https://www.youtube.com/@truegreenintrovertvert"} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted flex items-center gap-2 hover:text-brand-danger transition-colors">
              <i className="fab fa-youtube"></i> YouTube
            </a>
            <a href={settings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted flex items-center gap-2 hover:text-brand-danger transition-colors">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>

      </div>
      <div className="text-center py-6 border-t border-white/5 text-brand-text-muted text-[0.9rem] flex flex-col md:flex-row justify-between items-center container gap-4">
        <p>&copy; {new Date().getFullYear()} True Green Introvert. All rights reserved.</p>
        <Link to="/admin" className="hover:text-brand-danger transition-colors text-xs font-semibold uppercase tracking-wider">
          Admin Portal
        </Link>
      </div>
    </footer>
  );
}
