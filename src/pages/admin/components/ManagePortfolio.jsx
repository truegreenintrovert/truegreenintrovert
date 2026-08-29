import React, { useState, useEffect } from 'react';

export default function ManagePortfolio({ token, uploadImage, setMessage }) {
  const [portfolios, setPortfolios] = useState([]);
  const [editingPortId, setEditingPortId] = useState(null);
  const [portTitle, setPortTitle] = useState('');
  const [portCategory, setPortCategory] = useState('');
  const [portDesc, setPortDesc] = useState('');
  const [portImage, setPortImage] = useState(null);
  const [portExistingImage, setPortExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPortfolios = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/portfolio').then(res => res.json()).then(data => setPortfolios(data));
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const resetForm = () => {
    setEditingPortId(null); setPortTitle(''); setPortCategory(''); 
    setPortDesc(''); setPortImage(null); setPortExistingImage('');
  };

  const handleEditPort = (port) => {
    setEditingPortId(port.id);
    setPortTitle(port.title);
    setPortCategory(port.category);
    setPortDesc(port.description);
    setPortExistingImage(port.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePort = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + `/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Project deleted successfully');
        fetchPortfolios();
      }
    } catch (err) {}
  };

  const handleCreateOrUpdatePortfolio = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      let finalImageUrl = portExistingImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop';
      if (portImage) finalImageUrl = await uploadImage(portImage);

      const url = editingPortId ? `/api/portfolio/${editingPortId}` : '/api/portfolio';
      const method = editingPortId ? 'PUT' : 'POST';

      const res = await fetch(import.meta.env.VITE_API_URL + url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          title: portTitle, category: portCategory, description: portDesc,
          imageUrl: finalImageUrl, projectUrl: '#'
        })
      });
      if (res.ok) {
        setMessage(`Project ${editingPortId ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchPortfolios();
      } else setMessage('Failed to save project.');
    } catch (err) {
      setMessage('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold">
          {editingPortId ? 'Edit Project' : 'Add New Project'}
        </h2>
        {editingPortId && (
          <button onClick={resetForm} className="text-sm text-brand-text-muted hover:text-white">Cancel Edit</button>
        )}
      </div>

      <form onSubmit={handleCreateOrUpdatePortfolio} className="space-y-4 max-w-2xl mb-12">
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Project Title</label>
          <input required type="text" value={portTitle} onChange={(e) => setPortTitle(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Category</label>
          <input required type="text" value={portCategory} onChange={(e) => setPortCategory(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Project Image (Optional)</label>
          {portExistingImage && <div className="mb-2"><img src={portExistingImage} alt="Current" className="h-16 rounded border border-white/10" /></div>}
          <input type="file" accept="image/*" onChange={(e) => setPortImage(e.target.files[0])} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/20 file:text-brand-primary-light hover:file:bg-brand-primary/30" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Description</label>
          <textarea required value={portDesc} onChange={(e) => setPortDesc(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-32"></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-brand-primary px-6 py-2 rounded-lg font-bold disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (editingPortId ? 'Update Project' : 'Add Project')}
        </button>
      </form>

      <div className="bg-[#161816] p-8 rounded-xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Portfolio History</h2>
        <div className="space-y-4">
          {portfolios.map(port => (
            <div key={port.id} className="flex items-center justify-between bg-brand-bg p-4 rounded-lg border border-white/5">
              <div className="flex items-center gap-4">
                <img src={port.imageUrl} alt={port.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h4 className="font-bold text-white">{port.title}</h4>
                  <p className="text-sm text-brand-text-muted">{port.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditPort(port)} className="px-3 py-1 bg-brand-primary/20 text-brand-primary-light rounded hover:bg-brand-primary/40 transition-colors">Edit</button>
                <button onClick={() => handleDeletePort(port.id)} className="px-3 py-1 bg-brand-danger/20 text-brand-danger rounded hover:bg-brand-danger/40 transition-colors">Delete</button>
              </div>
            </div>
          ))}
          {portfolios.length === 0 && <div className="text-brand-text-muted">No projects found.</div>}
        </div>
      </div>
    </>
  );
}
