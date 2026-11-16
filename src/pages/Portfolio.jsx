import React, { useState, useEffect } from 'react';
import ridiImage from '../assets/ridi-hms.png';
import { API_URL } from '../lib/api';
import { mediaUrl } from '../lib/mediaUrl';

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6);

  useEffect(() => {
    // Fetch profile and projects simultaneously
    Promise.all([
      fetch(API_URL + '/api/profile').then(res => res.ok ? res.json() : null),
      fetch(API_URL + '/api/portfolio').then(res => res.ok ? res.json() : [])
    ])
    .then(([profileData, projectsData]) => {
      setProfile(profileData || null);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setIsLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch data:", err);
      setProjects([]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-[100px] bg-brand-bg flex items-center justify-center">
        <div className="text-brand-text-muted text-xl animate-pulse">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] pb-[60px] text-brand-text bg-gradient-to-b from-brand-bg to-brand-bg-secondary">
      
      {/* Profile Section */}
      {profile && (profile.bio || profile.imageUrl) && (
        <div className="container mx-auto px-5 mb-24 border-b border-white/10 pb-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Image Column */}
            {profile.imageUrl && (
              <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary-light/20 rounded-full blur-2xl transform scale-110 animate-pulse"></div>
                  <img 
                    src={mediaUrl(profile.imageUrl)}
                    alt="Profile" 
                    className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-2xl border-4 border-[#161816]"
                  />
                </div>
              </div>
            )}
            
            {/* Content Column */}
            <div className={`w-full ${profile.imageUrl ? 'lg:w-2/3' : 'w-full'}`}>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                About <span className="text-brand-primary-light">Me</span>
              </h1>
              
              {profile.bio && (
                <div className="mb-10 text-lg leading-relaxed text-brand-text-muted whitespace-pre-wrap">
                  {profile.bio}
                </div>
              )}

              {profile.skills && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.skills.split(',').map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-brand-primary/10 text-brand-primary-light rounded-full border border-brand-primary/20 text-sm font-semibold">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {profile.education && (
                  <div className="bg-[#161816] p-8 rounded-2xl border border-white/5 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <svg className="w-6 h-6 text-brand-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                      Education
                    </h3>
                    <div className="text-brand-text-muted whitespace-pre-wrap leading-relaxed">
                      {profile.education}
                    </div>
                  </div>
                )}
                
                {profile.experience && (
                  <div className="bg-[#161816] p-8 rounded-2xl border border-white/5 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <svg className="w-6 h-6 text-brand-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      Experience
                    </h3>
                    <div className="text-brand-text-muted whitespace-pre-wrap leading-relaxed">
                      {profile.experience}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <div className="container mx-auto px-5">
        <h1 className="text-brand-primary-light text-center mb-16 text-5xl font-heading font-bold uppercase tracking-wider">
          Featured Work
        </h1>

        {projects.length === 0 ? (
          <div className="text-center text-brand-text-muted py-20">No projects added yet.</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="space-y-32 w-full">
              {projects.slice(0, visibleProjectsCount).map((project, index) => (
                <div key={project.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <span className="text-brand-accent-light font-bold tracking-widest uppercase mb-4 block">{project.category}</span>
                    <h3 className="text-4xl font-heading font-bold mb-6">{project.title}</h3>
                    <p className="text-lg leading-relaxed text-brand-text-muted mb-8 whitespace-pre-wrap">
                      {project.description}
                    </p>
                    <a href={project.projectUrl !== '#' ? project.projectUrl : undefined} className="inline-block bg-brand-accent/20 text-brand-accent-light py-3 px-8 rounded-full font-semibold border border-brand-accent-light/20 hover:bg-brand-accent-light hover:text-white transition-all duration-300 hover:neon-box cursor-pointer">
                      View Project
                    </a>
                  </div>
                  <div className="flex-[1.5] w-full group relative overflow-hidden rounded-2xl shadow-2xl border border-transparent neon-border-hover">
                    <div className="absolute inset-0 bg-brand-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10 rounded-2xl pointer-events-none"></div>
                    <img 
                      src={mediaUrl(project.imageUrl)}
                      alt={project.title} 
                      className="w-full h-auto max-h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
            {projects.length > visibleProjectsCount && (
              <button 
                onClick={() => setVisibleProjectsCount(prev => prev + 6)}
                className="mt-20 inline-block bg-brand-primary/20 text-brand-primary-light py-4 px-10 rounded-full font-bold border border-brand-primary/40 hover:bg-brand-primary-light hover:text-white transition-all duration-300 hover:neon-box cursor-pointer"
              >
                Load More Projects
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
