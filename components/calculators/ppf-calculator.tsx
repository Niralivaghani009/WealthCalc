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
import { generatePPFPDF } from "@/lib/generate-pdf"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(100000)
  const [interestRate, setInterestRate] = useState(7.1)
  const [tenure, setTenure] = useState("15")

  const calculations = useMemo(() => {
    const years = parseInt(tenure)
    const yearlyData: Array<{
      year: number
      invested: number
      interest: number
      balance: number
    }> = []

    let balance = 0
    let totalInvested = 0
    let totalInterest = 0

    for (let year = 1; year <= years; year++) {
      totalInvested += yearlyInvestment
      const yearInterest = (balance + yearlyInvestment) * (interestRate / 100)
      totalInterest += yearInterest
      balance = balance + yearlyInvestment + yearInterest

      yearlyData.push({
        year,
        invested: totalInvested,
        interest: Math.round(totalInterest),
        balance: Math.round(balance),
      })
    }

    return {
      totalInvested,
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(balance),
      yearlyData,
    }
  }, [yearlyInvestment, interestRate, tenure])

  return (
    <section
      id="ppf-calculator"
      className="py-12 sm:py-16 lg:py-24 bg-secondary/30"
      aria-labelledby="ppf-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            id="ppf-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            PPF Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your Public Provident Fund maturity amount
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Yearly Investment */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ppf-yearly">Yearly Investment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                    <Input
                      id="ppf-yearly"
                      type="number"
                      value={yearlyInvestment}
                      onChange={(e) => setYearlyInvestment(Math.min(150000, Number(e.target.value)))}
                      className="w-full sm:w-36 pl-7 text-right"
                      min={500}
                      max={150000}
                    />
                  </div>
                </div>
                <Slider
                  value={[yearlyInvestment]}
                  onValueChange={([v]) => setYearlyInvestment(v)}
                  min={500}
                  max={150000}
                  step={500}
                  aria-label="Yearly Investment"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹500</span>
                  <span>₹1,50,000 (Max)</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ppf-rate">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      id="ppf-rate"
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
                <p className="text-xs text-muted-foreground">
                  Current PPF rate: 7.1% (as of 2024)
                </p>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="ppf-tenure">Tenure</Label>
                  <Select value={tenure} onValueChange={setTenure}>
                    <SelectTrigger className="w-full sm:w-32" id="ppf-tenure">
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="25">25 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  PPF has a minimum lock-in of 15 years, extendable in blocks of 5 years
                </p>
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
                  <p className="text-lg sm:text-2xl font-bold text-foreground break-all">
                    {formatIndianCurrency(calculations.totalInvested)}
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
              <CardHeader>
                <CardTitle className="text-lg">Year-wise Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64 -mx-2 sm:mx-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={calculations.yearlyData} margin={{ left: -10, right: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 9 }}
                        tickFormatter={(v) => `Y${v}`}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        tick={{ fontSize: 9 }}
                        tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                        width={40}
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatIndianCurrency(value),
                          name === "invested" ? "Invested" : "Interest",
                        ]}
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Bar
                        dataKey="invested"
                        name="Invested"
                        stackId="a"
                        fill="var(--chart-1)"
                      />
                      <Bar
                        dataKey="interest"
                        name="Interest"
                        stackId="a"
                        fill="var(--chart-2)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
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
                    generatePPFPDF({
                      yearlyDeposit: yearlyInvestment,
                      interestRate,
                      tenure: parseInt(tenure),
                      totalDeposited: calculations.totalInvested,
                      totalInterest: calculations.totalInterest,
                      maturityValue: calculations.maturityValue,
                      yearlyData: calculations.yearlyData.map((row) => ({
                        year: row.year,
                        deposit: yearlyInvestment,
                        interest: row.interest,
                        balance: row.balance,
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
                          <TableHead className="text-right">Invested</TableHead>
                          <TableHead className="text-right">Interest</TableHead>
                          <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculations.yearlyData.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell className="font-medium">{row.year}</TableCell>
                            <TableCell className="text-right text-sm">
                              {formatIndianCurrency(row.invested)}
                            </TableCell>
                            <TableCell className="text-right text-accent text-sm">
                              {formatIndianCurrency(row.interest)}
                            </TableCell>
                            <TableCell className="text-right font-medium text-success text-sm">
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
