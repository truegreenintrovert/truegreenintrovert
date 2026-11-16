import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../lib/api';
import { mediaUrl } from '../../../lib/mediaUrl';

export default function ManageProfile({ token, uploadImage, setMessage }) {
  const [profBio, setProfBio] = useState('');
  const [profEducation, setProfEducation] = useState('');
  const [profExperience, setProfExperience] = useState('');
  const [profSkills, setProfSkills] = useState('');
  const [profImage, setProfImage] = useState(null);
  const [profExistingImage, setProfExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = () => {
    fetch(API_URL + '/api/profile')
      .then(res => res.json())
      .then(data => {
        setProfBio(data.bio || '');
        setProfEducation(data.education || '');
        setProfExperience(data.experience || '');
        setProfSkills(data.skills || '');
        setProfExistingImage(data.imageUrl || '');
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      let finalImageUrl = profExistingImage;
      if (profImage) finalImageUrl = await uploadImage(profImage);

      const res = await fetch(API_URL + '/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          bio: profBio, education: profEducation, experience: profExperience, skills: profSkills, imageUrl: finalImageUrl
        })
      });
      if (res.ok) {
        setMessage('Profile updated successfully!');
        fetchProfile(); 
        setProfImage(null);
      } else setMessage('Failed to update profile.');
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Edit Profile / About Me</h2>
      <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Profile Image</label>
          {profExistingImage && <div className="mb-2"><img src={mediaUrl(profExistingImage)} alt="Current" className="h-16 w-16 object-cover rounded-full border border-white/10" /></div>}
          <input type="file" accept="image/*" onChange={(e) => setProfImage(e.target.files[0])} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/20 file:text-brand-primary-light hover:file:bg-brand-primary/30" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Short Bio</label>
          <textarea required value={profBio} onChange={(e) => setProfBio(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-24"></textarea>
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Skills</label>
          <textarea required value={profSkills} onChange={(e) => setProfSkills(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-24" placeholder="React, Node.js, TailwindCSS..."></textarea>
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Educational Qualifications</label>
          <textarea required value={profEducation} onChange={(e) => setProfEducation(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-32" placeholder="B.Tech in Computer Science..."></textarea>
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Experiences</label>
          <textarea required value={profExperience} onChange={(e) => setProfExperience(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-32" placeholder="Software Engineer at XYZ..."></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-brand-primary px-6 py-2 rounded-lg font-bold disabled:opacity-50">
          {isSubmitting ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
