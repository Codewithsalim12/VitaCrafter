"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Coffee, Gift, Copy, Sparkles, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SupportPage() {
  const { toast } = useToast();
  const upiId = "6006798656@ibl"; // Placeholder

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${text} has been copied.`,
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Animated Gradient/Glassmorphism BG + Blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 animate-gradient-move" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
      <div className="container py-20 md:py-28 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 shadow-xl animate-float mb-4">
            <Sparkles className="w-8 h-8 text-white drop-shadow-glow" />
          </span>
          <h1 className="mt-2 text-5xl md:text-6xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl">
            Support VitaCrafter
          </h1>
          <p className="mt-4 text-lg text-muted-foreground font-medium">
            VitaCrafter is a free tool, built with love. If you've found it
            helpful and would like to support its continued development, you can
            buy me a coffee! Your support helps cover server costs and fuels
            future updates.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="mt-16 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/80 shadow-xl animate-float mb-6">
            <Coffee className="w-8 h-8 text-white drop-shadow-glow" />
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full mx-auto">
            <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl hover:scale-105 hover:shadow-primary/30 transition-all animate-float">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Scan to Pay
                </CardTitle>
                <CardDescription>
                  Use any UPI app to scan the QR code below.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative p-2 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 shadow-xl">
                  <Image
                    src="/qr.jpg"
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                    data-ai-hint="qr code"
                    className="rounded-xl border-4 border-white/80 shadow-2xl animate-float"
                  />
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full shadow-lg text-xs font-semibold">
                    UPI QR
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="block text-sm text-muted-foreground font-medium">
                    Account holder name
                  </span>
                  <span className="block text-base font-semibold text-foreground">
                    Mohammad Salim Mir
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl hover:scale-105 hover:shadow-primary/30 transition-all animate-float">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Pay via UPI ID
                </CardTitle>
                <CardDescription>
                  You can also send your support directly to my UPI ID.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex flex-col items-center">
                <div className="w-full flex flex-col items-center gap-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    UPI ID
                  </label>
                  <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2">
                    <span className="flex-1 font-mono text-foreground">
                      {upiId}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 animate-pulse-slow"
                      onClick={() => handleCopy(upiId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="block text-sm text-muted-foreground font-medium">
                    Account holder name
                  </span>
                  <span className="block text-base font-semibold text-foreground">
                    Mohammad Salim Mir
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Thank You Section */}
        <div
          className="mt-20 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 shadow-xl animate-float mb-2">
            <Heart className="w-7 h-7 text-white drop-shadow-glow" />
          </span>
          <div className="w-full max-w-2xl rounded-3xl bg-white/80 dark:bg-secondary/80 shadow-2xl backdrop-blur-xl border border-border/60 p-8 text-center overflow-hidden animate-float">
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
              Thank you for your generosity!
            </h2>
            <p className="mt-2 text-muted-foreground font-medium">
              Every contribution, big or small, makes a huge difference.
            </p>
            <Button
              asChild
              variant="link"
              className="mt-4 hover:scale-110 transition-transform duration-300 font-bold text-lg"
            >
              <Link href="/">
                <Gift className="mr-2" /> Back to building your resume
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
