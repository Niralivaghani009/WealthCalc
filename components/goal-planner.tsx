"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateGoalPlannerPDF } from "@/lib/generate-pdf"
import {
  AlertTriangle,
  Car,
  GraduationCap,
  Home,
  Plane,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
  Download,
} from "lucide-react"

const goals = [
  {
    id: "emergency",
    name: "Emergency Fund",
    icon: Shield,
    color: "bg-red-500",
    defaultAmount: 300000,
    description: "3-6 months of expenses",
  },
  {
    id: "car",
    name: "Car",
    icon: Car,
    color: "bg-blue-500",
    defaultAmount: 800000,
    description: "New or used vehicle",
  },
  {
    id: "travel",
    name: "Travel",
    icon: Plane,
    color: "bg-teal-500",
    defaultAmount: 200000,
    description: "Dream vacation",
  },
  {
    id: "house",
    name: "House",
    icon: Home,
    color: "bg-amber-500",
    defaultAmount: 5000000,
    description: "Down payment or full",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "bg-purple-500",
    defaultAmount: 1500000,
    description: "Higher studies",
  },
  {
    id: "retirement",
    name: "Retirement",
    icon: Users,
    color: "bg-green-500",
    defaultAmount: 10000000,
    description: "Golden years corpus",
  },
]

type Step = 1 | 2 | 3

