import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import { readFile as readDocx } from "docx4js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFile(file: formidable.File): Promise<string> {
  const ext = file.originalFilename?.split(".").pop()?.toLowerCase();
  if (ext === "pdf") {
    const data = fs.readFileSync(file.filepath);
    const pdf = await pdfParse(data);
    return pdf.text;
  } else if (ext === "docx") {
    const doc = await readDocx(file.filepath);
    return doc.getFullText();
  } else if (ext === "txt") {
    return fs.readFileSync(file.filepath, "utf8");
  } else {
    throw new Error("Unsupported file type");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({ multiples: false, maxFileSize: 2 * 1024 * 1024 });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: "Failed to parse file" });
    const file = files.file as formidable.File;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    let text = "";
    try {
      text = await parseFile(file);
    } catch (e) {
      return res.status(400).json({ error: "Failed to parse file" });
    }

    // Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are an ATS (Applicant Tracking System) resume analyzer. Analyze the following resume text for ATS compatibility, clarity, and effectiveness. Provide:
1. A brief feedback summary (max 5 sentences).
2. A list of specific suggestions for improvement (bullet points).
Resume:
${text}`;
    let feedback = "",
      improvements: string[] = [];
    try {
      const result = await model.generateContent(prompt);
      const content = result.response.text();
      const [fb, ...imps] = content.split(/Suggestions|Improvements|\n- /i);
      feedback = fb.trim();
      improvements = content
        .split(/\n[-*] /)
        .slice(1)
        .map((s) => s.replace(/^[-*] /, "").trim())
        .filter(Boolean);
      if (improvements.length === 0 && imps.length > 0) {
        improvements = imps
          .join("\n")
          .split(/\n/)
          .map((s) => s.replace(/^[-*] /, "").trim())
          .filter(Boolean);
      }
    } catch (e) {
      return res.status(500).json({ error: "Failed to analyze with Gemini" });
    }
    return res.status(200).json({ feedback, improvements });
  });
}
