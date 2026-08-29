export default function AboutSection() {
  return (
    <section id="about" className="section bg-brand-bg">
      <div className="container">
        <h2 className="section-title">Some Memories &amp; <span>Some Experience</span></h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-stretch mt-12">
          <div className="flex-1 p-10 rounded-3xl glass">
            <h3 className="text-brand-danger text-3xl mb-6">Hi! I'm Yogesh</h3>
            <p className="text-lg mb-8 text-brand-text-muted">
              On a mission of exploring and contributing to the actual development of this beautiful world using Tech environment and skillset development. I believe if Technology, humanity, and creativity combined, may create a different realm of innovation.
            </p>
            
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex gap-6 items-start pl-5 border-l-2 border-brand-primary-light">
                <div className="font-bold text-brand-accent-light min-w-[120px]">2022 - Present</div>
                <div>
                  <h4 className="text-[1.2rem] mb-1">Founder &amp; Director</h4>
                  <p className="text-[0.95rem] mb-0">Fruitenium Technologies</p>
                </div>
              </div>
              <div className="flex gap-6 items-start pl-5 border-l-2 border-brand-primary-light">
                <div className="font-bold text-brand-accent-light min-w-[120px]">2017 - 2021</div>
                <div>
                  <h4 className="text-[1.2rem] mb-1">Bachelor of Technology</h4>
                  <p className="text-[0.95rem] mb-0">Govt. Eng. Collage Bilaspur (C. G.)</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[1.4rem] mb-4">Skills</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#290585]/40 text-[#a78bfa] py-2 px-5 rounded-full text-[0.9rem] font-semibold border border-[#a78bfa]/20">Web Design &amp; Development</span>
                <span className="bg-[#290585]/40 text-[#a78bfa] py-2 px-5 rounded-full text-[0.9rem] font-semibold border border-[#a78bfa]/20">Project Management</span>
                <span className="bg-[#290585]/40 text-[#a78bfa] py-2 px-5 rounded-full text-[0.9rem] font-semibold border border-[#a78bfa]/20">JavaScript | Python</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {/* Replace with actual portrait image */}
            <div className="w-full h-full min-h-[400px] rounded-3xl bg-gradient-to-br from-brand-bg-secondary to-brand-primary flex items-center justify-center text-brand-text-muted font-semibold border border-dashed border-white/10">
              <span>Portrait Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
