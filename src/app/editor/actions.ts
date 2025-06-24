'use server';

import { getResumeFeedback } from '@/ai/flows/ai-resume-feedback';
import { z } from 'zod';

const actionInputSchema = z.object({
  resumeContent: z.string(),
});

export async function getResumeFeedbackAction(input: {
  resumeContent: string;
}) {
  try {
    const validatedInput = actionInputSchema.parse(input);
    const output = await getResumeFeedback(validatedInput);
    return { success: true, feedback: output.feedback };
  } catch (error) {
    console.error('AI Feedback Error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input.' };
    }
    return {
      success: false,
      error: 'An unexpected error occurred while generating feedback.',
    };
  }
}
