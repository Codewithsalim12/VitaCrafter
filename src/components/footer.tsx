"use client";

import Logo from "@/components/logo";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "Thank you for subscribing!",
          description: "Please check your email for confirmation.",
          variant: "default",
        });
        setEmail("");
      } else {
        toast({
          title: "Subscription failed",
          description: data.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Logo className="scale-125 text-white" />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {/* VitaCrafter */}
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-md">
              Transform your career with AI-powered resume building. Create
              stunning, professional resumes that get you noticed by top
              employers worldwide.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 from 2,300+ users</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/templates", label: "Resume Templates" },
                { href: "/features", label: "Features" },
                { href: "/editor", label: "Resume Editor" },
                { href: "/ai-assistant", label: "AI Assistant" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 transition-colors duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/support", label: "Support" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-pink-400 transition-colors duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <form
          onSubmit={handleNewsletterSubmit}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">
              Stay Updated with VitaCrafter
            </h3>
            <p className="text-gray-300 mb-6">
              Get the latest tips, templates, and AI features delivered to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </form>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {new Date().getFullYear()} VitaCrafter. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for job seekers worldwide.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/mohammad_s88048"
                  aria-label="Twitter"
                  className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </a>
                <a
                  href="https://github.com/Codewithsalim12"
                  aria-label="GitHub"
                  className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammadsalimmir"
                  aria-label="LinkedIn"
                  className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </a>
                <a
                  href="mailto:support@vitacrafter.com"
                  aria-label="Email"
                  className="group p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Mail className="w-5 h-5 text-gray-300 group-hover:text-green-400 transition-colors" />
                </a>
              </div>

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="group p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
    </footer>
  );
}
