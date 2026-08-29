import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../assets/logo_truegreenintrovert.jpg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (path) => {
    const isActive = location.pathname === path;
    return `text-[0.95rem] font-medium uppercase tracking-[1px] transition-all duration-300 ${isActive ? 'text-brand-primary-light neon-text' : 'text-brand-text-muted hover:text-white hover:neon-text'}`;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${isScrolled ? 'py-4 bg-brand-bg/80 border-b border-brand-primary/20 backdrop-blur-md shadow-[0_4px_30px_rgba(42,90,138,0.1)]' : 'py-6'}`}>
      <div className="container flex justify-between items-center">
        <div className="logo">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="Profile Logo" className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary-light neon-box" />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li><Link to="/" className={navItemClass('/')}>Home</Link></li>
            <li><Link to="/portfolio" className={navItemClass('/portfolio')}>Portfolio</Link></li>
            <li><Link to="/blog" className={navItemClass('/blog')}>Blog</Link></li>
            <li><Link to="/contact" className={navItemClass('/contact')}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
