"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateEMIPDF } from "@/lib/generate-pdf"
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

export function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)

    const totalPayment = emi * tenure
    const totalInterest = totalPayment - loanAmount

    // Generate amortization schedule
    const amortizationSchedule: Array<{
      month: number
      emi: number
      principal: number
      interest: number
      balance: number
    }> = []

    let balance = loanAmount
    for (let month = 1; month <= tenure; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = emi - interestPayment
      balance = balance - principalPayment

      amortizationSchedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.max(0, Math.round(balance)),
      })
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      loanAmount,
      amortizationSchedule,
    }
  }, [loanAmount, interestRate, tenure])

  const chartData = [
    { name: "Principal", value: calculations.loanAmount, color: "var(--chart-1)" },
    { name: "Interest", value: calculations.totalInterest, color: "var(--chart-2)" },
  ]

  return (
    <section
      id="emi-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="emi-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="emi-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            EMI Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your monthly loan EMI payments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="emi-amount">Loan Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="emi-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full max-w-36 pl-7 text-right"
                      min={100000}
                      max={100000000}
                    />
                  </div>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([v]) => setLoanAmount(v)}
                  min={100000}
                  max={100000000}
                  step={100000}
                  aria-label="Loan Amount"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1 Lakh</span>
                  <span>₹10 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="emi-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="emi-rate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full max-w-24 text-right pr-7"
                      min={1}
                      max={30}
                      step={0.1}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([v]) => setInterestRate(v)}
                  min={1}
                  max={30}
                  step={0.1}
                  aria-label="Interest Rate"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="emi-tenure">Tenure (Months)</Label>
                  <div className="relative">
                    <Input
                      id="emi-tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full max-w-28 text-right pr-16"
                      min={12}
                      max={360}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">Months</span>
                  </div>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([v]) => setTenure(v)}
                  min={12}
                  max={360}
                  step={12}
                  aria-label="Tenure in Months"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* EMI Display */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-6 text-center">
                <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                <p className="text-2xl sm:text-4xl lg:text-5xl font-bold">
                  {formatIndianCurrency(calculations.emi)}
                </p>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-lg sm:text-xl font-bold text-accent">
                    {formatIndianCurrency(calculations.totalInterest)}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                  <p className="text-lg sm:text-xl font-bold text-success">
                    {formatIndianCurrency(calculations.totalPayment)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 sm:h-80 lg:h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
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
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Amortization Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Amortization Schedule</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    generateEMIPDF({
                      principal: loanAmount,
                      interestRate,
                      tenure,
                      emi: calculations.emi,
                      totalInterest: calculations.totalInterest,
                      totalPayment: calculations.totalPayment,
                      schedule: calculations.amortizationSchedule,
                    })
                  }
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ScrollArea className="h-64 sm:h-80">
                  <div className="min-w-[320px] sm:min-w-[450px] px-2 sm:px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 sm:w-14">Month</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">EMI</TableHead>
                          <TableHead className="text-right">Principal</TableHead>
                          <TableHead className="text-right">Interest</TableHead>
                          <TableHead className="text-right hidden lg:table-cell">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculations.amortizationSchedule.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell className="font-medium">{row.month}</TableCell>
                            <TableCell className="text-right text-xs sm:text-sm hidden sm:table-cell">
                              {formatIndianCurrency(row.emi)}
                            </TableCell>
                            <TableCell className="text-right text-primary text-xs sm:text-sm">
                              {formatIndianCurrency(row.principal)}
                            </TableCell>
                            <TableCell className="text-right text-accent text-xs sm:text-sm">
                              {formatIndianCurrency(row.interest)}
                            </TableCell>
                            <TableCell className="text-right font-medium text-xs sm:text-sm hidden lg:table-cell">
                              {formatIndianCurrency(row.balance)}
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
