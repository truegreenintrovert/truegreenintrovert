export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Building Skills for Entrepreneurs",
      excerpt: "Develop life-related applied skills and acquire knowledge with educational content designed for entrepreneurs. Enhance trading skills and psychology. Explore the impact of Artificial Intelligence on the changing tech world.",
      date: "Aug 2026",
      readTime: "5 min read",
      category: "Educational"
    },
    {
      id: 2,
      title: "Is Learning Coding Still Helpful in This Era of AI? (2025 Perspective)",
      excerpt: "With AI tools writing code faster than ever, we explore whether learning traditional coding is still a valuable skill for the future.",
      date: "May 2025",
      readTime: "4 min read",
      category: "Tech Trends"
    },
    {
      id: 3,
      title: "How to Change Windows Startup Boot Image Using HackBGRT",
      excerpt: "A complete guide for 2025 on how to customize your Windows startup logo safely using the HackBGRT tool.",
      date: "Jun 2024",
      readTime: "6 min read",
      category: "Tutorial"
    },
    {
      id: 4,
      title: "How to Run Ubuntu Server on VirtualBox",
      excerpt: "Step-by-step guide on setting up a virtualized Ubuntu Server environment using VirtualBox.",
      date: "May 2025",
      readTime: "7 min read",
      category: "SysAdmin"
    }
  ];

  return (
    <section id="blog" className="section relative bg-brand-bg">
      <div className="container">
        <h2 className="section-title">Latest <span className="text-brand-primary-light">Articles</span></h2>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 mt-12">
          {blogs.map(blog => (
            <article key={blog.id} className="p-8 rounded-[20px] flex flex-col transition-all duration-400 hover:-translate-y-[5px] hover:bg-[#161816]/90 glass border border-transparent neon-border-hover">
              <div className="flex justify-between items-center mb-5 text-[0.85rem]">
                <span className="bg-brand-accent/20 text-brand-accent-light py-1 px-3 rounded-[30px] font-semibold uppercase tracking-[0.5px] neon-box">{blog.category}</span>
                <span className="text-brand-text-muted">{blog.date}</span>
              </div>
              <h3 className="text-[1.4rem] mb-4 leading-[1.4]">{blog.title}</h3>
              <p className="text-brand-text-muted grow mb-6">{blog.excerpt}</p>
              <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[0.9rem]">
                <span className="text-brand-text-muted">{blog.readTime}</span>
                <a href="#" className="text-brand-danger font-semibold hover:text-white transition-colors">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
