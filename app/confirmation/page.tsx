"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  const [referenceId, setReferenceId] = useState("")

  useEffect(() => {
    const id = sessionStorage.getItem("referenceId")
    if (id) {
      setReferenceId(id)
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500 sm:w-20 sm:h-20" />
          </div>

          {/* Message */}
          <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground">Booking Confirmed</h1>
          <p className="text-base sm:text-lg text-muted mb-6 sm:mb-8">
            Your adventure awaits! Check your email for booking details.
          </p>

          {/* Reference ID */}
          <div className="bg-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm text-muted mb-2">Reference ID</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{referenceId}</p>
          </div>

          {/* Back to Home */}
          <Link href="/" className="btn-primary inline-block text-sm sm:text-base">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
