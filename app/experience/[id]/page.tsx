"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { experiences as mockExperiences } from "@/lib/mock-data"
import BookingSidebar from "@/components/booking-sidebar"

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [experience, setExperience] = useState<any | null>(null)
  const [selectedDate, setSelectedDate] = useState("Oct 22")
  const [selectedTime, setSelectedTime] = useState("09:00 am")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let isMounted = true
    async function load() {
      // fallback to mock first for instant paint
      const local = mockExperiences.find((e) => e.id === id) || null
      if (isMounted) setExperience(local)
      try {
        // Only call API if id looks like a Mongo ObjectId
        if (!/^[a-f0-9]{24}$/i.test(id)) return
        const res = await fetch(`/api/experiences/${id}`)
        if (res.ok) {
          const data = await res.json()
          if (isMounted && data) setExperience(data)
        }
      } catch (_) {
        // keep mock
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [id])

  if (!experience) {
    return <div className="text-center py-12">Loading...</div>
  }

  const dates = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"]
  const times = ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"]

  const subtotal = (experience.price || 0) * quantity
  const taxes = Math.round(subtotal * 0.06)
  const total = subtotal + taxes

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary mb-6 hover:opacity-80 text-sm sm:text-base font-medium"
        >
          <ChevronLeft size={20} />
          Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-6 sm:mb-8 bg-border">
              <Image
                src={experience.image || "/placeholder.svg?height=400&width=600&query=travel experience"}
                alt={experience.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title and Description */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
              {experience.title}
            </h1>
            <p className="text-sm sm:text-base text-foreground mb-6 leading-relaxed">{experience.description}</p>

            {/* Date Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Choose date</h3>
              <div className="flex gap-2 flex-wrap">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${selectedDate === date ? "bg-primary text-secondary" : "bg-border text-foreground hover:bg-border"
                      }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-foreground">Choose time</h3>
              <div className="flex gap-2 flex-wrap">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${selectedTime === time ? "bg-primary text-secondary" : "bg-border text-foreground hover:bg-border"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted mt-2">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About Section */}
            <div className="bg-border rounded-lg p-4 sm:p-6">
              <h3 className="font-bold text-base sm:text-lg mb-3 text-foreground">About</h3>
              <p className="text-foreground text-sm leading-relaxed">
                {experience.about || "Scenic routes, trained guides, and safety briefing. Minimum age 10."}
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <BookingSidebar
            experience={experience}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            subtotal={subtotal}
            taxes={taxes}
            total={total}
          />
        </div>
      </div>
    </main>
  )
}
