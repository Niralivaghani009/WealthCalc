/**
 * Format number in Indian numbering system (lakhs and crores)
 * Example: 1000000 becomes "10,00,000"
 */
export function formatIndianNumber(num: number): string {
  if (num === 0) return "0"
  
  const isNegative = num < 0
  const absNum = Math.abs(num)
  
  // Round to 2 decimal places for display
  const rounded = Math.round(absNum * 100) / 100
  
  // Split into integer and decimal parts
  const parts = rounded.toString().split(".")
  let integerPart = parts[0]
  const decimalPart = parts[1]
  
  // Format integer part in Indian system
  // First group of 3 digits from right, then groups of 2
  const lastThree = integerPart.slice(-3)
  const otherDigits = integerPart.slice(0, -3)
  
  let formatted = lastThree
  if (otherDigits) {
    // Add groups of 2 digits
    const groups = []
    let remaining = otherDigits
    while (remaining.length > 0) {
      groups.unshift(remaining.slice(-2))
      remaining = remaining.slice(0, -2)
    }
    formatted = groups.join(",") + "," + lastThree
  }
  
  // Add decimal part if exists
  if (decimalPart) {
    formatted += "." + decimalPart
  }
  
  return (isNegative ? "-" : "") + formatted
}

/**
 * Format currency in Indian Rupees
 */
export function formatIndianCurrency(num: number, showDecimal = false): string {
  const formatted = formatIndianNumber(Math.round(num))
  return "₹" + formatted
}

/**
 * Format large numbers in readable format (Lakhs, Crores)
 */
export function formatCompactIndian(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(2)} K`
  }
  return `₹${num.toFixed(0)}`
}

/**
 * Parse Indian formatted number string back to number
 */
export function parseIndianNumber(str: string): number {
  return parseFloat(str.replace(/[₹,\s]/g, "")) || 0
}
