"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateLumpsumPDF } from "@/lib/generate-pdf"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"

export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)

  const calculations = useMemo(() => {
    const yearlyData: Array<{
      year: number
      invested: number
      value: number
    }> = []

    for (let year = 1; year <= timePeriod; year++) {
      const value = principal * Math.pow(1 + expectedReturn / 100, year)
      yearlyData.push({
        year,
        invested: principal,
        value: Math.round(value),
      })
    }

    const finalValue = principal * Math.pow(1 + expectedReturn / 100, timePeriod)
    const totalGains = finalValue - principal

    return {
      totalInvested: principal,
      totalGains: Math.round(totalGains),
      finalValue: Math.round(finalValue),
      yearlyData,
    }
  }, [principal, expectedReturn, timePeriod])

  return (
    <section
      id="lumpsum-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="lumpsum-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="lumpsum-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Lumpsum Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate one-time investment growth over time
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
                  <Label htmlFor="lumpsum-principal">Investment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="lumpsum-principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full max-w-36 pl-7 text-right"
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
                  aria-label="Investment Amount"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1,000</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="lumpsum-return">Expected Return Rate</Label>
                  <div className="relative">
                    <Input
                      id="lumpsum-return"
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full sm:w-24 text-right pr-7"
                      min={1}
                      max={30}
                      step={0.5}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[expectedReturn]}
                  onValueChange={([v]) => setExpectedReturn(v)}
                  min={1}
                  max={30}
                  step={0.5}
                  aria-label="Expected Return Rate"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Time Period */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="lumpsum-years">Time Period</Label>
                  <div className="relative">
                    <Input
                      id="lumpsum-years"
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full sm:w-24 text-right pr-12"
                      min={1}
                      max={40}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">Yrs</span>
                  </div>
                </div>
                <Slider
                  value={[timePeriod]}
                  onValueChange={([v]) => setTimePeriod(v)}
                  min={1}
                  max={40}
                  step={1}
                  aria-label="Time Period in Years"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>40 Years</span>
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
                  <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {formatIndianCurrency(calculations.totalInvested)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Gains</p>
                  <p className="text-xl sm:text-2xl font-bold text-accent">
                    {formatIndianCurrency(calculations.totalGains)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Final Value</p>
                  <p className="text-xl sm:text-2xl font-bold text-success">
                    {formatIndianCurrency(calculations.finalValue)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Year-by-Year Growth</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateLumpsumPDF({
                      principal,
                      expectedReturn,
                      timePeriod,
                      maturityValue: calculations.finalValue,
                      totalReturns: calculations.totalGains,
                      yearlyData: calculations.yearlyData,
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
                    <BarChart data={calculations.yearlyData} margin={{ left: -10, right: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `Y${v}`}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                        width={45}
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatIndianCurrency(value),
                          name === "invested" ? "Invested" : "Value",
                        ]}
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="invested"
                        name="Invested"
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="value"
                        name="Value"
                        fill="var(--chart-2)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
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
