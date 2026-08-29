import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });
  const [status, setStatus] = useState('');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', content: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <section className="min-h-screen pt-32 pb-20 bg-brand-bg flex items-center">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Info */}
          <div>
            <h1 className="text-5xl font-heading font-bold mb-6 leading-tight">Let's build something <span className="text-brand-primary-light">amazing</span> together.</h1>
            <p className="text-brand-text-muted text-lg mb-10">Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-[#161816] p-4 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary-light rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-brand-text-muted">{settings?.email || 'yogesh@fruitenium.in'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#161816] p-4 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary-light rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-brand-text-muted">{settings?.mobile || '+91-9521876282'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#161816] p-10 rounded-[30px] border border-white/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-primary/20 rounded-full blur-2xl"></div>
            
            <h2 className="text-2xl font-bold mb-6 font-heading">Send a Message</h2>
            
            {status === 'success' && <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-xl">Message sent successfully!</div>}
            {status === 'error' && <div className="mb-6 p-4 bg-brand-danger/20 text-brand-danger rounded-xl">Failed to send message. Please try again.</div>}
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-brand-text-muted mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light focus:neon-box transition-all" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm text-brand-text-muted mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light focus:neon-box transition-all" placeholder="Enter your email" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-brand-text-muted mb-2">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light focus:neon-box transition-all" placeholder="How can I help you?" />
              </div>
              <div>
                <label className="block text-sm text-brand-text-muted mb-2">Message</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required rows="5" className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light focus:neon-box transition-all resize-none" placeholder="Write your message here..."></textarea>
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-4 rounded-xl transition-all duration-300 neon-box hover:neon-glow hover:scale-[1.02]">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
