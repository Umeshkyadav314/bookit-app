import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const promoCode = await prisma.promoCode.findUnique({
      where: { code: params.code.toUpperCase() },
    })
    if (!promoCode || !promoCode.active) {
      return NextResponse.json({ error: "Promo code not found or inactive" }, { status: 404 })
    }
    return NextResponse.json(promoCode)
  } catch (error) {
    console.error("Error fetching promo code:", error)
    return NextResponse.json({ error: "Failed to fetch promo code" }, { status: 500 })
  }
}
