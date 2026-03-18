import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { formatIndianCurrency } from "./format-indian"

interface PDFData {
  title: string
  subtitle?: string
  summary: { label: string; value: string }[]
  tableData?: {
    headers: string[]
    rows: (string | number)[][]
  }
  footer?: string
}

export function generateCalculatorPDF(data: PDFData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Colors
  const primaryColor: [number, number, number] = [16, 185, 129] // Emerald
  const textColor: [number, number, number] = [31, 41, 55]
  const mutedColor: [number, number, number] = [107, 114, 128]
  
  // Header background
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 45, "F")
  
  // Logo/Brand
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("WealthCalc", 14, 20)
  
  // Title
  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text(data.title, 14, 32)
  
  // Subtitle
  if (data.subtitle) {
    doc.setFontSize(10)
    doc.text(data.subtitle, 14, 40)
  }
  
  // Generated date
  doc.setFontSize(8)
  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}`, pageWidth - 14, 40, { align: "right" })
  
  let yPosition = 60
  
  // Summary Section
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Summary", 14, yPosition)
  
  yPosition += 10
  
  // Summary cards
  const cardWidth = (pageWidth - 42) / 2
  data.summary.forEach((item, index) => {
    const xPos = index % 2 === 0 ? 14 : 14 + cardWidth + 14
    const yPos = yPosition + Math.floor(index / 2) * 25
    
    // Card background
    doc.setFillColor(249, 250, 251)
    doc.roundedRect(xPos, yPos, cardWidth, 20, 3, 3, "F")
    
    // Label
    doc.setTextColor(...mutedColor)
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text(item.label, xPos + 5, yPos + 8)
    
    // Value
    doc.setTextColor(...textColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(item.value, xPos + 5, yPos + 16)
  })
  
  yPosition += Math.ceil(data.summary.length / 2) * 25 + 15
  
  // Table Section
  if (data.tableData && data.tableData.rows.length > 0) {
    doc.setTextColor(...textColor)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Detailed Breakdown", 14, yPosition)
    
    yPosition += 5
    
    autoTable(doc, {
      startY: yPosition,
      head: [data.tableData.headers],
      body: data.tableData.rows.map(row => row.map(cell => String(cell))),
      theme: "striped",
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
      },
      bodyStyles: {
        textColor: textColor,
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
    })
  }
  
  // Footer
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFillColor(249, 250, 251)
  doc.rect(0, pageHeight - 25, pageWidth, 25, "F")
  
  doc.setTextColor(...mutedColor)
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  
  if (data.footer) {
    doc.text(data.footer, 14, pageHeight - 15)
  }
  
  doc.text("Disclaimer: These calculations are for illustrative purposes only.", 14, pageHeight - 8)
  doc.text("www.wealthcalc.in", pageWidth - 14, pageHeight - 8, { align: "right" })
  
  // Save
  const fileName = `${data.title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.pdf`
  doc.save(fileName)
}

// Helper to generate SIP Calculator PDF
export function generateSIPPDF(data: {
  monthlyAmount: number
  expectedReturn: number
  timePeriod: number
  stepUpEnabled: boolean
  stepUpPercent: number
  totalInvested: number
  totalReturns: number
  maturityValue: number
  yearlyData: { year: number; invested: number; returns: number; total: number }[]
}) {
  generateCalculatorPDF({
    title: "SIP Calculator Report",
    subtitle: data.stepUpEnabled ? `Step-up SIP with ${data.stepUpPercent}% annual increase` : "Regular SIP Investment",
    summary: [
      { label: "Monthly Investment", value: formatIndianCurrency(data.monthlyAmount) },
      { label: "Expected Return", value: `${data.expectedReturn}% p.a.` },
      { label: "Time Period", value: `${data.timePeriod} Years` },
      { label: "Total Invested", value: formatIndianCurrency(data.totalInvested) },
      { label: "Total Returns", value: formatIndianCurrency(data.totalReturns) },
      { label: "Maturity Value", value: formatIndianCurrency(data.maturityValue) },
    ],
    tableData: {
      headers: ["Year", "Amount Invested", "Returns", "Total Value"],
      rows: data.yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.invested),
        formatIndianCurrency(row.returns),
        formatIndianCurrency(row.total),
      ]),
    },
    footer: data.stepUpEnabled 
      ? `Step-up SIP: Starting ₹${data.monthlyAmount.toLocaleString("en-IN")} with ${data.stepUpPercent}% annual increase`
      : `Regular SIP of ₹${data.monthlyAmount.toLocaleString("en-IN")} per month`,
  })
}

// Helper to generate Lumpsum Calculator PDF
export function generateLumpsumPDF(data: {
  principal: number
  expectedReturn: number
  timePeriod: number
  maturityValue: number
  totalReturns: number
  yearlyData: { year: number; value: number }[]
}) {
  generateCalculatorPDF({
    title: "Lumpsum Calculator Report",
    subtitle: "One-time Investment Analysis",
    summary: [
      { label: "Principal Amount", value: formatIndianCurrency(data.principal) },
      { label: "Expected Return", value: `${data.expectedReturn}% p.a.` },
      { label: "Time Period", value: `${data.timePeriod} Years` },
      { label: "Maturity Value", value: formatIndianCurrency(data.maturityValue) },
      { label: "Total Returns", value: formatIndianCurrency(data.totalReturns) },
      { label: "Wealth Gain", value: `${((data.maturityValue / data.principal - 1) * 100).toFixed(1)}%` },
    ],
    tableData: {
      headers: ["Year", "Portfolio Value", "Returns Earned"],
      rows: data.yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.value),
        formatIndianCurrency(row.value - data.principal),
      ]),
    },
  })
}

// Helper to generate PPF Calculator PDF
export function generatePPFPDF(data: {
  yearlyDeposit: number
  interestRate: number
  tenure: number
  totalDeposited: number
  totalInterest: number
  maturityValue: number
  yearlyData: { year: number; deposit: number; interest: number; balance: number }[]
}) {
  generateCalculatorPDF({
    title: "PPF Calculator Report",
    subtitle: "Public Provident Fund Investment Analysis",
    summary: [
      { label: "Yearly Deposit", value: formatIndianCurrency(data.yearlyDeposit) },
      { label: "Interest Rate", value: `${data.interestRate}% p.a.` },
      { label: "Tenure", value: `${data.tenure} Years` },
      { label: "Total Deposited", value: formatIndianCurrency(data.totalDeposited) },
      { label: "Total Interest", value: formatIndianCurrency(data.totalInterest) },
      { label: "Maturity Value", value: formatIndianCurrency(data.maturityValue) },
    ],
    tableData: {
      headers: ["Year", "Deposit", "Interest Earned", "Balance"],
      rows: data.yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.deposit),
        formatIndianCurrency(row.interest),
        formatIndianCurrency(row.balance),
      ]),
    },
    footer: "PPF is a government-backed savings scheme with tax benefits under Section 80C",
  })
}

// Helper to generate FD Calculator PDF
export function generateFDPDF(data: {
  principal: number
  interestRate: number
  tenure: number
  compoundingFrequency: string
  isSeniorCitizen: boolean
  maturityValue: number
  totalInterest: number
}) {
  generateCalculatorPDF({
    title: "FD Calculator Report",
    subtitle: `Fixed Deposit - ${data.compoundingFrequency} Compounding${data.isSeniorCitizen ? " (Senior Citizen)" : ""}`,
    summary: [
      { label: "Principal Amount", value: formatIndianCurrency(data.principal) },
      { label: "Interest Rate", value: `${data.interestRate}% p.a.` },
      { label: "Tenure", value: `${data.tenure} Months` },
      { label: "Compounding", value: data.compoundingFrequency },
      { label: "Total Interest", value: formatIndianCurrency(data.totalInterest) },
      { label: "Maturity Value", value: formatIndianCurrency(data.maturityValue) },
    ],
    footer: data.isSeniorCitizen 
      ? "Senior citizen rate applied (additional 0.5% interest)"
      : "Standard FD interest rate applied",
  })
}

// Helper to generate RD Calculator PDF
export function generateRDPDF(data: {
  monthlyDeposit: number
  interestRate: number
  tenure: number
  totalDeposited: number
  totalInterest: number
  maturityValue: number
  yearlyData: { year: number; deposited: number; interest: number; balance: number }[]
}) {
  generateCalculatorPDF({
    title: "RD Calculator Report",
    subtitle: "Recurring Deposit Investment Analysis",
    summary: [
      { label: "Monthly Deposit", value: formatIndianCurrency(data.monthlyDeposit) },
      { label: "Interest Rate", value: `${data.interestRate}% p.a.` },
      { label: "Tenure", value: `${data.tenure} Months` },
      { label: "Total Deposited", value: formatIndianCurrency(data.totalDeposited) },
      { label: "Total Interest", value: formatIndianCurrency(data.totalInterest) },
      { label: "Maturity Value", value: formatIndianCurrency(data.maturityValue) },
    ],
    tableData: data.yearlyData.length > 0 ? {
      headers: ["Year", "Deposited", "Interest", "Balance"],
      rows: data.yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.deposited),
        formatIndianCurrency(row.interest),
        formatIndianCurrency(row.balance),
      ]),
    } : undefined,
  })
}

// Helper to generate EMI Calculator PDF
export function generateEMIPDF(data: {
  principal: number
  interestRate: number
  tenure: number
  emi: number
  totalInterest: number
  totalPayment: number
  schedule: { month: number; principal: number; interest: number; balance: number }[]
}) {
  // Only show yearly summary in PDF for better readability
  const yearlyData: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = []
  for (let i = 11; i < data.schedule.length; i += 12) {
    const yearEnd = data.schedule[i]
    const yearStart = i >= 12 ? data.schedule[i - 12] : { balance: data.principal }
    yearlyData.push({
      year: Math.floor(i / 12) + 1,
      principalPaid: yearStart.balance - yearEnd.balance,
      interestPaid: data.schedule.slice(Math.max(0, i - 11), i + 1).reduce((sum, m) => sum + m.interest, 0),
      balance: yearEnd.balance,
    })
  }
  // Add final year if not complete
  const remaining = data.schedule.length % 12
  if (remaining > 0 && data.schedule.length > 12) {
    const lastIdx = data.schedule.length - 1
    const prevYearEnd = data.schedule[Math.floor(data.schedule.length / 12) * 12 - 1]
    yearlyData.push({
      year: Math.ceil(data.schedule.length / 12),
      principalPaid: prevYearEnd ? prevYearEnd.balance - (data.schedule[lastIdx]?.balance || 0) : 0,
      interestPaid: data.schedule.slice(-remaining).reduce((sum, m) => sum + m.interest, 0),
      balance: data.schedule[lastIdx]?.balance || 0,
    })
  }

  generateCalculatorPDF({
    title: "EMI Calculator Report",
    subtitle: "Loan Repayment Analysis",
    summary: [
      { label: "Loan Amount", value: formatIndianCurrency(data.principal) },
      { label: "Interest Rate", value: `${data.interestRate}% p.a.` },
      { label: "Tenure", value: `${data.tenure} Months` },
      { label: "Monthly EMI", value: formatIndianCurrency(data.emi) },
      { label: "Total Interest", value: formatIndianCurrency(data.totalInterest) },
      { label: "Total Payment", value: formatIndianCurrency(data.totalPayment) },
    ],
    tableData: yearlyData.length > 0 ? {
      headers: ["Year", "Principal Paid", "Interest Paid", "Balance"],
      rows: yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.principalPaid),
        formatIndianCurrency(row.interestPaid),
        formatIndianCurrency(Math.max(0, row.balance)),
      ]),
    } : undefined,
    footer: `EMI of ${formatIndianCurrency(data.emi)} for ${Math.ceil(data.tenure / 12)} years`,
  })
}

// Helper to generate CAGR Calculator PDF
export function generateCAGRPDF(data: {
  mode: "cagr" | "finalValue"
  initialValue: number
  finalValue: number
  years: number
  cagr: number
  absoluteReturn: number
}) {
  generateCalculatorPDF({
    title: "CAGR Calculator Report",
    subtitle: data.mode === "cagr" ? "Calculate CAGR from Investment Values" : "Calculate Final Value from CAGR",
    summary: [
      { label: "Initial Investment", value: formatIndianCurrency(data.initialValue) },
      { label: "Final Value", value: formatIndianCurrency(data.finalValue) },
      { label: "Time Period", value: `${data.years} Years` },
      { label: "CAGR", value: `${data.cagr.toFixed(2)}%` },
      { label: "Absolute Return", value: `${data.absoluteReturn.toFixed(2)}%` },
      { label: "Total Gain", value: formatIndianCurrency(data.finalValue - data.initialValue) },
    ],
  })
}

// Helper to generate Compound Interest Calculator PDF
export function generateCompoundInterestPDF(data: {
  principal: number
  rate: number
  time: number
  compoundingFrequency: string
  compoundInterest: number
  simpleInterest: number
  ciMaturity: number
  siMaturity: number
  yearlyData: { year: number; ci: number; si: number }[]
}) {
  generateCalculatorPDF({
    title: "Compound Interest Calculator Report",
    subtitle: `${data.compoundingFrequency} Compounding vs Simple Interest`,
    summary: [
      { label: "Principal Amount", value: formatIndianCurrency(data.principal) },
      { label: "Interest Rate", value: `${data.rate}% p.a.` },
      { label: "Time Period", value: `${data.time} Years` },
      { label: "CI Maturity Value", value: formatIndianCurrency(data.ciMaturity) },
      { label: "SI Maturity Value", value: formatIndianCurrency(data.siMaturity) },
      { label: "Extra with CI", value: formatIndianCurrency(data.ciMaturity - data.siMaturity) },
    ],
    tableData: {
      headers: ["Year", "Compound Interest", "Simple Interest", "Difference"],
      rows: data.yearlyData.map(row => [
        row.year,
        formatIndianCurrency(row.ci),
        formatIndianCurrency(row.si),
        formatIndianCurrency(row.ci - row.si),
      ]),
    },
    footer: `Compound Interest earns ${formatIndianCurrency(data.ciMaturity - data.siMaturity)} more than Simple Interest`,
  })
}

// Helper to generate Goal Planner PDF
export function generateGoalPlannerPDF(data: {
  goalName: string
  targetAmount: number
  timeHorizon: number
  currentSavings: number
  inflationRate: number
  inflationAdjustedTarget: number
  requiredSIP: number
  conservativeSIP: number
  aggressiveSIP: number
  projectedCorpus: number
  shortfall: number
}) {
  generateCalculatorPDF({
    title: "Goal Planner Report",
    subtitle: `${data.goalName} - Financial Goal Analysis`,
    summary: [
      { label: "Goal", value: data.goalName },
      { label: "Target Amount (Today)", value: formatIndianCurrency(data.targetAmount) },
      { label: "Time Horizon", value: `${data.timeHorizon} Years` },
      { label: "Inflation Rate", value: `${data.inflationRate}%` },
      { label: "Inflation Adjusted Target", value: formatIndianCurrency(data.inflationAdjustedTarget) },
      { label: "Required Monthly SIP", value: formatIndianCurrency(data.requiredSIP) },
    ],
    tableData: {
      headers: ["Return Rate", "Monthly SIP Required", "Risk Level"],
      rows: [
        ["8% (Conservative)", formatIndianCurrency(data.conservativeSIP), "Low Risk"],
        ["12% (Moderate)", formatIndianCurrency(data.requiredSIP), "Medium Risk"],
        ["15% (Aggressive)", formatIndianCurrency(data.aggressiveSIP), "High Risk"],
      ],
    },
    footer: `Current Monthly Savings: ${formatIndianCurrency(data.currentSavings)} | ${data.shortfall > 0 ? `Shortfall: ${formatIndianCurrency(data.shortfall)}` : "On track to achieve goal!"}`,
  })
}
