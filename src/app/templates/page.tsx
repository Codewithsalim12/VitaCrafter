"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MoveRight,
  Award,
  Star,
  Zap,
  CheckCircle,
  ClipboardEdit,
  Palette,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const templates = [
  {
    id: "classic",
    name: "Classic Professional",
    image:
      "https://gdoc.io/uploads/classic-resume-free-google-docs-template-t-712x984.webp",
    hint: "resume professional",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    image:
      "https://cdn.enhancv.com/predefined-examples/gtoz8KaPgvZJW6QL0qQqAN1YAucQLNzenvKdtL9r/image.png",
    hint: "resume modern",
    badge: "Trending",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "creative",
    name: "Creative Academic",
    image:
      "https://resumegenius.com/wp-content/uploads/Windsor-Creative-Resume-Template-Orange.png",
    hint: "resume creative",
    badge: "For Designers",
    badgeColor: "bg-purple-500",
  },
  {
    id: "photo",
    name: "Modern with Photo",
    image:
      "https://staticlearn.shine.com/l/m/images/blog/mobile/what%20is%20a%20cv.webp",
    hint: "resume photo",
    badge: "New",
    badgeColor: "bg-sky-500",
  },
  {
    id: "elegant",
    name: "Elegant Analyst",
    image:
      "https://www.my-resume-templates.com/wp-content/uploads/2023/10/simple-resume-template-221.jpg",
    hint: "resume elegant analyst",
    badge: "New",
    badgeColor: "bg-gray-500",
  },
  {
    id: "modernIconic",
    name: "Modern Iconic",
    image:
      "https://cdn-images.zety.com/images/zety/landings/builder/resume-builder-template-iconic@2x.png",
    hint: "resume modern iconic",
    badge: "New",
    badgeColor: "bg-gray-500",
  },
  {
    id: "redlineChrono",
    name: "Redline Chrono",
    image:
      "https://www.livecareer.com/lcapp/uploads/2020/10/Artistic_Chrono_Construction_Worker-1-1.jpg?w=1700",
    hint: "resume redline chrono",
    badge: "New",
    badgeColor: "bg-red-700",
  },
  {
    id: "blueBannerConstruction",
    name: "Blue Banner Construction",
    image:
      "https://www.livecareer.com/lcapp/uploads/2021/08/experienced-construction-foremen-resume-example.jpg",
    hint: "resume blue banner construction",
    badge: "New",
    badgeColor: "bg-blue-800",
  },
];

const features = [
  {
    icon: <ClipboardEdit className="w-6 h-6" />,
    title: "Easy Editing",
    description: "Intuitive editor with real-time previews and suggestions",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Custom Colors",
    description:
      "Match your resume to your personal brand with custom color schemes",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "ATS Friendly",
    description:
      "Optimized layouts that pass through applicant tracking systems",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    content:
      "Landed 3 interviews in the first week after using the Modern template!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The clean design helped me stand out from hundreds of applicants.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    content: "Finally a resume that matches my creative portfolio perfectly!",
    rating: 4,
  },
];

export default function TemplatesPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-accent/10 flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center mb-4 px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <Zap className="w-4 h-4 mr-2" />
              Choose Your Style
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent mb-6">
              Resume Templates That Get Results
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Select from our award-winning templates designed to highlight your
              strengths and get you noticed by recruiters.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold rounded-lg px-8 py-4 shadow-lg text-lg transition-all duration-200"
              >
                <Link href="#templates">
                  Get Started <MoveRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <motion.section
        id="templates"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="py-16 md:py-24 lg:py-32 bg-background border-t border-border/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-2">
              Choose Your Perfect Template
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our templates are designed to pass ATS scans while maintaining
              visual appeal. Select one that matches your industry and
              personality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.04 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group block outline-none relative transition-all duration-300 hover:-translate-y-2"
              >
                <Link
                  href={`/editor?template=${template.id}`}
                  aria-label={`Use ${template.name} template`}
                  className=""
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-card group-hover:shadow-primary/30 group-hover:border-primary/30 transition-all duration-500 ease-out group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                    {template.badge && (
                      <div
                        className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold text-white rounded-full ${template.badgeColor} shadow-sm`}
                      >
                        {template.badge}
                      </div>
                    )}
                    <div className="relative aspect-[3/4.25] overflow-hidden">
                      <Image
                        src={template.image}
                        alt={template.name}
                        width={400}
                        height={566}
                        data-ai-hint={template.hint}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 items-start">
                      <h3 className="font-headline text-2xl font-bold text-white drop-shadow-lg">
                        {template.name}
                      </h3>
                      <div className="opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 mt-4 transition-all duration-500 ease-out w-full flex justify-start">
                        <Button
                          variant="secondary"
                          tabIndex={-1}
                          className="shadow-md hover:shadow-lg transition-shadow"
                        >
                          Choose Template
                          <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Powerful Resume Builder Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to create a resume that gets you interviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-8 shadow-lg border border-border/50 hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to build your winning resume?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of professionals who landed their dream jobs with
                our templates
              </p>
              <Button size="lg" className="shadow-lg">
                Start Building Now <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don't just take our word for it - hear from professionals who got
              results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className="bg-muted/50 rounded-2xl p-8 md:p-10 shadow-sm border border-border/50 relative min-h-[300px]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium mb-4">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonials[activeTestimonial].rating)].map(
                      (_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent" />
                      )
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[activeTestimonial].name} &mdash;{" "}
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
