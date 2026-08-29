import React, { useState, useEffect } from 'react';

export default function ManageBlog({ token, uploadImage, setMessage }) {
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [blogExistingImage, setBlogExistingImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/blog').then(res => res.json()).then(data => setBlogs(data));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setEditingBlogId(null); setBlogTitle(''); setBlogCategory(''); 
    setBlogExcerpt(''); setBlogContent(''); setBlogImage(null); setBlogExistingImage('');
  };

  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setBlogTitle(blog.title);
    setBlogCategory(blog.category);
    setBlogExcerpt(blog.excerpt);
    setBlogContent(blog.content);
    setBlogExistingImage(blog.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + `/api/blog/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessage('Blog deleted successfully');
        fetchBlogs();
      }
    } catch (err) {}
  };

  const handleCreateOrUpdateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      let finalImageUrl = blogExistingImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop';
      if (blogImage) finalImageUrl = await uploadImage(blogImage);

      const url = editingBlogId ? `/api/blog/${editingBlogId}` : '/api/blog';
      const method = editingBlogId ? 'PUT' : 'POST';

      const res = await fetch(import.meta.env.VITE_API_URL + url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          title: blogTitle, category: blogCategory, excerpt: blogExcerpt,
          content: blogContent, imageUrl: finalImageUrl, readTime: '5 min read',
          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        })
      });
      if (res.ok) {
        setMessage(`Blog ${editingBlogId ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchBlogs();
      } else setMessage('Failed to save blog.');
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
          {editingBlogId ? 'Edit Post' : 'Add New Post'}
        </h2>
        {editingBlogId && (
          <button onClick={resetForm} className="text-sm text-brand-text-muted hover:text-white">Cancel Edit</button>
        )}
      </div>

      <form onSubmit={handleCreateOrUpdateBlog} className="space-y-4 max-w-2xl mb-12">
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Title</label>
          <input required type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Category</label>
          <input required type="text" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Blog Image (Optional)</label>
          {blogExistingImage && <div className="mb-2"><img src={blogExistingImage} alt="Current" className="h-16 rounded border border-white/10" /></div>}
          <input type="file" accept="image/*" onChange={(e) => setBlogImage(e.target.files[0])} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/20 file:text-brand-primary-light hover:file:bg-brand-primary/30" />
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Excerpt</label>
          <textarea required value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-24"></textarea>
        </div>
        <div>
          <label className="block text-sm text-brand-text-muted mb-1">Content</label>
          <textarea required value={blogContent} onChange={(e) => setBlogContent(e.target.value)} className="w-full bg-brand-bg border border-white/10 rounded-lg p-3 text-white h-48"></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="bg-brand-primary px-6 py-2 rounded-lg font-bold disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (editingBlogId ? 'Update Post' : 'Publish Post')}
        </button>
      </form>

      <div className="bg-[#161816] p-8 rounded-xl border border-white/5">
        <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Blog History</h2>
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog.id} className="flex items-center justify-between bg-brand-bg p-4 rounded-lg border border-white/5">
              <div className="flex items-center gap-4">
                <img src={blog.imageUrl} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h4 className="font-bold text-white">{blog.title}</h4>
                  <p className="text-sm text-brand-text-muted">{blog.date} &bull; {blog.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditBlog(blog)} className="px-3 py-1 bg-brand-primary/20 text-brand-primary-light rounded hover:bg-brand-primary/40 transition-colors">Edit</button>
                <button onClick={() => handleDeleteBlog(blog.id)} className="px-3 py-1 bg-brand-danger/20 text-brand-danger rounded hover:bg-brand-danger/40 transition-colors">Delete</button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && <div className="text-brand-text-muted">No blogs found.</div>}
        </div>
      </div>
    </>
  );
}
