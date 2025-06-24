import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, MoveRight, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden animate-fade-in-up">
        {/* Animated Gradient/Glassmorphism BG */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 animate-gradient-move" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 shadow-xl animate-float mb-4">
            <Sparkles className="w-8 h-8 text-white drop-shadow-glow" />
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl text-center">
            Empowering Your Career Journey
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl text-center font-medium">
            VitaCrafter is on a mission to make world-class resume building
            accessible to everyone. No paywalls, no limits—just powerful,
            beautiful tools to help you land your dream job.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section
        className="relative py-20 md:py-24 overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
        <div className="container flex justify-center">
          <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 p-8 md:p-14 flex flex-col lg:flex-row items-center gap-12 animate-float">
            {/* Founder Image */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-48 h-48 group animate-float">
                <Image
                  src="https://avatars.githubusercontent.com/u/146638041?v=4"
                  alt="Mohammad Salim Mir"
                  width={400}
                  height={400}
                  data-ai-hint="person portrait"
                  className="rounded-full object-cover shadow-2xl border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-pulse-slow">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <span className="mt-4 font-semibold text-lg text-primary">
                Mohammad Salim Mir
              </span>
              <span className="text-muted-foreground text-sm">
                Founder & Creator
              </span>
            </div>
            {/* Founder Message */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
                Why I Built VitaCrafter
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg font-medium">
                <p>
                  "I started VitaCrafter because I believe everyone deserves a
                  fair shot at their dream job. After facing paywalls and
                  limitations on other platforms, I wanted to create a tool that
                  is truly free, beautiful, and empowering for all."
                </p>
                <p>
                  "My goal is to break down barriers and give you the tools you
                  need to succeed—no matter your background or resources.
                  VitaCrafter is my way of giving back and helping you build
                  your future."
                </p>
                <p className="font-semibold text-foreground/90">
                  Let's build something amazing together."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-accent/20 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
        <div className="container flex items-center justify-center">
          <div className="w-full max-w-3xl rounded-3xl bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 p-10 sm:p-16 md:p-20 text-center overflow-hidden animate-float">
            <h3 className="text-3xl md:text-4xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
              Our Mission: Free, Accessible, and Innovative Resume Building
            </h3>
            <div className="mt-6 space-y-4 text-muted-foreground text-lg font-medium">
              <p>
                VitaCrafter is dedicated to providing high-quality, AI-powered
                resume tools to everyone—completely free. We believe in
                accessibility, transparency, and constant innovation to help you
                stand out in your career journey.
              </p>
              <p>
                No hidden fees. No locked features. Just a commitment to your
                success and a passion for empowering job seekers everywhere.
              </p>
              <p className="font-semibold text-foreground/90">
                Your future is limitless. Start building it today.
              </p>
            </div>
            <div className="mt-12 flex justify-center">
              <Button
                asChild
                size="lg"
                className="shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-transform duration-300 font-bold text-lg px-8 py-4"
              >
                <Link href="/templates">
                  Start Building Your Free Resume <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
