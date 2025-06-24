"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ResumeData } from "./types";
import { resumeSchema } from "./schema";
import { EditorForm } from "./editor-form";
import { ResumePreview } from "./resume-preview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Save, Eye, ChevronLeft } from "lucide-react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { TemplateId } from "./templates";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function ResumeEditor({
  initialData,
  templateId,
}: {
  initialData: ResumeData;
  templateId: TemplateId;
}) {
  const formMethods = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
    mode: "onBlur",
  });

  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const watchedData = formMethods.watch();
  const router = useRouter();

  useEffect(() => {
    formMethods.reset(initialData);
  }, [initialData, formMethods]);

  const mobilePreviewWrapperRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = mobilePreviewWrapperRef.current;
    const preview = mobilePreviewRef.current;

    if (!wrapper || !preview || !showMobilePreview) return;

    const calculateScale = () => {
      const resumeWidth = 793.7; // A4 width in pixels at 96 DPI
      const containerWidth = wrapper.offsetWidth;
      const scale = Math.min((containerWidth - 32) / resumeWidth, 1); // 32px for padding
      preview.style.transform = `scale(${scale})`;
      preview.style.transformOrigin = "top center";
    };

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(wrapper);
    calculateScale();

    return () => resizeObserver.disconnect();
  }, [showMobilePreview]);

  const handleSave = async () => {
    setIsSaving(true);
    const resumeData = formMethods.getValues();
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    const isEditing = pathSegments[pathSegments.length - 2] === 'editor' && lastSegment !== 'new';
    const resumeId = isEditing ? lastSegment : null;

    try {
      let response;

      if (isEditing && resumeId) {
        // Update existing resume
        response = await fetch(`/api/resumes/${resumeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: resumeData.personalInfo.name || "Untitled Resume",
            data: resumeData,
            templateId,
          }),
        });
        if (response.ok) {
          toast({ title: "Success", description: "Resume updated successfully." });
        } else {
           const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update resume");
        }
      } else {
        // Create new resume
        response = await fetch("/api/resumes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: resumeData.personalInfo.name || "Untitled Resume",
            data: resumeData,
            templateId,
          }),
        });
        if (response.ok) {
          const newResume = await response.json();
          toast({ title: "Success", description: "Resume saved successfully." });
          router.push(`/editor/${newResume._id}`);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save resume");
        }
      }
    } catch (error) {
      toast({
        title: "Error Saving",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    const originalElement =
      document.getElementById("resume-preview-desktop") ??
      document.getElementById("resume-preview-mobile");

    if (!originalElement) {
      toast({
        title: "Download Error",
        description: "Could not find the resume content to download.",
        variant: "destructive",
      });
      setIsDownloading(false);
      return;
    }

    const clone = originalElement.cloneNode(true) as HTMLElement;

    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0px";
    clone.style.transform = "none";
    document.body.appendChild(clone);
    clone.classList.add("pdf-export-mode");

    try {
      const canvas = await html2canvas(clone, {
        scale: 3, // Increased scale for better image quality
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);

      const contentHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (contentHeight > pdfHeight) {
        // Content overflows, scale it down to fit the page
        const scaleFactor = pdfHeight / contentHeight;
        const scaledWidth = pdfWidth * scaleFactor;
        const scaledHeight = pdfHeight; // Fit to page height
        const xOffset = (pdfWidth - scaledWidth) / 2; // Center horizontally
        pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, scaledHeight);
      } else {
        // Content fits, center it vertically
        const finalImgWidth = pdfWidth;
        const finalImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let finalY = (pdfHeight - finalImgHeight) / 2;
        pdf.addImage(imgData, "PNG", 0, finalY, finalImgWidth, finalImgHeight);
      }

      const links = clone.querySelectorAll<HTMLAnchorElement>("a[href]");
      const cloneRect = clone.getBoundingClientRect();

      const scaleX = pdfWidth / cloneRect.width;
      const scaleY = pdfHeight / cloneRect.height;

      links.forEach((link) => {
        const url = link.getAttribute("href");
        if (!url) return;

        // Check if there is a specific element within the link to make clickable
        const iconLinkWrapper = link.querySelector(
          '[data-pdf-icon-link="true"]'
        );
        const elementToMeasure = iconLinkWrapper || link;

        const rect = elementToMeasure.getBoundingClientRect();

        const pdfX = (rect.left - cloneRect.left) * scaleX;
        const pdfY = (rect.top - cloneRect.top) * scaleY;
        const pdfW = rect.width * scaleX;
        const pdfH = rect.height * scaleY;

        pdf.link(pdfX, pdfY, pdfW, pdfH, { url });
      });

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error Generating PDF",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      document.body.removeChild(clone);
      setIsDownloading(false);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-4rem)] bg-background relative">
        {/* Editor Panel */}
        <div
          className={cn(
            "w-full lg:w-[45%] lg:max-w-[650px] border-r h-full transition-all duration-300",
            showMobilePreview && "hidden lg:block"
          )}
        >
          <ScrollArea className="h-full">
            <EditorForm onPreviewClick={() => setShowMobilePreview(true)} />
          </ScrollArea>
        </div>

        {/* Mobile Preview */}
        {showMobilePreview && (
          <div className="lg:hidden w-full h-full flex flex-col bg-secondary/40">
            <div className="flex h-16 items-center justify-between gap-2 border-b bg-background/95 p-4 backdrop-blur-sm">
              <Button
                variant="outline"
                onClick={() => setShowMobilePreview(false)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2">Back to Editor</span>
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || isDownloading}
                  variant="outline"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">Save</span>
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isSaving || isDownloading}
                  variant="default"
                  className="shadow-md"
                >
                  {isDownloading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">Download</span>
                </Button>
              </div>
            </div>
            <div
              ref={mobilePreviewWrapperRef}
              className="flex-1 overflow-auto p-4 flex justify-center"
            >
              <div
                ref={mobilePreviewRef}
                id="resume-preview-mobile"
                className="origin-top transition-transform duration-200"
              >
                <ResumePreview data={watchedData} templateId={templateId} />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Preview */}
        <div className="hidden lg:flex flex-1 flex-col bg-secondary/40">
          <div className="flex h-16 items-center justify-end gap-4 border-b bg-background/95 p-4 backdrop-blur-sm">
            <Button
              onClick={handleSave}
              disabled={isSaving || isDownloading}
              variant="outline"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span className="ml-2">Save</span>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isSaving || isDownloading}
              variant="default"
              className="shadow-md"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="ml-2">Download PDF</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-8 flex justify-center">
            <div className="scale-[0.8] lg:scale-[0.85] xl:scale-[0.9] origin-top transition-transform duration-300">
              <ResumePreview
                data={watchedData}
                templateId={templateId}
                id="resume-preview-desktop"
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
