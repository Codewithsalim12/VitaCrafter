import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  if (searchParams.get("analytics") === "1") {
    // Analytics mode
    try {
      await dbConnect();
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const last7Days = new Date(now);
      last7Days.setDate(now.getDate() - 6);

      const totalUsers = await User.countDocuments();
      const newUsersToday = await User.countDocuments({
        createdAt: { $gte: startOfToday },
      });
      const newUsersThisWeek = await User.countDocuments({
        createdAt: { $gte: startOfWeek },
      });
      const activeUsers = await User.countDocuments({
        lastLogin: { $gte: last7Days },
      });
      const recentUsers = await User.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .select("name email createdAt lastLogin role");
      return NextResponse.json({
        totalUsers,
        newUsersToday,
        newUsersThisWeek,
        activeUsers,
        recentUsers,
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      return NextResponse.json(
        { message: "Failed to fetch analytics" },
        { status: 500 }
      );
    }
  }

  try {
    await dbConnect();
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
