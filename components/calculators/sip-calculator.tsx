"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateSIPPDF } from "@/lib/generate-pdf"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(10000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [timePeriod, setTimePeriod] = useState(10)
  const [stepUpEnabled, setStepUpEnabled] = useState(false)
  const [stepUpPercent, setStepUpPercent] = useState(10)

  const calculations = useMemo(() => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = timePeriod * 12
    const yearlyData: Array<{
      year: number
      invested: number
      returns: number
      total: number
    }> = []

    let totalInvested = 0
    let currentValue = 0
    let currentMonthlyAmount = monthlyAmount

    for (let month = 1; month <= months; month++) {
      totalInvested += currentMonthlyAmount
      currentValue = (currentValue + currentMonthlyAmount) * (1 + monthlyRate)

      // At the end of each year
      if (month % 12 === 0) {
        const year = month / 12
        yearlyData.push({
          year,
          invested: Math.round(totalInvested),
          returns: Math.round(currentValue - totalInvested),
          total: Math.round(currentValue),
        })

        // Step-up at the end of each year
        if (stepUpEnabled && year < timePeriod) {
          currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpPercent / 100)
        }
      }
    }

    const finalInvested = totalInvested
    const finalValue = currentValue
    const totalReturns = finalValue - finalInvested

    return {
      totalInvested: Math.round(finalInvested),
      totalReturns: Math.round(totalReturns),
      maturityValue: Math.round(finalValue),
      yearlyData,
    }
  }, [monthlyAmount, expectedReturn, timePeriod, stepUpEnabled, stepUpPercent])

  const chartData = [
    { name: "Invested", value: calculations.totalInvested, color: "var(--chart-1)" },
    { name: "Returns", value: calculations.totalReturns, color: "var(--chart-2)" },
  ]

  return (
    <section
      id="sip-calculator"
      className="py-16 sm:py-24"
      aria-labelledby="sip-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="sip-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            SIP Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your Systematic Investment Plan returns with step-up option
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Monthly Amount */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="sip-monthly">Monthly SIP Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="sip-monthly"
                      type="number"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      className="w-full sm:w-32 pl-7 text-right"
                      min={500}
                      max={100000}
                    />
                  </div>
                </div>
                <Slider
                  value={[monthlyAmount]}
                  onValueChange={([v]) => setMonthlyAmount(v)}
                  min={500}
                  max={100000}
                  step={500}
                  aria-label="Monthly SIP Amount"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="sip-return">Expected Return Rate</Label>
                  <div className="relative">
                    <Input
                      id="sip-return"
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
                  <Label htmlFor="sip-years">Time Period</Label>
                  <div className="relative">
                    <Input
                      id="sip-years"
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

              {/* Step-Up SIP */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="step-up-toggle">Step-up SIP (Annual Increase)</Label>
                  <Switch
                    id="step-up-toggle"
                    checked={stepUpEnabled}
                    onCheckedChange={setStepUpEnabled}
                  />
                </div>
                {stepUpEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="step-up-percent">Annual Increase</Label>
                      <div className="relative">
                        <Input
                          id="step-up-percent"
                          type="number"
                          value={stepUpPercent}
                          onChange={(e) => setStepUpPercent(Number(e.target.value))}
                          className="w-full sm:w-24 text-right pr-7"
                          min={1}
                          max={50}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[stepUpPercent]}
                      onValueChange={([v]) => setStepUpPercent(v)}
                      min={1}
                      max={50}
                      step={1}
                      aria-label="Annual Step-up Percentage"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {formatIndianCurrency(calculations.totalInvested)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Est. Returns</p>
                  <p className="text-xl sm:text-2xl font-bold text-accent">
                    {formatIndianCurrency(calculations.totalReturns)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Maturity Value</p>
                  <p className="text-xl sm:text-2xl font-bold text-success">
                    {formatIndianCurrency(calculations.maturityValue)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
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
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Year-wise Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Year-wise Breakdown</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateSIPPDF({
                      monthlyAmount,
                      expectedReturn,
                      timePeriod,
                      stepUpEnabled,
                      stepUpPercent,
                      totalInvested: calculations.totalInvested,
                      totalReturns: calculations.totalReturns,
                      maturityValue: calculations.maturityValue,
                      yearlyData: calculations.yearlyData,
                    })
                  }
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <ScrollArea className="h-64">
                  <div className="min-w-[400px] px-4 sm:px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Year</TableHead>
                          <TableHead className="text-right">Invested</TableHead>
                          <TableHead className="text-right">Returns</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                    <TableBody>
                      {calculations.yearlyData.map((row) => (
                        <TableRow key={row.year}>
                          <TableCell className="font-medium">{row.year}</TableCell>
                          <TableCell className="text-right">
                            {formatIndianCurrency(row.invested)}
                          </TableCell>
                          <TableCell className="text-right text-accent">
                            {formatIndianCurrency(row.returns)}
                          </TableCell>
                          <TableCell className="text-right font-medium text-success">
                            {formatIndianCurrency(row.total)}
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
