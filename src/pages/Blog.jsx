import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../lib/api';
import { mediaUrl } from '../lib/mediaUrl';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL + '/api/blog')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setBlogs(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBlogs([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 bg-brand-bg">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-bold mb-4">Insights & <span className="text-brand-primary-light neon-text">Articles</span></h1>
          <p className="text-brand-text-muted text-lg max-w-2xl mx-auto">Thoughts on technology, software development, entrepreneurship, and the future of AI.</p>
        </div>
        
        {isLoading ? (
          <div className="text-center text-brand-text-muted py-20">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-brand-text-muted py-20">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <article key={blog.id} className="group bg-[#161816] rounded-2xl overflow-hidden border border-transparent hover:border-brand-primary-light neon-border-hover transition-all duration-300 flex flex-col h-full shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img src={mediaUrl(blog.imageUrl)} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-brand-accent/20 backdrop-blur-md text-brand-accent-light py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md neon-box">{blog.category}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col grow">
                  <div className="flex justify-between items-center mb-3 text-sm text-brand-text-muted">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 leading-snug group-hover:text-brand-primary-light transition-colors">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-brand-text-muted line-clamp-3 mb-6 grow">{blog.excerpt}</p>
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <Link to={`/blog/${blog.id}`} className="inline-flex items-center text-brand-danger font-semibold hover:text-white transition-colors group/link">
                      Read Article 
                      <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
