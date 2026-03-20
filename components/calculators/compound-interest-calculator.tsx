"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateCompoundInterestPDF } from "@/lib/generate-pdf"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

const compoundingOptions = [
  { value: "1", label: "Yearly", frequency: 1 },
  { value: "2", label: "Half-Yearly", frequency: 2 },
  { value: "4", label: "Quarterly", frequency: 4 },
  { value: "12", label: "Monthly", frequency: 12 },
  { value: "365", label: "Daily", frequency: 365 },
]

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(10)
  const [time, setTime] = useState(5)
  const [compounding, setCompounding] = useState("4")

  const calculations = useMemo(() => {
    const n = parseInt(compounding)

    // Compound Interest
    const ciAmount = principal * Math.pow(1 + rate / 100 / n, n * time)
    const compoundInterest = ciAmount - principal

    // Simple Interest
    const simpleInterest = (principal * rate * time) / 100
    const siAmount = principal + simpleInterest

    // Year-by-year comparison
    const yearlyData: Array<{
      year: number
      simpleInterest: number
      compoundInterest: number
      siTotal: number
      ciTotal: number
    }> = []

    for (let year = 1; year <= time; year++) {
      const siForYear = (principal * rate * year) / 100
      const siTotal = principal + siForYear
      const ciTotal = principal * Math.pow(1 + rate / 100 / n, n * year)
      const ciForYear = ciTotal - principal

      yearlyData.push({
        year,
        simpleInterest: Math.round(siForYear),
        compoundInterest: Math.round(ciForYear),
        siTotal: Math.round(siTotal),
        ciTotal: Math.round(ciTotal),
      })
    }

    return {
      principal,
      simpleInterest: Math.round(simpleInterest),
      compoundInterest: Math.round(compoundInterest),
      siAmount: Math.round(siAmount),
      ciAmount: Math.round(ciAmount),
      difference: Math.round(compoundInterest - simpleInterest),
      yearlyData,
    }
  }, [principal, rate, time, compounding])

  return (
    <section
      id="compound-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="compound-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="compound-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Compound Interest Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare Simple Interest vs Compound Interest over time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Principal */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ci-principal">Principal Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="ci-principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full sm:w-36 pl-7 text-right"
                      min={1000}
                      max={100000000}
                    />
                  </div>
                </div>
                <Slider
                  value={[principal]}
                  onValueChange={([v]) => setPrincipal(v)}
                  min={1000}
                  max={100000000}
                  step={1000}
                  aria-label="Principal Amount"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1,000</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* Rate */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ci-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="ci-rate"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full sm:w-24 text-right pr-7"
                      min={1}
                      max={50}
                      step={0.5}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={([v]) => setRate(v)}
                  min={1}
                  max={50}
                  step={0.5}
                  aria-label="Interest Rate"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Time */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ci-time">Time Period</Label>
                  <div className="relative">
                    <Input
                      id="ci-time"
                      type="number"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                      className="w-full sm:w-24 text-right pr-12"
                      min={1}
                      max={50}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">Yrs</span>
                  </div>
                </div>
                <Slider
                  value={[time]}
                  onValueChange={([v]) => setTime(v)}
                  min={1}
                  max={50}
                  step={1}
                  aria-label="Time Period"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>50 Years</span>
                </div>
              </div>

              {/* Compounding Frequency */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ci-compounding">Compounding Frequency</Label>
                  <Select value={compounding} onValueChange={setCompounding}>
                    <SelectTrigger className="w-full sm:w-36" id="ci-compounding">
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
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Simple Interest</p>
                  <p className="text-base sm:text-lg font-bold text-primary break-all">
                    {formatIndianCurrency(calculations.simpleInterest)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Total</p>
                  <p className="text-sm font-medium break-all">
                    {formatIndianCurrency(calculations.siAmount)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Compound Interest</p>
                  <p className="text-base sm:text-lg font-bold text-accent break-all">
                    {formatIndianCurrency(calculations.compoundInterest)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Total</p>
                  <p className="text-sm font-medium break-all">
                    {formatIndianCurrency(calculations.ciAmount)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Difference */}
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  Extra Earnings with Compound Interest
                </p>
                <p className="text-xl sm:text-2xl font-bold text-success break-all">
                  +{formatIndianCurrency(calculations.difference)}
                </p>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SI vs CI Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64 -mx-2 sm:mx-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={calculations.yearlyData} margin={{ left: -10, right: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `Y${v}`}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                        width={40}
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatIndianCurrency(value),
                          name === "siTotal" ? "SI Total" : "CI Total",
                        ]}
                        labelFormatter={(label) => `Year ${label}`}
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
                        dataKey="siTotal"
                        name="SI Total"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="ciTotal"
                        name="CI Total"
                        stroke="var(--chart-2)"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Year-wise Comparison</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateCompoundInterestPDF({
                      principal,
                      rate,
                      time,
                      compoundingFrequency: compoundingOptions.find((c) => c.value === compounding)?.label || "Quarterly",
                      compoundInterest: calculations.compoundInterest,
                      simpleInterest: calculations.simpleInterest,
                      ciMaturity: calculations.ciAmount,
                      siMaturity: calculations.siAmount,
                      yearlyData: calculations.yearlyData.map((row) => ({
                        year: row.year,
                        ci: row.ciTotal,
                        si: row.siTotal,
                      })),
                    })
                  }
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <ScrollArea className="h-48">
                  <div className="min-w-[380px] px-4 sm:px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-14">Year</TableHead>
                          <TableHead className="text-right">SI Total</TableHead>
                          <TableHead className="text-right">CI Total</TableHead>
                          <TableHead className="text-right">Diff</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculations.yearlyData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell className="font-medium">{row.year}</TableCell>
                            <TableCell className="text-right text-primary text-sm">
                              {formatIndianCurrency(row.siTotal)}
                            </TableCell>
                            <TableCell className="text-right text-accent text-sm">
                              {formatIndianCurrency(row.ciTotal)}
                            </TableCell>
                            <TableCell className="text-right font-medium text-success text-sm">
                              +{formatIndianCurrency(row.ciTotal - row.siTotal)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
