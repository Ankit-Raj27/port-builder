"use client";
import React, { useState, useEffect } from "react";

const Hero1: React.FC = () => {
  const [title, setTitle] = useState("Welcome to My Portfolio");
  const [description, setDescription] = useState("Showcasing my projects.");
  const [buttonText, setButtonText] = useState("Get Started");

  // Prevents Enter key from adding new lines in contentEditable elements
  const preventNewLine = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  // Function to generate the edited hero component code
  const getEditedHeroComponent = React.useCallback(() => `
"use client";
import React from "react";

const Hero1: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">${title}</h1>
        <p className="text-lg mb-6">${description}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          ${buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero1;
  `.trim(), [title, description, buttonText]);

  // Debounce localStorage updates to optimize performance
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("editedHero", getEditedHeroComponent());
    }, 500); // 500ms delay
    return () => clearTimeout(timeout);
  }, [title, description, buttonText, getEditedHeroComponent]);

  // Load saved content from localStorage on mount
  useEffect(() => {
    const savedHero = localStorage.getItem("editedHero");
    if (savedHero) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(savedHero, "text/html");
        setTitle(doc.querySelector("h1")?.textContent || title);
        setDescription(doc.querySelector("p")?.textContent || description);
        setButtonText(doc.querySelector("button")?.textContent || buttonText);
      } catch (error) {
        console.error("Error parsing saved hero:", error);
      }
    }
  }, [title, description, buttonText]);

  return (
    <section className="bg-gray-900 text-white text-center py-20">
      <div className="container mx-auto">
        <h1
          className="text-4xl font-bold mb-4 cursor-pointer focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setTitle(e.target.innerText.trim())}
          onKeyDown={preventNewLine}
        >
          {title}
        </h1>
        <p
          className="text-lg mb-6 cursor-pointer focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setDescription(e.target.innerText.trim())}
          onKeyDown={preventNewLine}
        >
          {description}
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setButtonText(e.target.innerText.trim())}
            onKeyDown={preventNewLine}
          >
            {buttonText}
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero1;
