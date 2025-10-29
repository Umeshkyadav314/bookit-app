import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function generateReferenceId(): string {
  return "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase() + "SO"
}

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      include: { experience: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const referenceId = generateReferenceId()

    const booking = await prisma.booking.create({
      data: {
        ...body,
        referenceId,
      },
      include: { experience: true },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
