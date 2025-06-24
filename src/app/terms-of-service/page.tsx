"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 rounded-3xl p-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg text-center mb-6">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
          <p>
            This is a placeholder for the Terms of Service. Please update this
            section with your actual terms and conditions. By using VitaCrafter,
            you agree to abide by our terms and policies.
          </p>
          <p>
            Use VitaCrafter responsibly and do not misuse the service. We
            reserve the right to update these terms at any time.
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
