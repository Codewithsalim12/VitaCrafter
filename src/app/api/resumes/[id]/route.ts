import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import Resume from "@/models/Resume";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();
    const resume = await Resume.findOne({
      _id: params.id,
      user: session.user.id,
    });
    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return NextResponse.json(
      { message: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { title, data, templateId } = await req.json();
    await dbConnect();

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: params.id, user: session.user.id },
      { title, data, templateId },
      { new: true }
    );

    if (!updatedResume) {
      return NextResponse.json(
        { message: "Resume not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Failed to update resume:", error);
    return NextResponse.json(
      { message: "Failed to update resume" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();
    const deletedResume = await Resume.findOneAndDelete({
      _id: params.id,
      user: session.user.id,
    });

    if (!deletedResume) {
      return NextResponse.json(
        { message: "Resume not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Failed to delete resume:", error);
    return NextResponse.json(
      { message: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
