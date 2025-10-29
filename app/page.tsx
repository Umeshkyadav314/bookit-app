import ExperienceGrid from "@/components/experience-grid"
import { experiences as mockExperiences } from "@/lib/mock-data"

export default async function Home() {
  let experiences = mockExperiences
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/experiences`, { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        experiences = data
      }
    }
  } catch (_) {
    // fall back to mock
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <ExperienceGrid experiences={experiences} />
      </div>
    </main>
  )
}
