"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Target, Sparkles } from "lucide-react"

const stats = [
  { label: "Calculators", value: "8" },
  { label: "Free", value: "100%" },
  { label: "Real Formulas", value: "Yes" },
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" aria-hidden="true" />
      
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Free for all Indian investors</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Plan Smarter.{" "}
            <span className="text-primary">Invest Better.</span>
          </h1>

          {/* Subtext */}
          <p
            className={`mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-8 text-pretty transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Free calculators for every Indian investor. Make informed decisions with accurate calculations using real financial formulas.
          </p>

          {/* Stats */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 text-sm sm:text-base"
              >
                <span className="font-bold text-primary">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
                {index < stats.length - 1 && (
                  <span className="hidden sm:inline text-border ml-4">|</span>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              asChild
            >
              <a href="#sip-calculator">
                <Calculator className="mr-2 h-5 w-5" aria-hidden="true" />
                Try SIP Calculator
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto font-semibold px-8 py-6 text-base rounded-xl border-2 hover:bg-secondary transition-all"
              asChild
            >
              <a href="#goal-planner">
                <Target className="mr-2 h-5 w-5" aria-hidden="true" />
                Plan My Goal
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block" aria-hidden="true">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-muted-foreground animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
