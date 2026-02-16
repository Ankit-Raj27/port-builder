"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps extends React.HTMLAttributes<HTMLElement> {
  value: string;
  onChange: (value: string) => void;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  placeholder?: string;
  isEditable?: boolean; // Added this
}

export const EditableText = ({
  value,
  onChange,
  tag: Tag = "span",
  className,
  placeholder = "Type here...",
  isEditable = true, // Extract it here
  ...props
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isEditing && contentRef.current && isEditable) {
      contentRef.current.focus();
    }
  }, [isEditing, isEditable]);

  const handleBlur = () => {
    setIsEditing(false);
    if (contentRef.current && isEditable) {
      const newValue = contentRef.current.innerText;
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  };

  // If not editable, just render a clean element without contentEditable noise
  if (!isEditable) {
    return (
      <Tag className={className} {...props}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      ref={contentRef as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "outline-none transition-all duration-200 cursor-text min-w-[1ch] empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground",
        isEditing ? "ring-2 ring-indigo-500/50 rounded-sm bg-indigo-500/5" : "hover:bg-indigo-500/5 hover:rounded-sm",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      data-placeholder={placeholder}
      {...props}
    >
      {value}
    </Tag>
  );
};
