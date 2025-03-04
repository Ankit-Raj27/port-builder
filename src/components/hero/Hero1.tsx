"use client";
import React, { useState } from "react";

const Hero1: React.FC = () => {
  const [title, setTitle] = useState("Welcome to My Portfolio");
  const [description, setDescription] = useState(
    "Showcasing my work, skills, and projects in a creative way."
  );
  const [buttonText, setButtonText] = useState("Get Started");

  return (
    <section className="bg-gray-900 text-white text-center py-20">
      <div className="container mx-auto">
        <h1
          className="text-4xl font-bold mb-4 cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTitle(e.target.innerText)}
        >
          {title}
        </h1>
        <p
          className="text-lg mb-6 cursor-pointer"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setDescription(e.target.innerText)}
        >
          {description}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setButtonText(e.target.innerText)}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero1;