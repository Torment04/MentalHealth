import React from 'react';
import { Calendar, Heart } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Speakers from './Speakers';
import Sponsors from './Sponsors';

function App() {
  function HomePage() {
    return (
      <>
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 md:ml-12">
              <h1 className="text-7xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
                <span className="block">Nurture your mind</span>
                <span className="block text-teal-300">embrace wellness</span>
                <span className="block">find balance.</span>
              </h1>
              <p className="text-white text-xl mb-10 max-w-md drop-shadow-md">
                Join UDST's premier mental health event featuring expert speakers,
                interactive workshops, and community support resources.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-12">
                <a href="https://www.udst.edu.qa/" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-medium px-6 py-2 bg-black/50 rounded-full shadow-md border border-teal-900/50 hover:bg-teal-500 hover:text-white hover:border-teal-400 transition-all duration-300">UDST</a>
                <a href="https://hamad.qa/EN/Hospitals-and-services/HMC-Mental-Health-Service/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-medium px-6 py-2 bg-black/50 rounded-full shadow-md border border-teal-900/50 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300">Mental Health Qatar</a>
                <a href="https://www.udst.edu.qa/sport-and-wellness/wellness-programs" target="_blank" rel="noopener noreferrer" className="text-white text-lg font-medium px-6 py-2 bg-black/50 rounded-full shadow-md border border-teal-900/50 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all duration-300">Wellness Center</a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-teal-900/50">
                <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white p-6 rounded-xl mb-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg text-white font-medium">MindfulUDST Event</p>
                      <p className="text-base text-white/90">April 10-12, 2025</p>
                    </div>
                  </div>
                  <p className="text-lg text-white mb-2 font-medium">Event Highlights</p>
                  <p className="text-4xl font-bold mb-2">15+ Speakers</p>
                  <p className="text-lg text-white">UDST Main Campus</p>
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-lg text-white font-medium">3 Days</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold mr-3">FREE</span>
                      <div className="w-9 h-9 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="text-white text-lg font-bold">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center p-3 bg-black/40 rounded-lg border border-teal-900/30">
                    <input type="radio" id="student" name="attendee" className="h-4 w-4 text-teal-400" defaultChecked />
                    <label htmlFor="student" className="ml-3 flex items-center text-white text-lg">
                      <Calendar className="h-6 w-6 mr-2 text-teal-300" />
                      <span>Student Attendee</span>
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-black/40 rounded-lg border border-teal-900/30">
                    <input type="radio" id="faculty" name="attendee" className="h-4 w-4 text-teal-400" />
                    <label htmlFor="faculty" className="ml-3 text-white text-lg">Faculty/Staff Member</label>
                  </div>
                  <Link to="/speakers" className="block w-full bg-teal-600 text-white text-xl py-4 rounded-xl hover:bg-teal-500 transition-colors shadow-lg font-medium text-center">
                    Reserve Your Spot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details Section */}
        <div className="container mx-auto px-6 py-12 bg-black/70 backdrop-blur-md rounded-t-3xl mt-12 border-t border-teal-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-teal-300 text-2xl font-bold uppercase tracking-wide mb-2">EVENT SCHEDULE</h2>
              <div className="w-24 h-1 bg-teal-500/50 mx-auto"></div>
            </div>
            {/* Day sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Day 1 */}
              <div className="bg-black/60 p-6 rounded-xl hover:shadow-lg transition-shadow border border-teal-900/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Day 1 - Opening & Wellness</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-teal-300 font-semibold w-20 text-lg">9:00 AM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Opening Ceremony</h4>
                      <p className="text-gray-300 text-base">Welcome address</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-teal-300 font-semibold w-20 text-lg">11:00 AM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Mindfulness</h4>
                      <p className="text-gray-300 text-base">Meditation session</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-teal-300 font-semibold w-20 text-lg">2:00 PM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Panel Talk</h4>
                      <p className="text-gray-300 text-base">Expert discussion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-black/60 p-6 rounded-xl hover:shadow-lg transition-shadow border border-teal-900/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Day 2 - Skills & Strategies</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-cyan-300 font-semibold w-20 text-lg">10:00 AM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Workshop</h4>
                      <p className="text-gray-300 text-base">Stress management</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-300 font-semibold w-20 text-lg">1:00 PM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Sessions</h4>
                      <p className="text-gray-300 text-base">Topic breakouts</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-cyan-300 font-semibold w-20 text-lg">3:30 PM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Activities</h4>
                      <p className="text-gray-300 text-base">Team building</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="bg-black/60 p-6 rounded-xl hover:shadow-lg transition-shadow border border-teal-900/30 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Day 3 - Community</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-blue-300 font-semibold w-20 text-lg">9:30 AM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Resource Fair</h4>
                      <p className="text-gray-300 text-base">Explore resources</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-300 font-semibold w-20 text-lg">11:30 AM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Network</h4>
                      <p className="text-gray-300 text-base">Support building</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-300 font-semibold w-20 text-lg">2:30 PM</span>
                    <div>
                      <h4 className="font-medium text-white text-xl">Closing</h4>
                      <p className="text-gray-300 text-base">Final remarks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen relative bg-[#0a0a20]">
        {/* Background Image with darker overlay */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-50" 
             style={{ 
               backgroundImage: "url('https://images.unsplash.com/photo-1591382696684-38c427c7547a?q=80&w=2070&auto=format&fit=crop')", 
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        {/* Content Container */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="h-10 w-10 text-teal-300" />
                <Link to="/" className="ml-2 text-3xl font-bold text-white">MindfulUDST</Link>
              </div>
              
              {/* Right Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/speakers" className="text-white text-xl hover:text-teal-300 transition-colors font-medium px-6 py-2 border-b-2 border-transparent hover:border-teal-300">Speakers</Link>
                <Link to="/sponsors" className="text-white text-xl hover:text-teal-300 transition-colors font-medium px-6 py-2 border-b-2 border-transparent hover:border-teal-300">Sponsors</Link>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/sponsors" element={<Sponsors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;