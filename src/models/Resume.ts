import mongoose, { Schema, Document, models, Model, Types } from "mongoose";
import { resumeSchema } from "@/app/editor/schema";
import { z } from "zod";

export type ResumeData = z.infer<typeof resumeSchema>;

export interface IResume extends Document {
  user: Types.ObjectId;
  title: string;
  data: ResumeData;
  templateId: string;
}

const ResumeSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
    },
    data: {
      type: Object,
      required: true,
    },
    templateId: {
      type: String,
      required: true,
      default: "classic",
    },
  },
  { timestamps: true }
);

const Resume: Model<IResume> =
  models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;
