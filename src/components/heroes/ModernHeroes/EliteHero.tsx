"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/common/EditableText";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import { ArrowRight, Sparkles } from "lucide-react";

interface EliteHeroProps {
  isEditable?: boolean;
}

const EliteHero = ({ isEditable = true }: EliteHeroProps) => {
  const { heroContent, updateHeroContent } = usePortfolioStore();
  const {
    title,
    name,
    subtitle,
    description,
    primaryButton,
    secondaryButton,
  } = heroContent || {};

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#050505] overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-white/50"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Available for S-Rank Projects</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              <EditableText
                value={title || "Hi, I am"}
                onChange={(val) => updateHeroContent({ title: val })}
                tag="span"
                isEditable={isEditable}
              />{" "}
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                <EditableText
                  value={name || "John Doe"}
                  onChange={(val) => updateHeroContent({ name: val })}
                  tag="span"
                  isEditable={isEditable}
                />
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-white/80">
              <EditableText
                value={subtitle || "Full Stack Architect"}
                onChange={(val) => updateHeroContent({ subtitle: val })}
                tag="span"
                isEditable={isEditable}
              />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-[500px] text-lg text-white/40 leading-relaxed mx-auto md:mx-0"
          >
            <EditableText
              value={description || "Building systems that scale..."}
              onChange={(val) => updateHeroContent({ description: val })}
              tag="span"
              isEditable={isEditable}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-6"
          >
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:pr-12">
              <EditableText
                value={primaryButton || "View Arsenal"}
                onChange={(val) => updateHeroContent({ primaryButton: val })}
                tag="span"
                isEditable={isEditable}
                className="relative z-10"
              />
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
            
            <button className="text-white/60 hover:text-white transition-colors font-semibold border-b border-white/10 pb-1">
              <EditableText
                value={secondaryButton || "Talk Strategy"}
                onChange={(val) => updateHeroContent({ secondaryButton: val })}
                tag="span"
                isEditable={isEditable}
              />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 flex justify-center relative"
        >
          <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
             <Image
                src="/images/component/hero1.jpg"
                alt="Profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
             />
          </div>
          {/* Floating Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">12</div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">LPA Growth</p>
                <p className="text-sm font-bold text-white">+250% Boost</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EliteHero;
