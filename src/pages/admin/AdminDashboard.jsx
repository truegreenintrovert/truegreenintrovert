import { API_URL } from '../../lib/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ManageProfile from './components/ManageProfile';
import ManagePortfolio from './components/ManagePortfolio';
import ManageBlog from './components/ManageBlog';
import ContactMessages from './components/ContactMessages';
import ManageSettings from './components/ManageSettings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) navigate('/admin');
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/admin');
  };

  const uploadImage = async (imageFile) => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch(API_URL + '/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Image upload failed');
    const data = await res.json();
    return data.imageUrl;
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ManageProfile token={token} uploadImage={uploadImage} setMessage={setMessage} />;
      case 'portfolio':
        return <ManagePortfolio token={token} uploadImage={uploadImage} setMessage={setMessage} />;
      case 'blog':
        return <ManageBlog token={token} uploadImage={uploadImage} setMessage={setMessage} />;
      case 'messages':
        return <ContactMessages token={token} />;
      case 'settings':
        return <ManageSettings token={token} setMessage={setMessage} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-10 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold capitalize">{activeTab} Management</h1>
        </div>
        
        {message && (
          <div className="mb-6 p-4 bg-brand-primary/20 text-brand-primary-light border border-brand-primary/30 rounded-lg transition-all duration-300">
            {message}
          </div>
        )}

        <div className="bg-[#161816] p-8 rounded-xl border border-white/5 mb-8">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}
