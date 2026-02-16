"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditableText } from "@/components/common/EditableText";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import { ExternalLink, Github } from "lucide-react";

interface EliteProjectProps {
  isEditable?: boolean;
}

const EliteProject = ({ isEditable = true }: EliteProjectProps) => {
  const { projectContent, updateProjectContent } = usePortfolioStore();
  const { title = "Mission Archives", items = [] } = projectContent || {};

  const handleUpdateItem = (id: number, key: string, val: string) => {
    const newItems = items.map(item => item.id === id ? { ...item, [key]: val } : item)
    updateProjectContent({ items: newItems })
  }

  return (
    <section className="py-24 bg-[#050505] text-white">
      <div className="container px-4">
        <div className="mb-20 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20"
          >
            Portfolio
          </motion.div>
          <EditableText
            value={title}
            onChange={(val) => updateProjectContent({ title: val })}
            tag="h2"
            className="text-4xl md:text-6xl font-bold tracking-tight"
            isEditable={isEditable}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-500"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

              <div className="relative z-10 space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <Image
                    src="/placeholder.svg"
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <EditableText
                      value={item.title}
                      onChange={(val) => handleUpdateItem(item.id, 'title', val)}
                      tag="h3"
                      className="text-2xl font-bold group-hover:text-indigo-400 transition-colors"
                      isEditable={isEditable}
                    />
                    <div className="flex gap-4">
                       <Github className="w-5 h-5 text-white/20 hover:text-white cursor-pointer transition-colors" />
                       <ExternalLink className="w-5 h-5 text-white/20 hover:text-white cursor-pointer transition-colors" />
                    </div>
                  </div>

                  <EditableText
                    value={item.description}
                    onChange={(val) => handleUpdateItem(item.id, 'description', val)}
                    tag="p"
                    className="text-white/50 text-sm leading-relaxed"
                    isEditable={isEditable}
                  />

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteProject;
