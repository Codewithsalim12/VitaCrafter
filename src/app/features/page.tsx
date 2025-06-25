import { Button } from "@/components/ui/button";
import { Bot, MoveRight, Paintbrush, Zap, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: (
      <Paintbrush className="w-10 h-10 text-primary drop-shadow-glow animate-float" />
    ),
    title: "Professionally Designed Templates",
    description:
      "Make a lasting first impression. Our library of resume templates is crafted by professional designers and optimized for readability and impact. Whether you're in a creative field or a traditional industry, find a style that truly represents you.",
    points: [
      "Inspired by LaTeX designs for a clean, academic feel.",
      "Fully customizable layouts, fonts, and colors.",
      "Optimized for Applicant Tracking Systems (ATS).",
      "Choose from classic, modern, creative, and photo-centric designs.",
    ],
    image:
      "https://cdn.enhancv.com/predefined-examples/gtoz8KaPgvZJW6QL0qQqAN1YAucQLNzenvKdtL9r/image.png",
    imageHint: "resume modern",
    align: "right",
  },
  {
    icon: (
      <Zap className="w-10 h-10 text-primary drop-shadow-glow animate-float animation-delay-2000" />
    ),
    title: "Intuitive Live Editor",
    description:
      "No more guesswork. Our WYSIWYG (What You See Is What You Get) editor provides a seamless and intuitive resume-building experience. See your changes live as you make them, ensuring your final document is pixel-perfect.",
    points: [
      "Simple, clean interface that is easy to navigate.",
      "Real-time preview updates as you type.",
      "Easily add, remove, and reorder sections.",
      "Export to PDF with a single click.",
    ],
    image:
      "https://cdn-images.zety.com/images/zety/landings/builder/in/resume-builder-template@3x.png",
    imageHint: "editor interface",
    align: "left",
  },
  {
    icon: (
      <Bot className="w-10 h-10 text-primary drop-shadow-glow animate-float animation-delay-4000" />
    ),
    title: "AI-Powered Resume Feedback",
    description:
      "Go beyond spell-checking. Our intelligent AI assistant analyzes your resume content to provide actionable, personalized feedback. Strengthen your bullet points, improve your wording, and highlight your accomplishments for maximum impact.",
    points: [
      "Get smart suggestions for your experience descriptions.",
      "Identifies strengths and areas for improvement.",
      "Helps you use powerful action verbs.",
      "Ensures your resume is tailored to your target role.",
    ],
    image:
      "https://cdn.prod.website-files.com/62775a91cc3db44c787149de/67994edfc94bf5d1172bcd83_ai-resume-builder1.webp",
    imageHint: "ai assistant",
    align: "right",
  },
  {
    icon: (
      <Sparkles className="w-10 h-10 text-primary drop-shadow-glow animate-float animation-delay-6000" />
    ),
    title: "AI Assistant",
    description:
      "Instantly generate professional resume summaries, objectives, cover letter intros, and skills lists with the power of AI. Just describe yourself or your role, and let the AI Assistant do the writing for you—perfect for overcoming writer's block and saving time.",
    points: [
      "Create resume summaries, objectives, and cover letter intros in seconds.",
      "Get tailored skills lists for your profession or industry.",
      "No more writer's block—AI helps you get started fast.",
      "Easy to use: just enter a short description and choose what you want to generate.",
    ],
    image:
      "https://www.adobe.com/acrobat/generative-ai-pdf/media_1ad1d7495e7ad1ddaccddbb7abf89b02da1325355.png?width=750&format=png&optimize=medium",
    imageHint: "ai assistant tool",
    align: "left",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Animated Gradient/Glassmorphism BG */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 animate-gradient-move" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 shadow-xl animate-float">
              <Sparkles className="w-8 h-8 text-white drop-shadow-glow" />
            </span>
            <p className="text-base font-semibold text-primary tracking-widest uppercase">
              Features
            </p>
            <h1 className="mt-2 text-5xl md:text-6xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl">
              Everything You Need, Nothing You Don't
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl text-center">
              VitaCrafter is packed with powerful features designed to make
              resume building faster, smarter, and more effective. Explore how
              we help you stand out.
            </p>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-secondary/80 via-background/90 to-accent/10 overflow-hidden">
        {/* Soft BG Blobs */}
        <div className="absolute -top-32 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-accent/10 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
        <div className="container px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 rounded-3xl bg-white/70 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 p-8 md:p-12 transition-transform duration-500 hover:scale-[1.025] animate-fade-in-up max-w-5xl mx-auto"
              style={{ animationDelay: `${index * 0.15 + 0.1}s` }}
            >
              {/* Text Column */}
              <div
                className={`space-y-7 flex flex-col justify-center items-center text-center ${
                  feature.align === "right" ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/80 to-accent/80 shadow-lg mb-2 animate-pulse-slow">
                  {feature.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground text-lg font-medium">
                  {feature.description}
                </p>
                <ul className="space-y-3 pt-2">
                  {feature.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <div className="w-7 h-7 mt-1 flex-shrink-0 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center animate-bounce-slow">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-muted-foreground text-base font-semibold">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Image Column */}
              <div
                className={`relative flex items-center justify-center ${
                  feature.align === "right" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl p-2 shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    data-ai-hint={feature.imageHint}
                    className="w-full h-auto object-cover rounded-xl shadow-2xl border-4 border-white/60 dark:border-secondary/60 animate-fade-in"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-accent/20 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
        <div className="container flex items-center justify-center">
          <div className="relative rounded-3xl bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 p-10 sm:p-16 md:p-20 text-center overflow-hidden animate-float">
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
              Ready to Build Your Future?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80 font-medium">
              Stop waiting and start creating. Build a resume that gets results
              with VitaCrafter's powerful tools. It's fast, easy, and free to
              start.
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-transform duration-300 font-bold text-lg px-8 py-4"
              >
                <Link href="/templates">
                  Choose a Template <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
