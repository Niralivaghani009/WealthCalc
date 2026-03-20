"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateRDPDF } from "@/lib/generate-pdf"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"

export function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [interestRate, setInterestRate] = useState(7)
  const [tenure, setTenure] = useState(24)

  const calculations = useMemo(() => {
    const n = 4 // Quarterly compounding
    const r = interestRate / 100
    const monthlyData: Array<{
      month: number
      deposited: number
      value: number
    }> = []

    let totalDeposited = 0

    for (let month = 1; month <= tenure; month++) {
      totalDeposited = monthlyDeposit * month
      
      // Calculate maturity value using RD formula
      let maturityValue = 0
      for (let i = 1; i <= month; i++) {
        const remainingMonths = month - i + 1
        const quarters = remainingMonths / 3
        maturityValue +=
          monthlyDeposit * Math.pow(1 + r / n, n * (quarters / 4))
      }

      monthlyData.push({
        month,
        deposited: totalDeposited,
        value: Math.round(maturityValue),
      })
    }

    // Final calculation
    let finalMaturity = 0
    for (let i = 1; i <= tenure; i++) {
      const remainingMonths = tenure - i + 1
      const quarters = remainingMonths / 3
      finalMaturity +=
        monthlyDeposit * Math.pow(1 + r / n, n * (quarters / 4))
    }

    const totalInterest = finalMaturity - monthlyDeposit * tenure

    return {
      totalDeposited: monthlyDeposit * tenure,
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(finalMaturity),
      monthlyData,
    }
  }, [monthlyDeposit, interestRate, tenure])

  // Sample data points for chart (every 3 months)
  const chartData = calculations.monthlyData.filter(
    (_, index) => index % 3 === 2 || index === calculations.monthlyData.length - 1
  )

  return (
    <section
      id="rd-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="rd-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="rd-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            RD Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate Recurring Deposit maturity amount
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Monthly Deposit */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="rd-monthly">Monthly Deposit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="rd-monthly"
                      type="number"
                      value={monthlyDeposit}
                      onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                      className="w-full sm:w-32 pl-7 text-right"
                      min={100}
                      max={100000}
                    />
                  </div>
                </div>
                <Slider
                  value={[monthlyDeposit]}
                  onValueChange={([v]) => setMonthlyDeposit(v)}
                  min={100}
                  max={100000}
                  step={100}
                  aria-label="Monthly Deposit"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹100</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="rd-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="rd-rate"
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
                  <Label htmlFor="rd-tenure">Tenure (Months)</Label>
                  <div className="relative">
                    <Input
                      id="rd-tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full sm:w-28 text-right pr-16"
                      min={6}
                      max={120}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Months</span>
                  </div>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([v]) => setTenure(v)}
                  min={6}
                  max={120}
                  step={1}
                  aria-label="Tenure in Months"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 Months</span>
                  <span>10 Years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Deposited</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground break-all">
                    {formatIndianCurrency(calculations.totalDeposited)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-lg sm:text-2xl font-bold text-accent break-all">
                    {formatIndianCurrency(calculations.totalInterest)}
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

            {/* Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Growth Over Time</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateRDPDF({
                      monthlyDeposit,
                      interestRate,
                      tenure,
                      totalDeposited: calculations.totalDeposited,
                      totalInterest: calculations.totalInterest,
                      maturityValue: calculations.maturityValue,
                      yearlyData: calculations.monthlyData
                        .filter((_, idx) => (idx + 1) % 12 === 0)
                        .map((row, idx) => ({
                          year: idx + 1,
                          deposited: row.deposited,
                          interest: row.value - row.deposited,
                          balance: row.value,
                        })),
                    })
                  }
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80 -mx-2 sm:mx-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ left: -10, right: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `M${v}`}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                        width={45}
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatIndianCurrency(value),
                          name === "deposited" ? "Deposited" : "Value",
                        ]}
                        labelFormatter={(label) => `Month ${label}`}
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Line
                        type="monotone"
                        dataKey="deposited"
                        name="Deposited"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Value"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
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
