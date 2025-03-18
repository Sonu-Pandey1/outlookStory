import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({ error: "Database connection failed." }, { status: 500 });
  }
}
