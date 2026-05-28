import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-transparent text-white overflow-hidden border-t border-white/5 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* LEFT SIDE: The Cinematic Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="w-full lg:w-1/2 flex justify-center relative mt-8 lg:mt-0"
          >
            {/* Background Breathing Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>

            {/* THE NEW NEON HALO CONTAINER */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-1.5 bg-gradient-to-tr from-blue-500/40 via-purple-500/20 to-blue-500/40 shadow-[0_0_40px_rgba(37,99,235,0.2)] group cursor-none">
              {/* Inner Masking Container (Creates the sharp dark border) */}
              <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-[#050b14] bg-[#050b14] relative z-10">
                {/* THE ACTUAL PHOTO: Full color, clean zoom on hover */}
                <img
                  src="/profile.jpeg"
                  alt="Swapnil Kumar"
                  className="w-full h-full object-cover grayscale-[80%] contrast-125 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* --- FLOATING 3D TECH BADGE --- */}
              <div className="absolute -bottom-4 -right-4 md:-right-8 bg-[#0a101d]/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-3 md:p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:-translate-y-2 group-hover:border-blue-500/50 transition-all duration-500 z-20">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500/20 transition-colors">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-blue-400 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pr-2 md:pr-4">
                    <span className="text-white font-black text-sm md:text-base tracking-wide leading-tight">
                      Full-Stack
                    </span>
                    <span className="text-blue-400 text-[10px] md:text-xs uppercase tracking-widest font-bold">
                      Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Typography & Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-start lg:pl-4"
          >
            {/* Perfectly Left-Aligned Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400 drop-shadow-lg">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

            {/* High-Contrast Text Blocks */}
            <div className="space-y-6 text-gray-400 text-[17px] leading-relaxed">
              <p>
                I am a{" "}
                <span className="text-gray-100 font-bold">
                  second-year BCA student
                </span>{" "}
                with a deep passion for software development and solving complex
                problems. My journey into tech has been driven by a relentless
                curiosity to understand how things work under the hood, leading
                me to specialize in{" "}
                <span className="text-blue-400 font-bold">
                  full-stack MERN development
                </span>
                .
              </p>
              <p>
                Beyond just writing code, I strongly believe in the power of
                clear documentation and building scalable architectures. Whether
                I am integrating secure payment gateways, designing databases,
                or managing real-time data flows, I focus on delivering clean,
                maintainable, and user-centric digital experiences.
              </p>
            </div>

            {/* The "Live Status" Radar Badge */}
            <div className="mt-10 inline-flex items-center gap-4 px-6 py-3.5 rounded-xl bg-[#0a101d] border border-gray-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-blue-500/50 transition-colors duration-300 cursor-none group">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                Actively seeking internship & full-time opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
