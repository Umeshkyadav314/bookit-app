"use client"
import { useRouter } from "next/navigation"

interface BookingSidebarProps {
  experience: any
  quantity: number
  setQuantity: (q: number) => void
  selectedDate: string
  selectedTime: string
  subtotal: number
  taxes: number
  total: number
}

export default function BookingSidebar({
  experience,
  quantity,
  setQuantity,
  selectedDate,
  selectedTime,
  subtotal,
  taxes,
  total,
}: BookingSidebarProps) {
  const router = useRouter()

  const handleCheckout = () => {
    const bookingData = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total,
    }
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))
    router.push("/checkout")
  }

  return (
    <div className="card sticky top-24 h-fit">
      <div className="mb-6">
        <p className="text-xs sm:text-sm text-muted mb-1">Starts at</p>
        <p className="text-2xl sm:text-3xl font-bold text-primary">₹{experience.price}</p>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <p className="text-xs sm:text-sm text-muted mb-3">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-border text-sm"
          >
            −
          </button>
          <span className="font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-border text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-muted">Taxes</span>
          <span className="font-medium">₹{taxes}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-sm sm:text-base">Total</span>
        <span className="text-xl sm:text-2xl font-bold text-primary">₹{total}</span>
      </div>

      {/* Checkout Button */}
      <button onClick={handleCheckout} className="btn-primary w-full font-bold text-sm sm:text-base">
        Confirm
      </button>
    </div>
  )
}
