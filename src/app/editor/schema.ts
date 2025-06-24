import { z } from "zod";

export const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().optional(),
    linkedin: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
    photo: z.string().optional(),
  }),
  professionalSummary: z.string().optional(),
  experience: z.array(
    z.object({
      id: z.string(),
      role: z.string().min(1, "Role is required"),
      company: z.string().min(1, "Company is required"),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().min(1, "Description is required"),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string().min(1, "Institution is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      gpa: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Project name is required"),
      description: z.string().min(1, "Description is required"),
      url: z.string().url().optional().or(z.literal("")),
    })
  ),
  skills: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Skill cannot be empty"),
      category: z.string().min(1, "Category cannot be empty"),
    })
  ),
  extracurriculars: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Title is required"),
      organization: z.string().min(1, "Organization is required"),
      role: z.string().min(1, "Role is required"),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  certifications: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Certification name is required"),
      description: z.string().optional(),
      url: z.string().url().optional().or(z.literal("")),
    })
  ),
  languages: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Language cannot be empty"),
      level: z
        .enum(["Native", "Fluent", "Professional", "Intermediate", "Basic"])
        .default("Fluent"),
    })
  ),
});
