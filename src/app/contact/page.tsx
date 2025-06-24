"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  MessageSquare,
  LifeBuoy,
  Loader2,
  Phone,
  MapPin,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { sendContactEmail } from "./actions";

const faqs = [
  {
    question: "Is VitaCrafter free to use?",
    answer:
      "Yes, the basic features of VitaCrafter, including creating a resume with our templates, are completely free. We may introduce premium features in the future.",
  },
  {
    question: "Can I download my resume in different formats?",
    answer:
      "Absolutely! You can export your resume as a PDF, DOCX, or TXT file directly from the editor.",
  },
  {
    question: "How does the AI resume feedback work?",
    answer:
      "Our AI analyzes the content of your resume sections, like your work experience descriptions, and provides suggestions to improve clarity, impact, and wording.",
  },
];

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    startTransition(async () => {
      const result = await sendContactEmail(values);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.success,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
        });
      }
    });
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Animated Gradient/Glassmorphism BG + Blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/40 animate-gradient-move" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/20 blur-3xl rounded-full opacity-60 animate-blob" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full opacity-60 animate-blob animation-delay-2000" />
      <div className="container py-16 md:py-24 lg:py-32 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/80 shadow-xl animate-float mb-4">
            <Sparkles className="w-8 h-8 text-white drop-shadow-glow" />
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-xl">
            Let's Connect
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium">
            Have questions or feedback? We're here to help you craft your
            perfect resume.
          </p>
        </div>

        {/* Centered Grid Wrapper */}
        <div className="flex justify-center items-start w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl w-full mx-auto items-start">
            {/* Contact Info Cards */}
            <div
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl hover:scale-105 hover:shadow-primary/30 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full animate-pulse-slow">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground mt-1">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-2">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl hover:scale-105 hover:shadow-primary/30 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full animate-pulse-slow">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground mt-1">
                      support@vitacrafter.com
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-2">
                      Typically reply within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl hover:scale-105 hover:shadow-primary/30 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full animate-pulse-slow">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground mt-1">
                      123 Resume Street
                    </p>
                    <p className="text-muted-foreground">New York, NY 10001</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card
              className="lg:col-span-2 shadow-2xl border-primary/20 bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border hover:scale-[1.01] hover:shadow-primary/30 transition-all animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary animate-float" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                className="bg-background/50 backdrop-blur-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Your Email"
                                {...field}
                                className="bg-background/50 backdrop-blur-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Subject"
                              {...field}
                              className="bg-background/50 backdrop-blur-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Your Message"
                              rows={5}
                              {...field}
                              className="bg-background/50 backdrop-blur-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold text-lg shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-primary hover:to-accent transition-transform duration-300 flex items-center justify-center gap-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : null}
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className="max-w-3xl mx-auto mt-20 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex flex-col items-center mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/80 shadow-xl animate-float mb-2">
              <HelpCircle className="w-6 h-6 text-white drop-shadow-glow" />
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg text-center">
              Frequently Asked Questions
            </h2>
          </div>
          <Card className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl border border-primary/20 shadow-2xl animate-float">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={faq.question}>
                    <AccordionTrigger className="font-semibold text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
