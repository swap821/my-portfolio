const Hero = () => {
  return (
    <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center bg-transparent pt-20 pb-10 px-6">
      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* THE FIX: Brightened to blue-300 and increased tracking for better contrast and eye-flow */}
        <p className="text-blue-300 font-mono text-lg mb-4 tracking-widest drop-shadow-sm">
          Hi there, I am
        </p>
        
        {/* UPGRADE 1: The subtle metallic gradient text */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-50 to-blue-300 mb-4 tracking-tight drop-shadow-lg pb-2">
          Swapnil Kumar.
        </h1>
        
        <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8 drop-shadow-md">
          I build intelligent systems.
        </h2>
        
        {/* UPGRADE 2: Scannable blue highlights for key terms — UPDATED for AI/ML positioning */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          I am a <span className="text-blue-400 font-semibold">Full-Stack Developer & AI Enthusiast</span> specializing in building exceptional, high-performance digital experiences. Currently focused on <span className="text-blue-400 font-semibold">Full-Stack AI applications</span> and <span className="text-blue-400 font-semibold">Generative AI integrations</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 justify-center items-center">
          
          {/* UPGRADE 3: Added flex and icons to buttons */}
          <a 
            href="#projects" 
            className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            Check Out My Projects
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          {/* Linked to your actual GitHub Profile! */}
          <a 
            href="https://github.com/swap821" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-3 px-8 py-4 bg-gray-900/80 hover:bg-gray-800 text-white border border-gray-700 rounded-lg font-bold transition-all hover:-translate-y-1 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View GitHub
          </a>

          <a 
            href="/Resume.pdf" 
            download="Resume.pdf"
            className="flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-white/5 text-blue-400 hover:text-blue-300 border border-blue-500/50 hover:border-blue-400 rounded-lg font-bold transition-all hover:-translate-y-1 backdrop-blur-sm shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>

        </div>
      </div>
    </section>
  );
};

export default Hero;