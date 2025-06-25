// pages/index.tsx or wherever this component is used
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Bot,
  FileEdit,
  MoveRight,
  Paintbrush,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "VitaCrafter's AI feedback was a game-changer. It helped me rephrase my experience section for maximum impact. I got three interviews within a week!",
    name: "Sarah J.",
    title: "Software Engineer",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/64.jpg",
    avatarHint: "person avatar",
  },
  {
    quote:
      "The templates are beautiful and so easy to customize. I finally have a resume I'm proud to send out. Highly recommended!",
    name: "Michael B.",
    title: "UX Designer",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/70.jpg",
    avatarHint: "person avatar",
  },
  {
    quote:
      "As a recent graduate, building a resume was daunting. VitaCrafter made it simple and stress-free. The results were professional.",
    name: "Emily C.",
    title: "Marketing Graduate",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/71.jpg",
    avatarHint: "person avatar",
  },
];

export default function HomePage() {
  // CV images for carousel
  const cvImages = [
    "https://resumeworded.com/assets/images/resume-guides/virtual-assistant.png",
    "https://images.resumaker.ai/s3/en-US/cv-examples/Virtual-Assistant-CV-Example.png?v=1.2.63&tr=w-1280,f-webp",
    "https://cdn.prod.website-files.com/62f0854c1cef28185535ab61/671f1eb04c7bee9f8c60437f_standard_template-p-1080_1_85.webp",
  ];
  const [currentCv, setCurrentCv] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCv((prev) => (prev + 1) % cvImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-accent/10 flex flex-col">
      {/* Hero Section - Reference-Inspired, Dark BG */}
      <section className="relative min-h-[700px] flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-16 bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#181c24] overflow-hidden">
        {/* Decorative geometric shapes */}
        <span className="absolute left-10 top-24 w-16 h-16 bg-orange-400/20 rounded-full z-0" />
        <span className="absolute right-24 top-10 w-10 h-10 bg-orange-400/10 rounded-full z-0" />
        <span className="absolute left-1/3 bottom-10 w-8 h-8 bg-orange-400/10 rounded-full z-0" />
        <span className="absolute right-10 bottom-24 w-16 h-16 bg-orange-400/20 rounded-full z-0" />
        <span className="absolute left-1/2 top-1/2 w-24 h-24 bg-orange-400/10 rounded-full z-0" />
        {/* Left: Headline, subheadline, button */}
        <div className="flex-1 flex flex-col items-start justify-center z-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline leading-tight text-white mb-6">
            Create a <span className="text-orange-400">resume</span> that
            <br />
            secures your <span className="text-orange-400">dream job</span>
          </h1>
          <p className="text-lg md:text-xl font-body text-gray-300 mb-10 max-w-md">
            Build a resume that piques the interest of recruiters and gets you
            hired. It's fast and easy to use.
          </p>
          <a
            href="/templates"
            className="inline-block rounded-full bg-orange-500 hover:bg-orange-400 text-white font-body font-bold text-xl px-10 py-5 shadow-lg transition-all duration-200 mb-6"
          >
            Try for free
          </a>
          {/* Star reviews below button */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 shadow border border-white/10">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 drop-shadow"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
            <span className="text-base font-bold font-body text-gray-200 ml-2">
              4.9/5.0 · 2,300+ reviews
            </span>
          </div>
        </div>
        {/* Right: CV preview in device/card frame */}
        <div className="flex-1 flex items-center justify-center w-full max-w-2xl z-10 mt-16 md:mt-0">
          <div className="relative bg-[#23272f] rounded-3xl shadow-2xl border border-white/10 p-6 md:p-10 w-full max-w-lg flex flex-col items-center">
            {/* Simulate browser bar */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div
              className="relative w-full flex items-center justify-center"
              style={{ minHeight: 480 }}
            >
              <Image
                key={currentCv}
                src={cvImages[currentCv]}
                alt={`CV Preview ${currentCv + 1}`}
                width={380}
                height={480}
                className="rounded-xl shadow-xl border border-white/10 object-contain bg-white"
                style={{
                  transform: `rotate(${
                    currentCv === 0 ? -4 : currentCv === 1 ? 2 : 6
                  }deg)`,
                }}
                priority
              />
              {/* Dots for manual navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {cvImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 border border-orange-400/40 ${
                      idx === currentCv
                        ? "bg-orange-400 scale-110"
                        : "bg-white/70"
                    }`}
                    style={{ outline: "none" }}
                    aria-label={`Show CV ${idx + 1}`}
                    onClick={() => setCurrentCv(idx)}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="py-20 bg-background/80 border-t border-border/30"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
            Why Choose VitaCrafter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-border/30 transition-all duration-200"
            >
              <Star className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-600">
                Stunning Templates
              </h3>
              <p className="text-muted-foreground">
                Choose from a curated collection of modern, professional
                templates designed to impress recruiters and pass ATS scans.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-border/30 transition-all duration-200"
            >
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-600">
                Easy, Fast Editing
              </h3>
              <p className="text-muted-foreground">
                Our intuitive editor lets you build and customize your resume in
                real time—no design or coding skills needed.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-border/30 transition-all duration-200"
            >
              <ArrowRight className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-600">
                One-Click Export
              </h3>
              <p className="text-muted-foreground">
                Download your resume as PDF, DOCX, or TXT with a single click.
                Share it anywhere, anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Hero Image */}
      <section
        className="container -mt-10 sm:-mt-12 px-4 animate-fade-in-up"
        style={{ animationDelay: "0.6s", opacity: 0 }}
      >
        <div className="relative p-1 bg-gradient-to-b from-border/50 to-transparent rounded-2xl max-w-4xl mx-auto">
          <div className="bg-background rounded-xl">
            <Image
              src="https://cdn.enhancv.com/predefined-examples/gtoz8KaPgvZJW6QL0qQqAN1YAucQLNzenvKdtL9r/image.png"
              alt="Modern Resume Template"
              width={1000}
              height={1414}
              className="relative w-full mx-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline">
              Create Your Resume in 3 Simple Steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our intuitive process makes resume building a breeze.
            </p>
          </div>

          <div className="mt-16 grid gap-12 relative">
            <div
              className="absolute left-8 sm:left-1/2 transform -translate-x-1/2 h-full w-px bg-border"
              aria-hidden="true"
            />
            {[
              {
                icon: <Paintbrush className="w-6 h-6" />,
                step: "STEP 01",
                title: "Choose a Template",
                text: "Select a professionally designed template that fits your style and industry.",
                alignment: "md:text-left",
                reverse: false,
              },
              {
                icon: <FileEdit className="w-6 h-6" />,
                step: "STEP 02",
                title: "Fill in Your Details",
                text: "Use our live editor to add your experience, skills, and accomplishments with ease.",
                alignment: "md:text-right",
                reverse: true,
              },
              {
                icon: <Bot className="w-6 h-6" />,
                step: "STEP 03",
                title: "Enhance & Download",
                text: "Enhance your content with AI suggestions and download your perfect resume as a PDF.",
                alignment: "md:text-left",
                reverse: false,
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-10 ${
                  step.reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary border-2 border-background shrink-0 z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                </div>
                <div className={`flex-1 ${step.alignment}`}>
                  <p className="text-sm font-semibold text-primary tracking-wider">
                    {step.step}
                  </p>
                  <h3 className="font-headline text-2xl font-bold mt-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-secondary/50 px-4">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Powerful Features, Simple Interface
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to create a resume that stands out from the
              crowd.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <div className="inline-block p-3 bg-primary/10 rounded-lg border border-primary/20 mb-4">
                <Bot className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold font-headline">
                AI-Powered Content Suggestions
              </h3>
              <p className="mt-4 text-muted-foreground text-lg">
                Tired of writer's block? Our AI assistant helps you craft
                compelling bullet points that highlight your achievements and
                impress recruiters.
              </p>
              <Button
                asChild
                variant="link"
                className="px-0 text-lg mt-4 group"
              >
                <Link href="/features">
                  Learn more{" "}
                  <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <Image
              src="https://cdn.prod.website-files.com/62775a91cc3db44c787149de/67994edfc94bf5d1172bcd83_ai-resume-builder1.webp"
              alt="AI Feedback"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-24">
            <Image
              src="https://cdn-images.zety.com/images/zety/landings/builder/in/resume-builder-template@3x.png"
              alt="Live editor preview"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-xl shadow-lg md:order-2"
            />
            <div className="md:order-1 relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <div className="inline-block p-3 bg-primary/10 rounded-lg border border-primary/20 mb-4">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold font-headline">
                Intuitive Live Editor
              </h3>
              <p className="mt-4 text-muted-foreground text-lg">
                What you see is what you get. Our editor provides a seamless
                experience, updating your resume preview in real-time as you
                type.
              </p>
              <Button
                asChild
                variant="link"
                className="px-0 text-lg mt-4 group"
              >
                <Link href="/features">
                  Learn more{" "}
                  <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-4">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Loved by Professionals Worldwide
            </h2>
            <p className="mt-4 text-muted-foreground">
              Don't just take our word for it. Here's what our users are saying
              about VitaCrafter.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-secondary/40 border-0 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:bg-secondary/60 hover:-translate-y-1"
              >
                <CardContent className="pt-8 flex-grow">
                  <p className="text-foreground relative">
                    <span
                      className="absolute -top-4 -left-4 text-8xl text-primary/10 font-serif leading-none"
                      aria-hidden="true"
                    >
                      "
                    </span>
                    {testimonial.quote}
                  </p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4 pt-0 mt-auto">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-base font-bold">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.title}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4">
        <div className="container">
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/80 to-primary p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight text-primary-foreground">
              Ready to Land Your Dream Job?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/80">
              Take the next step in your career. Start building with VitaCrafter
              today and create a resume that truly represents you.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <Link href="/templates">
                  Create My Resume Now <MoveRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
