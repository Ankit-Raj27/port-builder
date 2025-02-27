"use client";
import React from "react";

const Hero1: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg mb-6">
          Showcasing my work, skills, and projects in a creative way.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero1;
