"use client";

import React from "react";
import { motion } from "framer-motion";
import { EditableText } from "@/components/common/EditableText";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import { Instagram, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

interface EliteFooterProps {
  isEditable?: boolean;
}

const EliteFooter = ({ isEditable = true }: EliteFooterProps) => {
  const { footerContent, updateFooterContent } = usePortfolioStore();
  const { text = "Let's build something elite.", copyright = "© 2024 Portfolio" } = footerContent || {};

  return (
    <footer className="py-24 bg-[#050505] text-white border-t border-white/5">
      <div className="container px-4 text-center space-y-20">
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter opacity-10 select-none uppercase">
                God Mode
            </h2>
            <div className="space-y-4">
                <EditableText
                    value={text}
                    onChange={(val) => updateFooterContent({ text: val })}
                    tag="p"
                    className="text-2xl md:text-4xl font-medium tracking-tight"
                    isEditable={isEditable}
                />
                <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all">
                    Initiate Contact <ArrowUpRight className="w-5 h-5" />
                </a>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <EditableText
                value={copyright}
                onChange={(val) => updateFooterContent({ copyright: val })}
                tag="p"
                className="text-white/30 text-sm"
                isEditable={isEditable}
            />
            
            <div className="flex gap-6">
                {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <motion.a
                        key={i}
                        href="#"
                        whileHover={{ y: -5, color: '#818cf8' }}
                        className="text-white/40 transition-colors"
                    >
                        <Icon className="w-5 h-5" />
                    </motion.a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default EliteFooter;
