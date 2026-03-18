"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatIndianCurrency } from "@/lib/format-indian"
import { generateCAGRPDF } from "@/lib/generate-pdf"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts"

export function CAGRCalculator() {
  // Mode 1: Calculate CAGR
  const [initialValue, setInitialValue] = useState(100000)
  const [finalValue, setFinalValue] = useState(200000)
  const [years1, setYears1] = useState(5)

  // Mode 2: Calculate Final Value
  const [initialValue2, setInitialValue2] = useState(100000)
  const [cagrRate, setCagrRate] = useState(15)
  const [years2, setYears2] = useState(5)

  const mode1Calculations = useMemo(() => {
    const cagr = (Math.pow(finalValue / initialValue, 1 / years1) - 1) * 100
    const absoluteReturn = ((finalValue - initialValue) / initialValue) * 100
    const totalGain = finalValue - initialValue

    return {
      cagr: cagr.toFixed(2),
      absoluteReturn: absoluteReturn.toFixed(2),
      totalGain,
    }
  }, [initialValue, finalValue, years1])

  const mode2Calculations = useMemo(() => {
    const calculatedFinalValue =
      initialValue2 * Math.pow(1 + cagrRate / 100, years2)
    const absoluteReturn =
      ((calculatedFinalValue - initialValue2) / initialValue2) * 100
    const totalGain = calculatedFinalValue - initialValue2

    return {
      finalValue: Math.round(calculatedFinalValue),
      absoluteReturn: absoluteReturn.toFixed(2),
      totalGain: Math.round(totalGain),
    }
  }, [initialValue2, cagrRate, years2])

  const chartData1 = [
    { name: "Initial", value: initialValue, color: "var(--chart-1)" },
    { name: "Final", value: finalValue, color: "var(--chart-2)" },
  ]

  const chartData2 = [
    { name: "Initial", value: initialValue2, color: "var(--chart-1)" },
    { name: "Final", value: mode2Calculations.finalValue, color: "var(--chart-2)" },
  ]

  return (
    <section
      id="cagr-calculator"
      className="py-16 sm:py-24"
      aria-labelledby="cagr-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="cagr-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            CAGR Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate Compound Annual Growth Rate or project future value
          </p>
        </div>

        <Tabs defaultValue="calculate-cagr" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="calculate-cagr" className="text-xs sm:text-sm">Calculate CAGR</TabsTrigger>
            <TabsTrigger value="calculate-value" className="text-xs sm:text-sm">Calculate Value</TabsTrigger>
          </TabsList>

          {/* Mode 1: Calculate CAGR */}
          <TabsContent value="calculate-cagr">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Initial Value */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-initial">Initial Value</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          id="cagr-initial"
                          type="number"
                          value={initialValue}
                          onChange={(e) => setInitialValue(Number(e.target.value))}
                          className="w-full sm:w-36 pl-7 text-right"
                          min={1000}
                          max={100000000}
                        />
                      </div>
                    </div>
                    <Slider
                      value={[initialValue]}
                      onValueChange={([v]) => setInitialValue(v)}
                      min={1000}
                      max={100000000}
                      step={1000}
                      aria-label="Initial Value"
                    />
                  </div>

                  {/* Final Value */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-final">Final Value</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          id="cagr-final"
                          type="number"
                          value={finalValue}
                          onChange={(e) => setFinalValue(Number(e.target.value))}
                          className="w-full sm:w-36 pl-7 text-right"
                          min={1000}
                          max={1000000000}
                        />
                      </div>
                    </div>
                    <Slider
                      value={[finalValue]}
                      onValueChange={([v]) => setFinalValue(v)}
                      min={1000}
                      max={1000000000}
                      step={1000}
                      aria-label="Final Value"
                    />
                  </div>

                  {/* Years */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-years1">Time Period</Label>
                      <div className="relative">
                        <Input
                          id="cagr-years1"
                          type="number"
                          value={years1}
                          onChange={(e) => setYears1(Number(e.target.value))}
                          className="w-full sm:w-24 text-right pr-12"
                          min={1}
                          max={50}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">Yrs</span>
                      </div>
                    </div>
                    <Slider
                      value={[years1]}
                      onValueChange={([v]) => setYears1(v)}
                      min={1}
                      max={50}
                      step={1}
                      aria-label="Time Period"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* CAGR Result */}
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm opacity-90 mb-2">CAGR</p>
                    <p className="text-4xl sm:text-5xl font-bold">
                      {mode1Calculations.cagr}%
                    </p>
                  </CardContent>
                </Card>

                {/* Other Results */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-accent/10 border-accent/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Absolute Return</p>
                      <p className="text-base sm:text-xl font-bold text-accent">
                        {mode1Calculations.absoluteReturn}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-success/10 border-success/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Gain</p>
                      <p className="text-base sm:text-xl font-bold text-success break-all">
                        {formatIndianCurrency(mode1Calculations.totalGain)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Value Comparison</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateCAGRPDF({
                          mode: "cagr",
                          initialValue,
                          finalValue,
                          years: years1,
                          cagr: parseFloat(mode1Calculations.cagr),
                          absoluteReturn: parseFloat(mode1Calculations.absoluteReturn),
                        })
                      }
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download PDF</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 -mx-2 sm:mx-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData1} layout="vertical" margin={{ left: 0, right: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis
                            type="number"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            width={50}
                          />
                          <Tooltip
                            formatter={(value: number) => formatIndianCurrency(value)}
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {chartData1.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mode 2: Calculate Final Value */}
          <TabsContent value="calculate-value">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Initial Value */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-initial2">Initial Value</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                        <Input
                          id="cagr-initial2"
                          type="number"
                          value={initialValue2}
                          onChange={(e) => setInitialValue2(Number(e.target.value))}
                          className="w-full sm:w-36 pl-7 text-right"
                          min={1000}
                          max={100000000}
                        />
                      </div>
                    </div>
                    <Slider
                      value={[initialValue2]}
                      onValueChange={([v]) => setInitialValue2(v)}
                      min={1000}
                      max={100000000}
                      step={1000}
                      aria-label="Initial Value"
                    />
                  </div>

                  {/* CAGR Rate */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-rate">CAGR Rate</Label>
                      <div className="relative">
                        <Input
                          id="cagr-rate"
                          type="number"
                          value={cagrRate}
                          onChange={(e) => setCagrRate(Number(e.target.value))}
                          className="w-full sm:w-24 text-right pr-7"
                          min={1}
                          max={100}
                          step={0.5}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                      </div>
                    </div>
                    <Slider
                      value={[cagrRate]}
                      onValueChange={([v]) => setCagrRate(v)}
                      min={1}
                      max={100}
                      step={0.5}
                      aria-label="CAGR Rate"
                    />
                  </div>

                  {/* Years */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <Label htmlFor="cagr-years2">Time Period</Label>
                      <div className="relative">
                        <Input
                          id="cagr-years2"
                          type="number"
                          value={years2}
                          onChange={(e) => setYears2(Number(e.target.value))}
                          className="w-full sm:w-24 text-right pr-12"
                          min={1}
                          max={50}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">Yrs</span>
                      </div>
                    </div>
                    <Slider
                      value={[years2]}
                      onValueChange={([v]) => setYears2(v)}
                      min={1}
                      max={50}
                      step={1}
                      aria-label="Time Period"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Final Value Result */}
                <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm opacity-90 mb-2">Final Value</p>
                    <p className="text-2xl sm:text-4xl font-bold break-all">
                      {formatIndianCurrency(mode2Calculations.finalValue)}
                    </p>
                  </CardContent>
                </Card>

                {/* Other Results */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-accent/10 border-accent/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Absolute Return</p>
                      <p className="text-base sm:text-xl font-bold text-accent">
                        {mode2Calculations.absoluteReturn}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Gain</p>
                      <p className="text-base sm:text-xl font-bold text-primary break-all">
                        {formatIndianCurrency(mode2Calculations.totalGain)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Value Comparison</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        generateCAGRPDF({
                          mode: "finalValue",
                          initialValue: initialValue2,
                          finalValue: mode2Calculations.finalValue,
                          years: years2,
                          cagr: cagrRate,
                          absoluteReturn: parseFloat(mode2Calculations.absoluteReturn),
                        })
                      }
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download PDF</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 -mx-2 sm:mx-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData2} layout="vertical" margin={{ left: 0, right: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis
                            type="number"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            width={50}
                          />
                          <Tooltip
                            formatter={(value: number) => formatIndianCurrency(value)}
                            contentStyle={{
                              backgroundColor: "var(--card)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {chartData2.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
