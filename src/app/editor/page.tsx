"use client";

import { ResumeEditor } from "./resume-editor";
import { templates } from "./templates";
import type { TemplateId } from "./templates";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EditorPage() {
  const searchParams = useSearchParams();
  const templateId = (searchParams.get("template") || "classic") as TemplateId;
  const initialData = templates[templateId] || templates.classic;

  return (
    <div>
      <ResumeEditor initialData={initialData} templateId={templateId} />
    </div>
  );
}

export default function EditorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditorPage />
    </Suspense>
  );
}
