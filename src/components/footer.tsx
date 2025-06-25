import Logo from "@/components/logo";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-secondary/80 backdrop-blur-md text-secondary-foreground border-t border-border shadow-2xl">
      {/* Top Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-2 bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60 blur-lg opacity-80 rounded-b-xl pointer-events-none" />
      <div className="container px-4 py-14 flex flex-col items-center justify-center gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-center gap-3">
          <Logo className="scale-110" />
          <p className="text-base text-muted-foreground max-w-xl text-center font-medium">
            Craft your future with a perfect resume. AI-powered, professionally
            designed, and easy to use.
          </p>
        </div>
        {/* Links Grid - now horizontally scrollable on mobile */}
        <div className="w-full max-w-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
          <div className="min-w-[600px] grid grid-cols-3 gap-8">
            {/* Product */}
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-headline font-semibold mb-2 text-lg tracking-wide">
                Product
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/templates"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/editor"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    Resume Editor
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-headline font-semibold mb-2 text-lg tracking-wide">
                Company
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/about"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    Support Us
                  </Link>
                </li>
              </ul>
            </div>
            {/* Connect */}
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-headline font-semibold mb-2 text-lg tracking-wide">
                Connect
              </h4>
              <div className="flex gap-6 mt-1">
                <a
                  href="https://x.com/salimmir123"
                  aria-label="Twitter"
                  className="hover:text-primary transition-colors duration-200 hover:scale-110"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Codewithsalim12"
                  aria-label="GitHub"
                  className="hover:text-primary transition-colors duration-200 hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammadsalimmir"
                  aria-label="LinkedIn"
                  className="hover:text-primary transition-colors duration-200 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60 my-4" />
        {/* Bottom Text */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground gap-2">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">VitaCrafter</span>.
            All rights reserved.
          </span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="underline underline-offset-2 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
