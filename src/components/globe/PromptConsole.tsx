'use client';

import { useState, useRef, useEffect } from 'react';

interface PromptConsoleProps {
  onSubmit: (prompt: string, model: string) => void;
  isLoading?: boolean;
}

export default function PromptConsole({ onSubmit, isLoading = false }: PromptConsoleProps) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Claude Sonnet 4');
  const [rows, setRows] = useState(3);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const models = ['Claude Sonnet 4', 'Gemini 2.0', 'DeepSeek R1'];
  const maxLength = 500;
  const isOverLimit = prompt.length > maxLength;
  const isEmpty = prompt.trim().length === 0;
  const isDisabled = isEmpty || isOverLimit || isLoading;

  // Auto-expand textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = 24; // Approximate line height
      const newRows = Math.min(Math.max(3, Math.ceil(scrollHeight / lineHeight)), 6);
      setRows(newRows);
      textarea.style.height = `${newRows * lineHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      onSubmit(prompt.trim(), model);
    }
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setPrompt(value);
    }
  };

  return (
    <div className="bg-panel border border-edge rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea Input */}
        <div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Ask about data center infrastructure..."
            rows={rows}
            className="w-full bg-panel border border-edge rounded-lg px-4 py-3 font-inter text-[15px] leading-relaxed text-text placeholder:text-muted resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-aiGreen focus-visible:border-transparent"
            disabled={isLoading}
          />
          
          {/* Character Counter */}
          <div className="flex justify-between items-center mt-2">
            <span className={`font-inter text-[15px] leading-relaxed ${isOverLimit ? 'text-red-500' : 'text-muted'}`}>
              {prompt.length}/{maxLength} characters
            </span>
            {isOverLimit && (
              <span className="font-inter text-[15px] leading-relaxed text-red-500">Character limit exceeded</span>
            )}
          </div>
        </div>

        {/* Model Selector */}
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-panel border border-edge rounded-xl px-4 py-2 font-inter text-[15px] leading-relaxed text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus hover:translate-y-[-1px] transition-transform duration-200 appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {models.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-brandGold" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-3 px-6 rounded-lg font-inter text-[15px] leading-relaxed font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-aiGreen ${
            isDisabled
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-b from-[#f6d36a] to-brandGold text-black shadow-[0_6px_24px_rgba(212,175,55,.25)] hover:from-[#f4d05a] hover:to-[#c49f2f] active:from-[#f2ce4a] active:to-[#b48f1f]'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Submit Prompt'
          )}
        </button>
      </form>
    </div>
  );
}
