import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();
    const userObjectId = new mongoose.Types.ObjectId(session.user.id);
    const resumes = await Resume.find({ user: userObjectId }).sort({
      updatedAt: -1,
    });
    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return NextResponse.json(
      { message: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { title, data, templateId } = await req.json();
    await dbConnect();
    const userObjectId = new mongoose.Types.ObjectId(session.user.id);
    const newResume = new Resume({
      user: userObjectId,
      title,
      data,
      templateId,
    });

    await newResume.save();
    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Failed to create resume:", error);
    return NextResponse.json(
      { message: "Failed to create resume" },
      { status: 500 }
    );
  }
}
