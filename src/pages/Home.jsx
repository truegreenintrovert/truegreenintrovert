import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-[-1] bg-brand-bg">
        <div className="absolute rounded-full blur-[100px] opacity-50 animate-float w-[600px] h-[600px] bg-brand-primary -top-[100px] -right-[100px]"></div>
        <div className="absolute rounded-full blur-[100px] opacity-50 animate-float w-[500px] h-[500px] bg-brand-accent -bottom-[150px] -left-[100px] [animation-delay:-10s]"></div>
      </div>
      <div className="container relative z-10">
        <div className="max-w-[800px] mx-auto text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-[4.5rem] font-bold mb-6 leading-[1.1]">
            Explore, Contribute, <span className="bg-gradient-to-br from-[#a78bfa] via-[#818cf8] to-[#3b82f6] text-transparent bg-clip-text">Innovate</span>
          </h1>
          <p className="text-xl text-brand-text-muted mb-10 max-w-[600px] mx-auto">
            On a mission to explore, contribute, and innovate in the tech world for the actual development of our beautiful world.
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <Link to="/portfolio" className="inline-block py-[14px] px-8 text-base font-semibold rounded-full cursor-pointer uppercase tracking-[1px] transition-all bg-brand-text text-brand-bg hover:bg-brand-text-muted hover:text-brand-bg">View Portfolio</Link>
            <Link to="/contact" className="inline-block py-[14px] px-8 text-base font-semibold rounded-full cursor-pointer uppercase tracking-[1px] transition-all bg-transparent text-brand-text border border-white/20 hover:bg-white/10 hover:border-white/40">Get in Touch</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
