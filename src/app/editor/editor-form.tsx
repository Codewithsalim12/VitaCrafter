"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Wrench,
  Trash2,
  PlusCircle,
  Sparkles,
  Loader2,
  ScrollText,
  Award,
  BadgeCheck,
  Globe,
  Eye,
} from "lucide-react";
import type { ResumeData } from "./types";
import { getResumeFeedbackAction } from "./actions";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const generateId = () => Math.random().toString(36).substr(2, 9);

export function EditorForm({ onPreviewClick }: { onPreviewClick: () => void }) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<ResumeData>();

  const { toast } = useToast();

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experience" });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: extracurricularFields,
    append: appendExtracurricular,
    remove: removeExtracurricular,
  } = useFieldArray({ control, name: "extracurriculars" });
  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({ control, name: "certifications" });
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({ control, name: "languages" });

  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGetFeedback = async (
    fieldPath: `experience.${number}.description`
  ) => {
    setIsLoading(true);
    setFeedback("");
    setFeedbackError("");
    setIsDialogOpen(true);

    try {
      const content = getValues(fieldPath);
      if (!content.trim()) {
        throw new Error("Please enter some content first");
      }

      const result = await getResumeFeedbackAction({ resumeContent: content });
      if (result.success) {
        setFeedback(result.feedback);
      } else {
        throw new Error(result.error || "Failed to get feedback");
      }
    } catch (error) {
      setFeedbackError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      toast({
        title: "Feedback Error",
        description:
          error instanceof Error ? error.message : "Failed to get feedback",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("personalInfo.photo", reader.result as string);
        toast({
          title: "Photo Uploaded",
          description: "Your photo has been successfully uploaded.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              <Sparkles className="text-primary" /> AI Feedback
            </DialogTitle>
            <DialogDescription>
              Here are some suggestions to improve your resume content.
            </DialogDescription>
          </DialogHeader>
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          )}
          {feedback && (
            <div className="prose prose-sm max-w-none p-4 bg-secondary rounded-md whitespace-pre-wrap font-body">
              {feedback}
            </div>
          )}
          {feedbackError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{feedbackError}</AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      <div className="lg:hidden flex gap-4 sticky top-0 z-10 bg-background py-4 -mx-4 px-4 border-b">
        <Button variant="outline" className="w-full" onClick={onPreviewClick}>
          <Eye className="h-4 w-4 mr-2" />
          Preview Resume
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["personal", "summary", "experience"]}
        className="w-full"
      >
        <AccordionItem value="personal">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <User className="h-5 w-5" /> Personal Information
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  {...register("personalInfo.name", { required: true })}
                  placeholder="John Doe"
                />
                {errors.personalInfo?.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.personalInfo.name.message ||
                      "This field is required"}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("personalInfo.email", { required: true })}
                  placeholder="john@example.com"
                />
                {errors.personalInfo?.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.personalInfo.email.message ||
                      "Valid email is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("personalInfo.phone")}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("personalInfo.address")}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  {...register("personalInfo.linkedin")}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  {...register("personalInfo.github")}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                {...register("personalInfo.website")}
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo</Label>
              <Controller
                control={control}
                name="personalInfo.photo"
                render={({ field }) => (
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handlePhotoUpload(e);
                      field.onChange(e.target.files?.[0] || null);
                    }}
                    className="pt-2 text-sm text-muted-foreground"
                  />
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="summary">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <ScrollText className="h-5 w-5" /> Professional Summary
            </h3>
          </AccordionTrigger>
          <AccordionContent className="p-1">
            <Label htmlFor="summary">Your professional summary</Label>
            <Textarea
              id="summary"
              {...register("professionalSummary", { required: true })}
              rows={5}
              className="min-h-[120px]"
              placeholder="Experienced software engineer with 5+ years..."
            />
            {errors.professionalSummary && (
              <p className="text-destructive text-sm mt-1">
                {errors.professionalSummary.message || "Summary is required"}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experience">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <Briefcase className="h-5 w-5" /> Work Experience
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {experienceFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-md space-y-4 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title*</Label>
                    <Input
                      {...register(`experience.${index}.role`, {
                        required: true,
                      })}
                      placeholder="Software Engineer"
                    />
                    {errors.experience?.[index]?.role && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.experience[index].role.message ||
                          "Job Title is required"}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Company*</Label>
                    <Input
                      {...register(`experience.${index}.company`, {
                        required: true,
                      })}
                      placeholder="Tech Corp Inc."
                    />
                    {errors.experience?.[index]?.company && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.experience[index].company.message ||
                          "Company is required"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <Input
                      {...register(`experience.${index}.location`)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date*</Label>
                    <Input
                      {...register(`experience.${index}.startDate`, {
                        required: true,
                      })}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      {...register(`experience.${index}.endDate`)}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description*</Label>
                  <Textarea
                    {...register(`experience.${index}.description`, {
                      required: true,
                    })}
                    rows={5}
                    className="min-h-[120px]"
                    placeholder="• Developed new features...\n• Optimized performance..."
                  />
                  {errors.experience?.[index]?.description && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.experience[index].description.message ||
                        "Description is required"}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 group"
                  onClick={() =>
                    handleGetFeedback(`experience.${index}.description`)
                  }
                  disabled={isLoading}
                >
                  <Sparkles className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />{" "}
                  Get AI Feedback
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() =>
                appendExperience({
                  id: generateId(),
                  role: "New Role",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="education">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <GraduationCap className="h-5 w-5" /> Education
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {educationFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-md space-y-4 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>School*</Label>
                    <Input
                      {...register(`education.${index}.institution`, {
                        required: true,
                      })}
                      placeholder="University of Technology"
                    />
                    {errors.education?.[index]?.institution && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.education[index].institution.message ||
                          "Institution is required"}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Degree*</Label>
                    <Input
                      {...register(`education.${index}.degree`, {
                        required: true,
                      })}
                      placeholder="Bachelor of Science"
                    />
                    {errors.education?.[index]?.degree && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.education[index].degree.message ||
                          "Degree is required"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      {...register(`education.${index}.fieldOfStudy`)}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date*</Label>
                    <Input
                      {...register(`education.${index}.startDate`, {
                        required: true,
                      })}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      {...register(`education.${index}.endDate`)}
                      placeholder="MM/YYYY or Present"
                    />
                  </div>
                </div>
                <div>
                  <Label>GPA</Label>
                  <Input
                    {...register(`education.${index}.gpa`)}
                    placeholder="e.g. 3.8/4.0"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() =>
                appendEducation({
                  id: generateId(),
                  institution: "New University",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  gpa: "",
                })
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="projects">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <Lightbulb className="h-5 w-5" /> Projects
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-6">
              {projectFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`project-name-${index}`}>
                        Project Name*
                      </Label>
                      <Input
                        id={`project-name-${index}`}
                        {...register(`projects.${index}.name`, {
                          required: true,
                        })}
                        placeholder="Awesome Resume Builder"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-url-${index}`}>
                        Project URL
                      </Label>
                      <Input
                        id={`project-url-${index}`}
                        {...register(`projects.${index}.url`)}
                        placeholder="https://github.com/user/repo"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`project-description-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`project-description-${index}`}
                      {...register(`projects.${index}.description`)}
                      placeholder="Describe your project, your role, and the technologies used."
                      rows={4}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendProject({
                    id: generateId(),
                    name: "",
                    description: "",
                    url: "",
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <Wrench className="h-5 w-5" /> Skills
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-6">
              {skillFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`skill-category-${index}`}>
                        Category*
                      </Label>
                      <Input
                        id={`skill-category-${index}`}
                        {...register(`skills.${index}.category`, {
                          required: true,
                        })}
                        placeholder="e.g., Programming Languages"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`skill-name-${index}`}>Skills*</Label>
                      <Input
                        id={`skill-name-${index}`}
                        {...register(`skills.${index}.name`, {
                          required: true,
                        })}
                        placeholder="e.g., Python, JavaScript, SQL"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendSkill({ id: generateId(), name: "", category: "" })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Skills Category
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="certifications">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <Award className="h-5 w-5" /> Certifications
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-6">
              {certificationFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div>
                    <Label htmlFor={`certification-name-${index}`}>
                      Certification Name*
                    </Label>
                    <Input
                      id={`certification-name-${index}`}
                      {...register(`certifications.${index}.name`, {
                        required: true,
                      })}
                      placeholder="e.g., Certified Cloud Practitioner"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`certification-description-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`certification-description-${index}`}
                      {...register(`certifications.${index}.description`)}
                      placeholder="e.g., Issued by AWS, validating cloud knowledge."
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendCertification({
                    id: generateId(),
                    name: "",
                    description: "",
                    url: "",
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Certification
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="extracurriculars">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <BadgeCheck className="h-5 w-5" /> Extracurriculars
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-6">
              {extracurricularFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`extracurricular-title-${index}`}>
                        Title*
                      </Label>
                      <Input
                        id={`extracurricular-title-${index}`}
                        {...register(`extracurriculars.${index}.title`, {
                          required: true,
                        })}
                        placeholder="e.g., President"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`extracurricular-organization-${index}`}>
                        Organization*
                      </Label>
                      <Input
                        id={`extracurricular-organization-${index}`}
                        {...register(`extracurriculars.${index}.organization`, {
                          required: true,
                        })}
                        placeholder="e.g., Coding Club"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`extracurricular-start-${index}`}>
                        Start Date
                      </Label>
                      <Input
                        id={`extracurricular-start-${index}`}
                        {...register(`extracurriculars.${index}.startDate`)}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`extracurricular-end-${index}`}>
                        End Date
                      </Label>
                      <Input
                        id={`extracurricular-end-${index}`}
                        {...register(`extracurriculars.${index}.endDate`)}
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`extracurricular-description-${index}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`extracurricular-description-${index}`}
                      {...register(`extracurriculars.${index}.description`)}
                      placeholder="Describe your responsibilities and achievements."
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3"
                    onClick={() => removeExtracurricular(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendExtracurricular({
                    id: generateId(),
                    title: "",
                    organization: "",
                    role: "",
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Activity
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="languages">
          <AccordionTrigger className="hover:no-underline group">
            <h3 className="font-headline text-lg flex items-center gap-2 group-hover:text-primary">
              <Globe className="h-5 w-5" /> Languages
            </h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <div className="space-y-6">
              {languageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`language-name-${index}`}>
                        Language*
                      </Label>
                      <Input
                        id={`language-name-${index}`}
                        {...register(`languages.${index}.name`, {
                          required: true,
                        })}
                        placeholder="e.g., English"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`language-level-${index}`}>Level*</Label>
                      <Controller
                        control={control}
                        name={`languages.${index}.level`}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id={`language-level-${index}`}>
                              <SelectValue placeholder="Select proficiency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Native">Native</SelectItem>
                              <SelectItem value="Fluent">Fluent</SelectItem>
                              <SelectItem value="Professional">
                                Professional
                              </SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Basic">Basic</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendLanguage({
                    id: generateId(),
                    name: "",
                    level: "Fluent",
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Language
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