export function GoalPlanner() {
  const [step, setStep] = useState<Step>(1)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [targetAmount, setTargetAmount] = useState(1000000)
  const [timeHorizon, setTimeHorizon] = useState(5)
  const [currentSavings, setCurrentSavings] = useState(10000)
  const [inflationRate, setInflationRate] = useState(6)

  const selectedGoalData = goals.find((g) => g.id === selectedGoal)

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId)
    const goal = goals.find((g) => g.id === goalId)
    if (goal) {
      setTargetAmount(goal.defaultAmount)
    }
    setStep(2)
  }

  const results = useMemo(() => {
    if (step !== 3) return null

    // Adjust target for inflation
    const inflationAdjustedTarget =
      targetAmount * Math.pow(1 + inflationRate / 100, timeHorizon)

    // Expected return rates
    const conservativeRate = 8
    const moderateRate = 12
    const aggressiveRate = 15

    // Calculate required SIP for different scenarios
    const calculateSIP = (rate: number) => {
      const monthlyRate = rate / 12 / 100
      const months = timeHorizon * 12
      const requiredCorpus = inflationAdjustedTarget - currentSavings * Math.pow(1 + rate / 100, timeHorizon)
      
      if (requiredCorpus <= 0) return 0
      
      const sip =
        (requiredCorpus * monthlyRate) /
        (Math.pow(1 + monthlyRate, months) - 1)
      return Math.max(0, Math.round(sip))
    }

    // Calculate projected corpus at 12% return
    const monthlyRate = moderateRate / 12 / 100
    const months = timeHorizon * 12
    const projectedFromSavings = currentSavings * Math.pow(1 + moderateRate / 100, timeHorizon)

    const requiredSIP = calculateSIP(moderateRate)
    const projectedCorpus =
      projectedFromSavings +
      requiredSIP *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate)

    // Determine risk level and recommendation
    let riskLevel: "Low" | "Medium" | "High"
    let recommendation: string
    let investmentType: string

    if (timeHorizon <= 2) {
      riskLevel = "Low"
      recommendation =
        "With a short time horizon, focus on safe investments like FDs, RDs, or debt mutual funds."
      investmentType = "FD/RD/Debt Funds"
    } else if (timeHorizon <= 5) {
      riskLevel = "Medium"
      recommendation =
        "Consider a balanced approach with hybrid funds or a mix of equity and debt funds."
      investmentType = "Hybrid/Balanced Funds"
    } else {
      riskLevel = "High"
      recommendation =
        "Long time horizon allows for equity investments. Consider diversified equity funds or index funds for better returns."
      investmentType = "Equity/Index Funds"
    }

    return {
      inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
      requiredSIP,
      conservativeSIP: calculateSIP(conservativeRate),
      aggressiveSIP: calculateSIP(aggressiveRate),
      projectedCorpus: Math.round(projectedCorpus),
      riskLevel,
      recommendation,
      investmentType,
    }
  }, [step, targetAmount, timeHorizon, currentSavings, inflationRate])

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      case "Medium":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "High":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
      default:
        return ""
    }
  }

  return (
    <section
      id="goal-planner"
      className="py-16 sm:py-24"
      aria-labelledby="goal-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="goal-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Goal Planner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your financial goals and discover how much to invest
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div
                  className={`w-12 sm:w-24 h-1 mx-2 rounded-full transition-colors ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Goal */}
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-8">
              What are you saving for?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                return (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                      selectedGoal === goal.id
                        ? "border-primary"
                        : "border-transparent hover:border-primary/20"
                    }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${goal.color} text-white mb-4`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {goal.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {goal.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === 2 && selectedGoalData && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${selectedGoalData.color} text-white`}
                  >
                    {(() => {
                      const Icon = selectedGoalData.icon
                      return <Icon className="h-5 w-5" />
                    })()}
                  </div>
                  <CardTitle>{selectedGoalData.name} Goal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Target Amount */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Label htmlFor="target-amount">Target Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="target-amount"
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                        className="w-full sm:w-40 pl-7 text-right"
                        min={10000}
                        max={1000000000}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[targetAmount]}
                    onValueChange={([v]) => setTargetAmount(v)}
                    min={10000}
                    max={100000000}
                    step={10000}
                    aria-label="Target Amount"
                  />
                </div>

                {/* Time Horizon */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Label htmlFor="time-horizon">Time Horizon</Label>
                    <div className="relative">
                      <Input
                        id="time-horizon"
                        type="number"
                        value={timeHorizon}
                        onChange={(e) => setTimeHorizon(Number(e.target.value))}
                        className="w-full sm:w-28 text-right pr-14"
                        min={1}
                        max={40}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Years
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[timeHorizon]}
                    onValueChange={([v]) => setTimeHorizon(v)}
                    min={1}
                    max={40}
                    step={1}
                    aria-label="Time Horizon"
                  />
                </div>

                {/* Current Monthly Savings */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Label htmlFor="current-savings">Current Monthly Savings</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="current-savings"
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                        className="w-full sm:w-32 pl-7 text-right"
                        min={0}
                        max={1000000}
                      />
                    </div>
                  </div>
                  <Slider
                    value={[currentSavings]}
                    onValueChange={([v]) => setCurrentSavings(v)}
                    min={0}
                    max={1000000}
                    step={1000}
                    aria-label="Current Monthly Savings"
                  />
                </div>

                {/* Expected Inflation */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <Label htmlFor="inflation-rate">Expected Inflation</Label>
                    <div className="relative">
                      <Input
                        id="inflation-rate"
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full sm:w-24 text-right pr-7"
                        min={0}
                        max={20}
                        step={0.5}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[inflationRate]}
                    onValueChange={([v]) => setInflationRate(v)}
                    min={0}
                    max={20}
                    step={0.5}
                    aria-label="Expected Inflation"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="flex-1">
                    Calculate Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && selectedGoalData && (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Summary Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${selectedGoalData.color} text-white`}
                      >
                        {(() => {
                      const Icon = selectedGoalData.icon
                      return <Icon className="h-5 w-5" />
                    })()}
                      </div>
                      <CardTitle>{selectedGoalData.name} Plan</CardTitle>
                    </div>
                    <Badge
                      variant="outline"
                      className={getRiskBadgeColor(results.riskLevel)}
                    >
                      {results.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-secondary/50 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Target (Today)
                      </p>
                      <p className="text-lg sm:text-xl font-bold break-all">
                        {formatIndianCurrency(targetAmount)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-accent/10 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Inflation Adjusted
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-accent break-all">
                        {formatIndianCurrency(results.inflationAdjustedTarget)}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-success/10 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Projected Corpus
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-success break-all">
                        {formatIndianCurrency(results.projectedCorpus)}
                      </p>
                    </div>
                  </div>

                  {/* Required SIP */}
                  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-6">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm opacity-90 mb-2">
                        Required Monthly SIP
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold break-all">
                        {formatIndianCurrency(results.requiredSIP)}
                      </p>
                      <p className="text-sm opacity-75 mt-2">
                        at 12% expected return
                      </p>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          Recommended: {results.investmentType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {results.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SIP at different rates */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        At 8% Return
                      </p>
                      <p className="font-semibold text-sm sm:text-base break-all">
                        {formatIndianCurrency(results.conservativeSIP)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">
                        At 12% Return
                      </p>
                      <p className="font-semibold text-primary text-sm sm:text-base break-all">
                        {formatIndianCurrency(results.requiredSIP)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">
                        At 15% Return
                      </p>
                      <p className="font-semibold text-sm sm:text-base break-all">
                        {formatIndianCurrency(results.aggressiveSIP)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() =>
                  generateGoalPlannerPDF({
                    goalName: selectedGoalData.name,
                    targetAmount,
                    timeHorizon,
                    currentSavings,
                    inflationRate,
                    inflationAdjustedTarget: results.inflationAdjustedTarget,
                    requiredSIP: results.requiredSIP,
                    conservativeSIP: results.conservativeSIP,
                    aggressiveSIP: results.aggressiveSIP,
                    projectedCorpus: results.projectedCorpus,
                    shortfall: results.inflationAdjustedTarget - results.projectedCorpus,
                  })
                }
                className="w-full sm:w-auto gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
                Plan Another Goal
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <a href="#sip-calculator">
                  Open SIP Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
