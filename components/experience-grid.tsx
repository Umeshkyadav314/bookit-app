"use client"

import Link from "next/link"
import Image from "next/image"

interface Experience {
  id: string
  title: string
  location: string
  image: string
  price: number
  description: string
}

export default function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer group transition-all"
        >
          {/* Image */}
          <div className="relative h-40 sm:h-48 w-full bg-border overflow-hidden">
            <Image
              src={exp.image || "/placeholder.svg?height=200&width=300&query=travel experience"}
              alt={exp.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2 text-foreground">{exp.title}</h3>
            <p className="text-xs sm:text-sm text-muted mb-2">{exp.location}</p>
            <p className="text-xs sm:text-sm text-foreground mb-4 line-clamp-2">{exp.description}</p>

            {/* Price and Button */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-muted">From</p>
                <p className="text-lg sm:text-xl font-bold text-foreground">₹{exp.price}</p>
              </div>
              <Link href={`/experience/${exp.id}`} className="btn-primary text-xs sm:text-sm whitespace-nowrap">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
