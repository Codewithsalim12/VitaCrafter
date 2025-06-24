"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ResumeEditor } from "../resume-editor";
import { templates } from "../templates";
import type { TemplateId } from "../templates";
import type { ResumeData } from "../types";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultTemplateId: TemplateId = "classic";

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const [initialData, setInitialData] = useState<ResumeData | null>(null);
  const [templateId, setTemplateId] = useState<TemplateId>(defaultTemplateId);

  const resumeId = params.resumeId as string;

  useEffect(() => {
    if (status === "authenticated" && resumeId) {
      if (resumeId === "new") {
        const newTemplateId = (searchParams.get("template") ||
          defaultTemplateId) as TemplateId;
        setInitialData(templates[newTemplateId] || templates.classic);
        setTemplateId(newTemplateId);
      } else {
        const fetchResume = async () => {
          try {
            const response = await fetch(`/api/resumes/${resumeId}`);
            if (response.ok) {
              const data = await response.json();
              if (data) {
                setInitialData(data.data);
                setTemplateId(data.templateId);
              } else {
                toast({
                  title: "Error",
                  description: "Could not load your resume.",
                  variant: "destructive",
                });
                router.push("/dashboard");
              }
            } else {
              toast({
                title: "Error",
                description: "Could not load your resume.",
                variant: "destructive",
              });
              router.push("/dashboard");
            }
          } catch (error) {
            console.error("Error fetching resume:", error);
            toast({
              title: "Error",
              description: "An unexpected error occurred.",
              variant: "destructive",
            });
            router.push("/dashboard");
          }
        };
        fetchResume();
      }
    }
  }, [resumeId, status, router, searchParams, toast]);

  if (!initialData || status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
        <p className="text-muted-foreground">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div>
      <ResumeEditor initialData={initialData} templateId={templateId} />
    </div>
  );
}
