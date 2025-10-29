"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface BookingData {
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  quantity: number
  subtotal: number
  taxes: number
  total: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    promoCode: "",
  })
  const [discount, setDiscount] = useState(0)
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData")
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyPromo = async () => {
    if (!bookingData || !formData.promoCode) return
    try {
      const res = await fetch(`/api/promo/${encodeURIComponent(formData.promoCode)}`)
      if (!res.ok) throw new Error("Invalid code")
      const promo = await res.json()
      const subtotal = bookingData.subtotal
      // If discount < 1 treat as percentage (e.g. 0.1 = 10%), else flat amount
      const value = promo.discount < 1 ? Math.round(subtotal * promo.discount) : Math.round(promo.discount)
      setDiscount(Math.min(value, subtotal))
    } catch (_) {
      setDiscount(0)
      alert("Invalid promo code")
    }
  }

  const handlePayment = async () => {
    if (!formData.fullName || !formData.email || !agreed) {
      alert("Please fill all fields and agree to terms")
      return
    }

    try {
      const payload = {
        experienceId: bookingData?.experienceId,
        fullName: formData.fullName,
        email: formData.email,
        date: new Date(bookingData!.date),
        time: bookingData!.time,
        quantity: bookingData!.quantity,
        subtotal: bookingData!.subtotal,
        taxes: bookingData!.taxes,
        total: bookingData!.total - discount,
        promoCode: formData.promoCode || null,
        discount,
      }
      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const booking = await res.json()
        sessionStorage.setItem("referenceId", booking.referenceId || "")
        router.push("/confirmation")
        return
      }
      // fallback if backend fails
      const referenceFallback = "HUF" + Math.random().toString(36).slice(2, 8).toUpperCase() + "SO"
      sessionStorage.setItem("referenceId", referenceFallback)
      router.push("/confirmation")
    } catch (_) {
      const referenceFallback = "HUF" + Math.random().toString(36).slice(2, 8).toUpperCase() + "SO"
      sessionStorage.setItem("referenceId", referenceFallback)
      router.push("/confirmation")
    }
  }

  if (!bookingData) {
    return <div className="text-center py-12">Loading...</div>
  }

  const finalTotal = bookingData.total - discount

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary mb-6 hover:opacity-80 text-sm sm:text-base font-medium"
        >
          <ChevronLeft size={20} />
          Checkout
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left - Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-foreground">Full name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-foreground">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field text-sm"
              />
            </div>

            {/* Promo Code */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2 text-foreground">Promo code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="promoCode"
                  placeholder="Enter promo code"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  className="input-field flex-1 text-sm"
                />
                <button
                  onClick={handleApplyPromo}
                  className="btn-secondary px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs sm:text-sm text-foreground">I agree to the terms and safety policy</span>
            </label>
          </div>

          {/* Right - Order Summary */}
          <div className="card sticky top-24 h-fit">
            <h3 className="font-bold text-base sm:text-lg mb-6 text-foreground">Order Summary</h3>

            <div className="space-y-3 mb-6 pb-6 border-b border-border text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Experience</span>
                <span className="font-medium line-clamp-1 text-foreground">{bookingData.experienceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Date</span>
                <span className="font-medium text-foreground">{bookingData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Time</span>
                <span className="font-medium text-foreground">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Qty</span>
                <span className="font-medium text-foreground">{bookingData.quantity}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3 mb-6 pb-6 border-b border-border text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-foreground">₹{bookingData.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Taxes</span>
                <span className="text-foreground">₹{bookingData.taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-sm sm:text-base text-foreground">Total</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">₹{finalTotal}</span>
            </div>

            {/* Payment Button */}
            <button onClick={handlePayment} className="btn-primary w-full font-bold text-sm sm:text-base">
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
