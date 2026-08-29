import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `/api/blog/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blog post:", err);
        setError('Failed to load the article.');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-bg flex items-center justify-center">
        <div className="text-brand-text-muted text-xl animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-bg flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
        <p className="text-brand-text-muted mb-8">{error || "This article doesn't exist or has been removed."}</p>
        <Link to="/blog" className="bg-brand-primary hover:bg-brand-primary-light text-white px-8 py-3 rounded-full font-bold transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-20 bg-brand-bg">
      <div className="container max-w-4xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <Link to="/blog" className="inline-flex items-center text-brand-text-muted hover:text-brand-primary-light transition-colors mb-8 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to all articles
          </Link>
          
          <div className="mb-6">
            <span className="bg-brand-primary/20 text-brand-primary-light border border-brand-primary/50 py-1.5 px-4 rounded-full text-sm font-semibold uppercase tracking-widest inline-block neon-box">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white neon-text mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-brand-text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-16 border border-brand-primary-light/50 neon-box relative aspect-video">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-brand-primary-light hover:prose-a:text-brand-primary prose-img:rounded-2xl">
          {/* We use pre-wrap so line breaks in the text area are preserved */}
          <div className="whitespace-pre-wrap text-brand-text leading-relaxed text-lg">
            {post.content}
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
          <Link to="/blog" className="text-brand-primary-light hover:text-brand-primary transition-colors font-semibold flex items-center gap-2 group">
             <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
             Read more articles
          </Link>
          
          <div className="flex gap-4">
             <button className="w-10 h-10 rounded-full bg-brand-primary/20 hover:bg-brand-primary-light flex items-center justify-center text-white neon-box transition-all duration-300 hover:neon-glow hover:scale-110">
               <i className="fab fa-twitter"></i>
             </button>
             <button className="w-10 h-10 rounded-full bg-brand-primary/20 hover:bg-brand-primary-light flex items-center justify-center text-white neon-box transition-all duration-300 hover:neon-glow hover:scale-110">
               <i className="fab fa-linkedin-in"></i>
             </button>
          </div>
        </div>
      </div>
    </article>
  );
}
