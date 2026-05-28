import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here!
  };

  return (
    <section id="contact" className="py-24 bg-transparent border-t border-white/5 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* --- LEFT SIDE: Typography & Direct Info --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col items-start lg:pr-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400"
            >
              Let's build something together.
            </motion.h2>
            
            <motion.div variants={itemVariants} className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] mb-8"></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md"
            >
              I am currently looking for internship opportunities! Whether you have a project in mind, a question, or just want to say hi, my inbox is always open.
            </motion.p>

            {/* UPGRADE: Premium Direct Contact Pill */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest pl-1 border-l-2 border-blue-500/50">
                Direct Contact
              </span>
              <a 
                href="mailto:your.email@example.com" 
                className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#050b14]/80 backdrop-blur-md border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 cursor-none w-max"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 transition-colors">
                  <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold tracking-wide">your.email@example.com</div>
                  <div className="text-gray-500 text-xs mt-0.5 group-hover:text-gray-400 transition-colors">Average response time: 24h</div>
                </div>
              </a>
            </motion.div>
          </motion.div>


          {/* --- RIGHT SIDE: The Holographic Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="relative group w-full"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-500 pointer-events-none"></div>

            {/* Form Container */}
            <div className="relative bg-[#050b14]/90 backdrop-blur-2xl border border-gray-800 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden">
              
              {/* Internal Glare */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* UPGRADE: 2-Column Grid for Inputs on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 pl-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="John Doe"
                      required
                      className="w-full bg-[#0a101d] border border-gray-700/50 rounded-xl px-5 py-3.5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/80 focus:bg-blue-500/5 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-none"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 pl-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#0a101d] border border-gray-700/50 rounded-xl px-5 py-3.5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/80 focus:bg-blue-500/5 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 cursor-none"
                    />
                  </div>
                </div>

                <div className="relative mt-2">
                  <label htmlFor="message" className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2 pl-1">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    rows="4"
                    placeholder="Hello, I'd like to talk about an opportunity..."
                    required
                    className="w-full bg-[#0a101d] border border-gray-700/50 rounded-xl px-5 py-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/80 focus:bg-blue-500/5 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none cursor-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="group/btn relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-none"
                  >
                    {/* Sweeping Hover Glare */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    
                    <span className="tracking-wide relative z-10">Send Message</span>
                    
                    <svg 
                      className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;