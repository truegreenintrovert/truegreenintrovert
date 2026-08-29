import React from 'react';
import ridiImage from '../../assets/ridi-hms.png';

export default function PortfolioSection() {
  return (
    <div id="portfolio" className="py-[60px] px-5 text-white bg-brand-bg-secondary">
      {/* Memories & Experience Section */}
      <section className="mb-20 container">
        <h1 className="text-brand-yellow text-center mb-10 text-4xl font-heading font-bold">
          Some Memories &amp; Some Experience
        </h1>

        <div className="flex flex-wrap gap-10 justify-center">
          <div className="flex-[1_1_400px] max-w-[600px]">
            <h4 className="leading-relaxed mb-8 text-xl font-medium">
              I'm Yogesh, on a mission of exploring and contributing to the actual development of this beautiful world using Tech environment and skillset development. I believe If Technology, humanity, and creativity combined, may create a different realm of innovation.
            </h4>

            <div className="mb-5">
              <p className="m-0 font-bold">2022 - Present</p>
              <h6 className="text-lg">Founder &amp; Director Fruitenium Technologies</h6>
            </div>

            <div className="mb-8">
              <p className="m-0 font-bold">2017 - 2021</p>
              <h6 className="text-lg">Bachelor of Technology</h6>
              <p className="m-0">Govt. Eng. Collage Bilaspur (C. G.)</p>
            </div>

            <div>
              <h6 className="underline mb-2.5 text-lg">Skills</h6>
              <p className="my-1.5">Web Design &amp; Development</p>
              <p className="my-1.5">Project Management</p>
              <p className="my-1.5">Java Script | Python</p>
            </div>
          </div>

          <div className="flex-[1_1_300px] max-w-[400px]">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=365,fit=crop/dJoBnW9aGBfplrwe/img3-AGB2wXn7PEhEVxKq.png" 
              alt="Yogesh" 
              className="w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container">
        <h1 className="text-brand-yellow text-center mb-[60px] text-4xl font-heading font-bold">
          Unlocking Innovation through Tech Development
        </h1>

        {/* Project 1 */}
        <div className="mb-20">
          <h5 className="text-center mb-2.5 text-xl font-heading">Web Development</h5>
          <h3 className="text-center mb-8 text-3xl font-heading">E-commerce Website</h3>
          
          <div className="flex flex-wrap gap-[30px] items-center justify-center">
            <div className="flex-[1_1_300px] max-w-[400px]">
              <p className="text-[1.2rem] leading-relaxed">
                Developed a fully functional turban rental website for a client, including admin Dashboard with supa-base authentication, inventory management.
              </p>
            </div>
            <div className="flex-[2_1_500px] max-w-[800px]">
              <img 
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1093,h=605,fit=crop/dJoBnW9aGBfplrwe/pagdiwala-home-page-AE0PJJD3QDsow5G5.png" 
                alt="E-commerce Website" 
                className="w-full rounded-[10px]"
              />
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="mb-20">
          <h5 className="text-center mb-2.5 text-xl font-heading">Mobile App Development</h5>
          <h3 className="hidden text-center mb-8 text-3xl font-heading">Car Rental App</h3>
          
          <div className="flex flex-wrap-reverse gap-[30px] items-center justify-center">
            <div className="flex-[1_1_300px] max-w-[400px] text-center">
              <img 
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=372,h=560,fit=crop/dJoBnW9aGBfplrwe/srt-m2W8ZZZpPquQO5nG.png" 
                alt="Mobile App" 
                className="w-full max-w-[300px] rounded-[10px] mx-auto"
              />
            </div>
            <div className="flex-[1_1_300px] max-w-[400px]">
              <p className="text-[1.2rem] leading-relaxed">
                Created a mobile app for a Car rental that rents car on multiple cities in Chhattisgarh which includes simplicity and slick design
              </p>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="mb-20">
          <h5 className="text-center mb-8 text-[1.8rem] font-heading">Ridi Hospital Management Solution</h5>
          
          <div className="flex flex-wrap gap-[30px] items-center justify-center">
            <div className="flex-[1_1_300px] max-w-[400px]">
              <p className="text-[1.2rem] leading-relaxed">
                Developed a Hospital management system as a web interface
              </p>
            </div>
            <div className="flex-[2_1_500px] max-w-[800px]">
              <img 
                src={ridiImage} 
                alt="Ridi Hospital Management Solution" 
                className="w-full rounded-[10px]"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
