import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const promoCodes = await prisma.promoCode.findMany({
      where: { active: true },
    })
    return NextResponse.json(promoCodes)
  } catch (error) {
    console.error("Error fetching promo codes:", error)
    return NextResponse.json({ error: "Failed to fetch promo codes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const promoCode = await prisma.promoCode.create({
      data: body,
    })
    return NextResponse.json(promoCode, { status: 201 })
  } catch (error) {
    console.error("Error creating promo code:", error)
    return NextResponse.json({ error: "Failed to create promo code" }, { status: 500 })
  }
}
