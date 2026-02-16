import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Github, Linkedin } from 'lucide-react';

export default function AIComponent() {
  return (
    <div className="bg-[#050505] text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 opacity-30 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              AI-Powered Solutions for a Smarter Future
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Innovating with cutting-edge artificial intelligence and machine learning technologies.
            </motion.p>
            <motion.div
              className="flex items-center justify-center md:justify-start space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <a
                href="#"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full inline-flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200">
                <Code className="h-6 w-6" />
              </a>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 opacity-60 blur-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 md:w-56 md:h-56 bg-gray-800 rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ loop: Infinity, duration: 10, ease: 'linear' }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}