"use client"

import { useState } from "react"
import { OnboardingFlow } from "./components/OnboardingFlow"
import { Dashboard } from "./components/Dashboard"

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
  }

  return <Dashboard />
}
