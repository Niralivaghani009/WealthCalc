"use client"

import { useEffect, useRef, useState } from "react"
import { 
  TrendingUp, 
  Wallet, 
  PiggyBank, 
  Building2, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Percent 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const calculators = [
  {
    id: "sip",
    name: "SIP Calculator",
    description: "Calculate your systematic investment plan returns",
    icon: TrendingUp,
    color: "bg-blue-500",
    href: "#sip-calculator",
  },
  {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    description: "Calculate one-time investment growth",
    icon: Wallet,
    color: "bg-green-500",
    href: "#lumpsum-calculator",
  },
  {
    id: "ppf",
    name: "PPF Calculator",
    description: "Public Provident Fund maturity calculator",
    icon: PiggyBank,
    color: "bg-amber-500",
    href: "#ppf-calculator",
  },
  {
    id: "fd",
    name: "FD Calculator",
    description: "Fixed Deposit interest calculator",
    icon: Building2,
    color: "bg-purple-500",
    href: "#fd-calculator",
  },
  {
    id: "rd",
    name: "RD Calculator",
    description: "Recurring Deposit maturity calculator",
    icon: Calendar,
    color: "bg-pink-500",
    href: "#rd-calculator",
  },
  {
    id: "emi",
    name: "EMI Calculator",
    description: "Calculate your loan EMI payments",
    icon: CreditCard,
    color: "bg-red-500",
    href: "#emi-calculator",
  },
  {
    id: "cagr",
    name: "CAGR Calculator",
    description: "Compound Annual Growth Rate calculator",
    icon: BarChart3,
    color: "bg-teal-500",
    href: "#cagr-calculator",
  },
  {
    id: "compound",
    name: "Compound Interest",
    description: "Simple vs compound interest comparison",
    icon: Percent,
    color: "bg-indigo-500",
    href: "#compound-calculator",
  },
]

export function CalculatorCards() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id")
            if (id) {
              setVisibleCards((prev) => new Set([...prev, id]))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    const cards = containerRef.current?.querySelectorAll("[data-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="calculators"
      className="py-16 sm:py-24 bg-secondary/30"
      aria-labelledby="calculators-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="calculators-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            All Calculators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose from our comprehensive suite of financial calculators designed for Indian investors
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="list"
          aria-label="Available calculators"
        >
          {calculators.map((calc, index) => {
            const Icon = calc.icon
            const isVisible = visibleCards.has(calc.id)

            return (
              <Card
                key={calc.id}
                data-id={calc.id}
                className={`group cursor-pointer border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                role="listitem"
              >
                <a href={calc.href} className="block">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${calc.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                      aria-hidden="true"
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {calc.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent"
                      tabIndex={-1}
                    >
                      Open Calculator
                      <span className="ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        →
                      </span>
                    </Button>
                  </CardContent>
                </a>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
