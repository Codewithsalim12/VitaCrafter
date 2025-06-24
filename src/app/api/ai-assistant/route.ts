import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/ai/genkit";

export async function POST(req: NextRequest) {
  try {
    const { text, type, prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
    }
    // Use Genkit's ai.generate or similar method
    const aiResult = await ai.generate({ prompt });
    const result =
      typeof aiResult === "string"
        ? aiResult
        : aiResult?.text || aiResult?.output || JSON.stringify(aiResult);
    if (!result) {
      return NextResponse.json(
        { error: "No result from AI." },
        { status: 500 }
      );
    }
    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
