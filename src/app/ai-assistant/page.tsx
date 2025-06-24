"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, Sparkles, RefreshCw } from "lucide-react";

const OUTPUT_TYPES = [
  {
    key: "summary",
    label: "Resume Summary",
    prompt: (text: string) =>
      `Write a professional resume summary for: ${text}`,
  },
  {
    key: "objective",
    label: "Objective Statement",
    prompt: (text: string) =>
      `Write a concise resume objective statement for: ${text}`,
  },
  {
    key: "cover",
    label: "Cover Letter Intro",
    prompt: (text: string) =>
      `Write a compelling cover letter introduction for: ${text}`,
  },
  {
    key: "skills",
    label: "Skills List",
    prompt: (text: string) => `List the most relevant skills for: ${text}`,
  },
];

export default function AiAssistantPage() {
  const [input, setInput] = useState("");
  const [outputType, setOutputType] = useState(OUTPUT_TYPES[0].key);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const selected = OUTPUT_TYPES.find((t) => t.key === outputType)!;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          type: outputType,
          prompt: selected.prompt(input),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate content");
      setResult(data.result);
    } catch (err: any) {
      if (err.name === "AbortError") {
        setError("AI response took too long. Please try again or simplify your input.");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 animate-gradient-move" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
      <div className="container py-20 md:py-28 relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 shadow-xl animate-float mb-4">
          <Sparkles className="w-8 h-8 text-white drop-shadow-glow" />
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl text-center">
          AI Assistant
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl text-center font-medium">
          Get instant, AI-powered resume content. Enter a short description
          about yourself and choose what you want to generate.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mt-12 bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 rounded-3xl p-8 flex flex-col gap-6 animate-fade-in-up"
        >
          <label className="font-semibold text-lg mb-1">About You</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Frontend dev with 2 years in React"
            rows={3}
            className="bg-background/50 backdrop-blur-sm"
            required
          />
          <div className="flex flex-wrap gap-3 mt-2">
            {OUTPUT_TYPES.map((type) => (
              <button
                key={type.key}
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                  outputType === type.key
                    ? "bg-primary text-primary-foreground border-primary shadow"
                    : "bg-muted text-foreground border-border hover:bg-primary/10"
                }`}
                onClick={() => setOutputType(type.key)}
                disabled={loading}
              >
                {type.label}
              </button>
            ))}
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-4 font-bold text-lg shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-transform duration-300 flex items-center gap-2 justify-center"
            disabled={loading || !input.trim()}
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Generating..." : "Generate"}
          </Button>
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-200 rounded-lg p-3 mt-2 text-center animate-fade-in-up">
              {error}
            </div>
          )}
        </form>

        {result && (
          <div className="w-full max-w-2xl mt-10 bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 rounded-3xl p-8 animate-fade-in-up flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-lg text-primary">
                AI Output
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary/10"
                  onClick={handleCopy}
                  title="Copy"
                >
                  <Copy className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary/10"
                  onClick={() => handleSubmit()}
                  disabled={loading}
                  title="Regenerate"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
            <div
              className={`whitespace-pre-line break-words rounded-xl p-6 min-h-[160px] max-h-[400px] w-full text-lg text-foreground bg-background/60 border border-border shadow-md transition-shadow select-text cursor-pointer hover:shadow-lg overflow-y-auto ${
                outputType === "skills" ? "font-mono" : "font-sans"
              }`}
              onClick={handleCopy}
              title="Click to copy"
              tabIndex={0}
              style={{ outline: "none" }}
            >
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Placeholder for /api/ai-assistant route implementation
