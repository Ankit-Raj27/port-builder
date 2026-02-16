"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EditableText } from "@/components/common/EditableText";
import usePortfolioStore from "@/components/store/usePortfolioStore";
import { cn } from "@/lib/utils";

interface EliteNavbarProps {
  isEditable?: boolean;
}

const EliteNavbar = ({ isEditable = true }: EliteNavbarProps) => {
  const { navbarContent, updateNavbarContent } = usePortfolioStore();
  const { brandName = "PORTFOLIO", links = [] } = navbarContent || {};

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "pointer-events-auto flex items-center gap-8 px-6 py-3 rounded-full border border-white/10",
          "bg-black/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Brand */}
        <div className="text-sm font-bold tracking-widest text-white uppercase group">
          {isEditable ? (
            <EditableText
              value={brandName}
              onChange={(val) => updateNavbarContent({ brandName: val })}
              tag="span"
              className="group-hover:text-primary transition-colors cursor-pointer"
            />
          ) : (
            <span>{brandName}</span>
          )}
          <div className="h-[1px] w-0 group-hover:w-full bg-primary transition-all duration-300" />
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="relative text-xs font-medium text-white/60 hover:text-white transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 text-xs font-semibold text-black bg-white rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
        >
          Hire Me
        </motion.button>
      </motion.div>
    </header>
  );
};

export default EliteNavbar;
