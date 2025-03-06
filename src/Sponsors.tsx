import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Dumbbell, Shield, Plane, Radio, ExternalLink } from 'lucide-react';

function Sponsors() {
  const sponsors = [
    {
      name: "Qatar Foundation",
      logo: <Building2 className="h-16 w-16" />,
      description: "Supporting education and research excellence in Qatar and beyond. Leading the way in educational innovation and community development.",
      website: "www.qf.org.qa",
      color: "from-teal-500 to-emerald-500",
      animationDelay: 0
    },
    {
      name: "Qatar National Bank",
      logo: <Shield className="h-16 w-16" />,
      description: "Qatar's largest financial institution, supporting mental health initiatives and community wellness programs.",
      website: "www.qnb.com",
      color: "from-purple-500 to-indigo-500",
      animationDelay: 0.2
    },
    {
      name: "Ooredoo",
      logo: <Globe className="h-16 w-16" />,
      description: "Enriching people's digital lives while promoting mental health awareness through technology and innovation.",
      website: "www.ooredoo.qa",
      color: "from-red-500 to-orange-500",
      animationDelay: 0.4
    },
    {
      name: "Qatar Airways",
      logo: <Plane className="h-16 w-16" />,
      description: "Connecting the world while prioritizing passenger wellbeing and supporting mental health programs globally.",
      website: "www.qatarairways.com",
      color: "from-blue-500 to-cyan-500",
      animationDelay: 0.6
    },
    {
      name: "Al Jazeera",
      logo: <Radio className="h-16 w-16" />,
      description: "Global media network committed to raising awareness about mental health through impactful storytelling.",
      website: "www.aljazeera.com",
      color: "from-yellow-500 to-amber-500",
      animationDelay: 0.8
    },
    {
      name: "Aspire Zone",
      logo: <Dumbbell className="h-16 w-16" />,
      description: "Qatar's premier sports city promoting physical and mental wellness through world-class facilities.",
      website: "www.aspirezone.qa",
      color: "from-pink-500 to-rose-500",
      animationDelay: 1
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="min-h-screen relative bg-[#0a0a20]">
        {/* Background Image with darker overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1591382696684-38c427c7547a?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        
        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-6 py-12">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Amazing Sponsors
            </motion.h1>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet the organizations making mental health awareness possible at UDST
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sponsor.animationDelay }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-10 rounded-xl group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative h-full bg-black/60 backdrop-blur-md border border-gray-800 rounded-xl p-8 flex flex-col">
                    {/* Animated Background Pattern */}
                    <motion.div 
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      style={{
                        backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Logo with Glow Effect */}
                    <motion.div 
                      className={`w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br ${sponsor.color} p-4 group-hover:shadow-lg group-hover:shadow-${sponsor.color.split(' ')[1]}/20 flex items-center justify-center`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white flex items-center justify-center w-full h-full">
                        {sponsor.logo}
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white text-center mb-3">
                      {sponsor.name}
                    </h3>

                    <p className="text-gray-300 text-center mb-6 flex-grow">
                      {sponsor.description}
                    </p>

                    {/* Website Link with Animation */}
                    <motion.a
                      href={`https://${sponsor.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 text-white group/link mt-auto"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`bg-gradient-to-r ${sponsor.color} bg-clip-text text-transparent font-medium`}>
                        Visit Website
                      </span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsors; 