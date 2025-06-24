import { type z } from 'zod';
import { type resumeSchema } from './schema';

export type ResumeData = z.infer<typeof resumeSchema>;

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
}
