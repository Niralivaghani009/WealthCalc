import Link from "next/link"
import { TrendingUp } from "lucide-react"

const footerLinks = {
  calculators: [
    { label: "SIP Calculator", href: "#sip-calculator" },
    { label: "Lumpsum Calculator", href: "#lumpsum-calculator" },
    { label: "PPF Calculator", href: "#ppf-calculator" },
    { label: "FD Calculator", href: "#fd-calculator" },
    { label: "EMI Calculator", href: "#emi-calculator" },
    { label: "CAGR Calculator", href: "#cagr-calculator" },
  ],
  resources: [
    { label: "Goal Planner", href: "#goal-planner" },
    { label: "Learn", href: "#learn" },
    { label: "RD Calculator", href: "#rd-calculator" },
    { label: "Compound Interest", href: "#compound-calculator" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                href="#home"
                className="inline-flex items-center gap-2 text-xl font-bold mb-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                </div>
                <span>WealthCalc</span>
              </Link>
              <p className="text-sm text-background/70 leading-relaxed max-w-xs">
                Free investment calculators for every Indian investor. Plan smarter,
                invest better with accurate calculations.
              </p>
            </div>

            {/* Calculators */}
            <div>
              <h3 className="font-semibold mb-4">Calculators</h3>
              <ul className="space-y-3">
                {footerLinks.calculators.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <p className="text-sm text-background/70 leading-relaxed">
                WealthCalc provides free, accurate financial calculators to help
                Indians make informed investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-background/10 py-6">
          <p className="text-xs text-background/50 leading-relaxed text-center max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> The calculations provided by WealthCalc are
            for informational purposes only and should not be considered as
            financial advice. Actual returns may vary based on market conditions,
            fund performance, and other factors. Please consult a qualified
            financial advisor before making any investment decisions. Past
            performance does not guarantee future results.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/70">
              © {new Date().getFullYear()} WealthCalc. All rights reserved.
            </p>
            <p className="text-sm text-background/50">
              Made with care for Indian investors
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
