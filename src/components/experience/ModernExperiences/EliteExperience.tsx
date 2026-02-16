"use client";

import React from "react";
import { motion } from "framer-motion";
import { EditableText } from "@/components/common/EditableText";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import { Briefcase, Calendar } from "lucide-react";

interface EliteExperienceProps {
  isEditable?: boolean;
}

const EliteExperience = ({ isEditable = true }: EliteExperienceProps) => {
  const { experienceContent, updateExperienceContent } = usePortfolioStore();
  const { title = "Career Progression", items = [] } = experienceContent || {};

  const handleUpdateItem = (id: number, key: string, val: string) => {
    const newItems = items.map(item => item.id === id ? { ...item, [key]: val } : item)
    updateExperienceContent({ items: newItems })
  }

  return (
    <section className="py-24 bg-[#050505] text-white">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="mb-24 text-center">
            <EditableText
                value={title}
                onChange={(val) => updateExperienceContent({ title: val })}
                tag="h2"
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                isEditable={isEditable}
            />
            <p className="text-white/30 text-lg">The journey to S-Rank mastery.</p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:left-1/2">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-16 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:left-1/2'}`}
            >
              {/* Dot on Timeline */}
              <div className="absolute top-0 -left-[21px] md:left-auto md:right-[-9px] w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#050505] z-10" 
                   style={i % 2 !== 0 ? { right: 'auto', left: '-9px' } : {}} />

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-indigo-500/30 transition-colors shadow-2xl backdrop-blur-sm group">
                <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                   <Calendar className="w-4 h-4 text-indigo-400" />
                   <EditableText
                      value={item.duration}
                      onChange={(val) => handleUpdateItem(item.id, 'duration', val)}
                      tag="span"
                      className="text-xs font-bold uppercase tracking-widest text-indigo-400"
                      isEditable={isEditable}
                    />
                </div>

                <div className="space-y-2">
                    <EditableText
                        value={item.role}
                        onChange={(val) => handleUpdateItem(item.id, 'role', val)}
                        tag="h3"
                        className="text-2xl font-bold"
                        isEditable={isEditable}
                    />
                    <EditableText
                        value={item.company}
                        onChange={(val) => handleUpdateItem(item.id, 'company', val)}
                        tag="p"
                        className="text-white/60 font-medium italic"
                        isEditable={isEditable}
                    />
                </div>

                <div className="mt-6">
                    <EditableText
                        value={item.description}
                        onChange={(val) => handleUpdateItem(item.id, 'description', val)}
                        tag="p"
                        className="text-white/40 text-sm leading-relaxed"
                        isEditable={isEditable}
                    />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteExperience;
