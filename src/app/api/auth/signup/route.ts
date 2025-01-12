import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
  
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse body to JSON directly
    const { email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string } = body;

    // Check if email or password is missing
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Check if user with the provided email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // If the user already exists, return an error
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: { email, passwordHash: hashedPassword, firstName, lastName },
    });

    // Return success response
    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
