import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../assets/logo_truegreenintrovert.jpg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${isScrolled || isMobileMenuOpen ? 'py-4 bg-brand-bg/95 border-b border-brand-primary/20 backdrop-blur-md shadow-[0_4px_30px_rgba(42,90,138,0.1)]' : 'py-6 bg-transparent'}`}>
      <div className="container flex justify-between items-center relative z-[1001]">
        <div className="logo">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logoImage} alt="Profile Logo" className="w-10 h-10 rounded-full object-cover border-2 border-brand-primary-light neon-box" />
          </Link>
        </div>
        
        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li><Link to="/" className={navItemClass('/')}>Home</Link></li>
            <li><Link to="/portfolio" className={navItemClass('/portfolio')}>Portfolio</Link></li>
            <li><Link to="/blog" className={navItemClass('/blog')}>Blog</Link></li>
            <li><Link to="/contact" className={navItemClass('/contact')}>Contact</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav className={`fixed inset-0 bg-brand-bg/95 backdrop-blur-lg flex flex-col items-center justify-center transition-transform duration-300 md:hidden z-[1000] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col gap-8 text-center text-xl">
          <li><Link to="/" onClick={toggleMobileMenu} className={navItemClass('/')}>Home</Link></li>
          <li><Link to="/portfolio" onClick={toggleMobileMenu} className={navItemClass('/portfolio')}>Portfolio</Link></li>
          <li><Link to="/blog" onClick={toggleMobileMenu} className={navItemClass('/blog')}>Blog</Link></li>
          <li><Link to="/contact" onClick={toggleMobileMenu} className={navItemClass('/contact')}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
