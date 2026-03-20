"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateFDPDF } from "@/lib/generate-pdf"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const compoundingOptions = [
  { value: "monthly", label: "Monthly", frequency: 12 },
  { value: "quarterly", label: "Quarterly", frequency: 4 },
  { value: "half-yearly", label: "Half-Yearly", frequency: 2 },
  { value: "yearly", label: "Yearly", frequency: 1 },
]

export function FDCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [interestRate, setInterestRate] = useState(7)
  const [tenure, setTenure] = useState(12)
  const [compounding, setCompounding] = useState("quarterly")
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false)

  const calculations = useMemo(() => {
    const effectiveRate = isSeniorCitizen ? interestRate + 0.5 : interestRate
    const compoundingFrequency =
      compoundingOptions.find((c) => c.value === compounding)?.frequency || 4

    const years = tenure / 12
    const maturityValue =
      principal *
      Math.pow(
        1 + effectiveRate / 100 / compoundingFrequency,
        compoundingFrequency * years
      )

    const interestEarned = maturityValue - principal

    return {
      principal,
      interestEarned: Math.round(interestEarned),
      maturityValue: Math.round(maturityValue),
      effectiveRate,
    }
  }, [principal, interestRate, tenure, compounding, isSeniorCitizen])

  const chartData = [
    { name: "Principal", value: calculations.principal, color: "var(--chart-1)" },
    { name: "Interest", value: calculations.interestEarned, color: "var(--chart-2)" },
  ]

  return (
    <section
      id="fd-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="fd-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="fd-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            FD Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate Fixed Deposit interest and maturity amount
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Principal Amount */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="fd-principal">Principal Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="fd-principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full sm:w-36 pl-7 text-right"
                      min={1000}
                      max={10000000}
                    />
                  </div>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={([v]) => setPrincipal(v)}
                  min={1000}
                  max={10000000}
                  step={1000}
                  aria-label="Principal Amount"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1,000</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="fd-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="fd-rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full sm:w-24 text-right pr-7"
                      min={1}
                      max={15}
                      step={0.1}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([v]) => setInterestRate(v)}
                  min={1}
                  max={15}
                  step={0.1}
                  aria-label="Interest Rate"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="fd-tenure">Tenure (Months)</Label>
                  <div className="relative">
                    <Input
                      id="fd-tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full sm:w-28 text-right pr-16"
                      min={1}
                      max={120}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Months</span>
                  </div>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([v]) => setTenure(v)}
                  min={1}
                  max={120}
                  step={1}
                  aria-label="Tenure in Months"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Month</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="fd-compounding">Compounding</Label>
                  <Select value={compounding} onValueChange={setCompounding}>
                    <SelectTrigger className="w-full sm:w-36" id="fd-compounding">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {compoundingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Senior Citizen */}
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <Label htmlFor="senior-citizen">Senior Citizen</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Additional 0.5% interest rate
                  </p>
                </div>
                <Switch
                  id="senior-citizen"
                  checked={isSeniorCitizen}
                  onCheckedChange={setIsSeniorCitizen}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Principal</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground break-all">
                    {formatIndianCurrency(calculations.principal)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
                  <p className="text-lg sm:text-2xl font-bold text-accent break-all">
                    {formatIndianCurrency(calculations.interestEarned)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Maturity Value</p>
                  <p className="text-lg sm:text-2xl font-bold text-success break-all">
                    {formatIndianCurrency(calculations.maturityValue)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Effective Rate Info */}
            {isSeniorCitizen && (
              <Card className="bg-amber-500/10 border-amber-500/20">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground">
                    Effective Interest Rate:{" "}
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {calculations.effectiveRate}%
                    </span>{" "}
                    (includes 0.5% senior citizen bonus)
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Investment Breakdown</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateFDPDF({
                      principal,
                      interestRate: calculations.effectiveRate,
                      tenure,
                      compoundingFrequency: compoundingOptions.find((c) => c.value === compounding)?.label || "Quarterly",
                      isSeniorCitizen,
                      maturityValue: calculations.maturityValue,
                      totalInterest: calculations.interestEarned,
                    })
                  }
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-56 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(1)}%`
                        }
                        labelLine={false}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatIndianCurrency(value)}
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
