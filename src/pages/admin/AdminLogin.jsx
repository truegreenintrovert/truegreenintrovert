import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminName', data.name);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-bg flex items-center justify-center">
      <div className="container max-w-md">
        <div className="bg-[#161816] p-10 rounded-[30px] border border-white/5 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-brand-text-muted">Sign in to manage your portfolio</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-brand-danger/10 border border-brand-danger/30 text-brand-danger rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light transition-colors" 
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-bg border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-brand-primary-light transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-primary hover:bg-brand-primary-light text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <p className="text-xs text-brand-text-muted text-center mt-4">
              Demo access: admin@example.com / admin
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
