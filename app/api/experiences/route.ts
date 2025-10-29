import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const experience = await prisma.experience.create({
      data: body,
    })
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error("Error creating experience:", error)
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
