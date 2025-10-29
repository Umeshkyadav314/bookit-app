import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!id || !id.match(/^[a-f0-9]{24}$/i)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
    }
    const experience = await prisma.experience.findUnique({
      where: { id },
    })
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }
    return NextResponse.json(experience)
  } catch (error) {
    console.error("Error fetching experience:", error)
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!id || !id.match(/^[a-f0-9]{24}$/i)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
    }
    const body = await request.json()
    const experience = await prisma.experience.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(experience)
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!id || !id.match(/^[a-f0-9]{24}$/i)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 })
    }
    await prisma.experience.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
