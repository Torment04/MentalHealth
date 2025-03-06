import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Mail, Brain, Heart, Sparkles, Pill, Users, Apple } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Add these at the top of the file
const EMAILJS_SERVICE_ID = 'service_5wk8clf';
const EMAILJS_TEMPLATE_ID = 'template_6ntf89w';
const EMAILJS_PUBLIC_KEY = 'eXpZsD3U1zY8WzmJT';

// Initialize EmailJS once at the start
emailjs.init(EMAILJS_PUBLIC_KEY);

function Speakers() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Registration Counter Component
  function RegistrationCounter() {
    const [count, setCount] = useState(75); // Start with a lower initial count
    const [newRegistration, setNewRegistration] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState<null | 'success' | 'error'>(null);
    const [registrationStep, setRegistrationStep] = useState<'name' | 'email'>('name');
    const goal = 200; // Lower, more realistic goal
    const progress = Math.min((count / goal) * 100, 100);
  
    useEffect(() => {
      // More realistic registration simulation
      const interval = setInterval(() => {
        // Random increment between 0 and 2 with higher chance of 0
        const shouldIncrement = Math.random() < 0.3; // 30% chance of new registration
        if (shouldIncrement) {
          const increment = Math.floor(Math.random() * 2) + 1; // 1 or 2 new registrations
          setCount(prevCount => {
            const newCount = Math.min(prevCount + increment, goal);
            setNewRegistration(true);
            // Show animation for a shorter duration
            setTimeout(() => setNewRegistration(false), 800);
            return newCount;
          });
        }
      }, 5000); // Check every 5 seconds instead of 3
  
      return () => clearInterval(interval);
    }, [goal]); // Add goal to dependencies

    // Calculate stats based on current count - moved outside the useEffect
    const todayRegistrations = Math.floor(count * 0.2); // 20% of total are from today
    const weekRegistrations = Math.floor(count * 0.7); // 70% of total are from this week
    const remainingSpots = Math.max(goal - count, 0); // Calculate remaining spots

    // Add sendConfirmationEmail function
    const sendConfirmationEmail = async (userEmail: string, userName: string) => {
      try {
        // Log the attempt
        console.log('Attempting to send email to:', userEmail);
        
        const templateParams = {
          to_email: userEmail,
          to_name: userName,
          event_name: "UDST Mental Health Event",
          event_date: "April 10-12, 2025",
          event_location: "UDST Main Campus",
          event_duration: "3 Days",
          event_entry: "FREE",
          website: "www.udst.edu.qa",
          contact_email: "info@udst.edu.qa",
          team_name: "The MindFul UDST Team"
        };

        // Log the parameters being sent
        console.log('Sending email with parameters:', JSON.stringify(templateParams, null, 2));

        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );

        // Log the success response
        console.log('EmailJS Response:', result);
        
        if (result.status === 200) {
          console.log('Email sent successfully with status 200');
          return true;
        } else {
          console.warn('Email sent but with unexpected status:', result.status);
          return false;
        }
      } catch (error) {
        // Detailed error logging
        console.error('Failed to send email. Error details:', error);
        if (error instanceof Error) {
          console.error('Error name:', error.name);
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        return false;
      }
    };

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (registrationStep === 'name') {
        if (!name.trim()) {
          setRegistrationStatus('error');
          return;
        }
        setRegistrationStep('email');
        setRegistrationStatus(null);
        return;
      }
      
      if (!email || !email.includes('@')) {
        setRegistrationStatus('error');
        return;
      }
      
      setIsRegistering(true);
      setRegistrationStatus(null);
      
      try {
        const emailSent = await sendConfirmationEmail(email.trim(), name.trim());
        
        if (emailSent) {
          console.log('Email sent successfully to:', email);
          setRegistrationStatus('success');
          setEmail('');
          setName('');
          
          setCount(prev => prev + 1);
          setNewRegistration(true);
          setTimeout(() => {
            setRegistrationStatus(null);
            setShowEmailForm(false);
            setRegistrationStep('name');
          }, 7000);
        } else {
          throw new Error('Failed to send email - please try again or contact support');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setRegistrationStatus('error');
      } finally {
        setIsRegistering(false);
      }
    };

    const handleCancel = () => {
      setShowEmailForm(false);
      setRegistrationStep('name');
      setName('');
      setEmail('');
      setRegistrationStatus(null);
    };
  
    const handleRegisterClick = () => {
      setShowEmailForm(true);
      // Add a small delay to ensure the form is rendered before scrolling
      setTimeout(() => {
        if (formRef.current) {
          // Adding a custom slower scroll behavior
          const yOffset = -50; // Small offset to give some space at the top
          const y = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth',
            // This will make the scroll transition slower
          });
          
          // Increase the duration of the scroll animation
          const scrollDuration = 1500; // 1.5 seconds for a slower, more noticeable transition
          
          // Apply a custom easing function for smoother transition
          // This is done by adding a class that will be styled with CSS transitions
          formRef.current.classList.add('highlight-form');
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.classList.remove('highlight-form');
            }
          }, scrollDuration + 500);
        }
      }, 100);
    };
  
    return (
      <div className="min-h-[400px] w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-8 my-16">
        <div className="text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-2">Registration Tracker</h2>
          <p className="text-teal-300 mb-6">Join our growing community of mindfulness practitioners</p>
          
          {/* Counter with animation */}
          <div className="relative mb-8">
            <motion.div
              className="text-6xl font-extrabold text-white"
              animate={{ scale: newRegistration ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {count}
            </motion.div>
            
            {/* New registration indicator */}
            {newRegistration && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: -30 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 right-1/4 text-teal-300 font-bold"
              >
                +1
              </motion.div>
            )}
            
            <p className="text-gray-300 mt-2">of {goal} goal registrations</p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Today</p>
              <p className="text-white font-bold text-xl">{todayRegistrations}</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">This Week</p>
              <p className="text-white font-bold text-xl">{weekRegistrations}</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Remaining</p>
              <p className="text-white font-bold text-xl">{remainingSpots}</p>
            </div>
          </div>
          
          {/* Call to action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleRegisterClick}
          >
            Register Now
          </motion.button>
          
          {/* Email Registration Form */}
          {showEmailForm && (
            <div ref={formRef} className="mt-8 bg-black/60 p-6 rounded-xl border border-teal-900/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3">Register for the Event</h3>
              <p className="text-gray-300 mb-1 text-sm">
                {registrationStep === 'name' 
                  ? "Please enter your name to begin registration"
                  : "Enter your email to receive updates about our speakers and event schedule"}
              </p>
              <p className="text-teal-400 mb-4 text-sm font-medium">Event dates: April 10th - 12th, 2024</p>
              
              <form onSubmit={handleRegister} className="mb-4">
                <div className="flex flex-col space-y-3">
                  {registrationStep === 'name' ? (
                    <input
                      type="text"
                      placeholder="Your name"
                      className={`px-4 py-2 w-full border ${registrationStatus === 'error' ? 'border-red-500 ring-1 ring-red-500' : 'border-teal-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-black/40 text-white`}
                      value={name}
                      onChange={(e) => {
                        console.log('Name input changed:', e.target.value);
                        setName(e.target.value);
                      }}
                      required
                    />
                  ) : (
                    <input
                      type="email"
                      placeholder="Your email address"
                      className={`px-4 py-2 w-full border ${registrationStatus === 'error' ? 'border-red-500 ring-1 ring-red-500' : 'border-teal-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-black/40 text-white`}
                      value={email}
                      onChange={(e) => {
                        console.log('Email input changed:', e.target.value);
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  )}
                  <div className="flex space-x-2">
                    <button 
                      type="submit"
                      disabled={isRegistering}
                      className={`flex-1 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400 transition-colors flex items-center justify-center ${isRegistering ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isRegistering ? (
                        <>Processing<span className="ml-2 animate-pulse">...</span></>
                      ) : registrationStep === 'name' ? (
                        <>
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Register
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button 
                      type="button"
                      className="px-4 py-2 border border-teal-700 text-teal-300 rounded-lg hover:bg-teal-900/30"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              
              {registrationStatus === 'success' && (
                <div className="bg-teal-900/50 text-white p-3 rounded-lg mb-2 flex items-center border border-teal-500/50">
                  <Check className="h-4 w-4 text-teal-300 mr-2 flex-shrink-0" />
                  <p className="text-sm">Thank you {name}! A confirmation email has been sent to your inbox.</p>
                </div>
              )}
              
              {registrationStatus === 'error' && (
                <div className="bg-red-900/50 text-white p-3 rounded-lg mb-2 flex items-center border border-red-500/50">
                  <Mail className="h-4 w-4 text-red-300 mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    {registrationStep === 'name' 
                      ? "Please enter your name to continue"
                      : "Please enter a valid email address"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Expert Speakers</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Learn from leading mental health professionals, wellness experts, and individuals with lived experiences who will share valuable insights and strategies.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Speaker Cards with Animated Characters */}
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-teal-500/10 to-blue-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-teal-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut"
                    }}
                  >
                    <Brain className="h-12 w-12 text-teal-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500/40 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-blue-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Dr. Sarah Johnson</h3>
              <p className="text-teal-300 mb-4">Clinical Psychologist</p>
              <p className="text-gray-300">Specializing in anxiety and stress management techniques for academic environments.</p>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-blue-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, -2, 0, 2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut"
                    }}
                  >
                    <Brain className="h-12 w-12 text-blue-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-purple-500/40 flex items-center justify-center"
                    animate={{ 
                      x: [0, 10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-purple-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Prof. Michael Chen</h3>
              <p className="text-teal-300 mb-4">Neuroscience Researcher</p>
              <p className="text-gray-300">Exploring the connection between mindfulness practices and brain health.</p>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-teal-500/10 to-green-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-green-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="h-12 w-12 text-green-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-teal-500/40 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3.2,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-teal-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Aisha Al-Mahmoud</h3>
              <p className="text-teal-300 mb-4">Wellness Coach</p>
              <p className="text-gray-300">Guiding students through personalized wellness journeys with cultural sensitivity.</p>
            </div>
          </div>
          
          {/* Additional Speakers - Moved from below to here */}
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-indigo-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, -2, 0, 2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5.2,
                      ease: "easeInOut"
                    }}
                  >
                    <Pill className="h-12 w-12 text-indigo-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500/40 flex items-center justify-center"
                    animate={{ 
                      x: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3.7,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-blue-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Dr. James Wilson</h3>
              <p className="text-teal-300 mb-4">Psychiatrist</p>
              <p className="text-gray-300">Expert in treating anxiety and depression in university students.</p>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-pink-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4.8,
                      ease: "easeInOut"
                    }}
                  >
                    <Users className="h-12 w-12 text-pink-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500/40 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3.3,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="h-4 w-4 text-purple-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Fatima Al-Thani</h3>
              <p className="text-teal-300 mb-4">Mental Health Advocate</p>
              <p className="text-gray-300">Sharing personal journey and strategies for building resilience.</p>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-xl overflow-hidden shadow-xl border border-gray-800 group">
            <div className="h-48 bg-gradient-to-r from-green-500/10 to-yellow-500/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-yellow-500/30 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, -2, 0, 2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Apple className="h-12 w-12 text-yellow-200" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-green-500/40 flex items-center justify-center"
                    animate={{ 
                      x: [0, 10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3.9,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-green-200" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Dr. Lisa Zhang</h3>
              <p className="text-teal-300 mb-4">Nutritional Psychiatrist</p>
              <p className="text-gray-300">Exploring the connection between diet, gut health, and mental wellbeing.</p>
            </div>
          </div>
        </div>
        
        {/* Registration Counter */}
        <RegistrationCounter />
      </div>
    </div>
  );
}

export default Speakers; 