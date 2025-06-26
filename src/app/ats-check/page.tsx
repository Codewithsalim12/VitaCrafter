"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AtsCheckPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/ats-check", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to analyze resume.");
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-accent/10 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl border border-border/30 p-8 md:p-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-center mb-2 text-primary">
          ATS Resume Check
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-8">
          Upload your resume and get instant feedback on how it performs with
          Applicant Tracking Systems. Powered by Gemini AI.
        </p>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="resume-upload"
            className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-xl p-6 mb-6 bg-primary/5 hover:bg-primary/10 transition-all"
          >
            <Upload className="w-10 h-10 text-primary mb-2" />
            <span className="font-semibold text-primary mb-1">
              Click to upload or drag & drop
            </span>
            <span className="text-xs text-muted-foreground">
              PDF, DOCX, or TXT (max 2MB)
            </span>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
          {file && (
            <div className="flex items-center gap-2 mb-4 text-primary font-medium">
              <FileText className="w-5 h-5" />
              {file.name}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-white font-bold font-headline rounded-full px-8 py-3 text-lg shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!file || loading}
          >
            {loading ? "Analyzing..." : "Check Resume"}
          </button>
        </form>
        {error && (
          <div className="mt-6 w-full flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-8 w-full">
            <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
              <CheckCircle className="w-6 h-6" />
              ATS Analysis Complete
            </div>
            <div className="bg-muted/40 rounded-lg p-4 mb-4">
              <h2 className="font-bold text-lg mb-2 text-primary">Feedback</h2>
              <p className="text-base text-muted-foreground whitespace-pre-line">
                {result.feedback}
              </p>
            </div>
            {result.improvements && (
              <div className="bg-primary/10 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2 text-primary">
                  Suggestions for Improvement
                </h2>
                <ul className="list-disc pl-6 text-base text-primary">
                  {result.improvements.map((imp: string, idx: number) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
