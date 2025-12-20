"use client";

import { forwardRef, TextareaHTMLAttributes, useEffect, useRef, useImperativeHandle } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxHeight?: number;
    autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ maxHeight = 120, autoResize = true, className = "", value, onChange, ...props }, ref) => {
        const innerRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => innerRef.current!);

        useEffect(() => {
            if (autoResize && innerRef.current) {
                innerRef.current.style.height = "40px";
                const scrollHeight = innerRef.current.scrollHeight;
                if (scrollHeight > 40) {
                    innerRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
                }
            }
        }, [value, autoResize, maxHeight]);

        return (
            <textarea
                ref={innerRef}
                value={value}
                onChange={onChange}
                rows={1}
                className={`
          w-full h-10
          px-4 py-2
          bg-background text-foreground text-[15px] leading-6
          border border-input rounded-2xl
          placeholder:text-muted-foreground
          resize-none
          transition-colors duration-200
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";
