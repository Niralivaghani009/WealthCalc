import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AlertTriangle, Shield, Calculator, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | WealthCalc',
  description: 'Important disclaimer about WealthCalc calculators. Read before making financial decisions based on our calculations.',
  keywords: ['disclaimer', 'financial disclaimer', 'investment risk', 'calculator disclaimer'],
}

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Disclaimer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read this important disclaimer before using our financial calculators.
            </p>
          </div>

          {/* Main Disclaimer Alert */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-destructive mb-2">
                  Important Notice
                </h2>
                <p className="text-sm text-destructive/90">
                  WealthCalc is NOT a financial advisory service. The calculations provided are for informational 
                  and educational purposes only. Always consult with a qualified financial advisor before making 
                  any investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              {/* No Financial Advice */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Not Financial Advice</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>WealthCalc does not provide financial advice.</strong> Our calculators are tools designed 
                    to help you understand various financial concepts and scenarios. The results should not be 
                    considered as recommendations for any specific investment strategy or financial decision.
                  </p>
                  <p>
                    Before making any investment decisions, please consult with a qualified financial advisor who 
                    can provide personalized advice based on your individual financial situation, goals, and risk tolerance.
                  </p>
                </div>
              </section>

              {/* Calculation Limitations */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Calculation Limitations</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our calculators have inherent limitations and assumptions:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Market Volatility:</strong> Calculations assume constant returns, but real markets fluctuate</li>
                    <li><strong>Inflation:</strong> Future inflation rates are estimates and may vary significantly</li>
                    <li><strong>Tax Implications:</strong> Most calculators do not account for taxes on returns</li>
                    <li><strong>Expense Ratios:</strong> Mutual fund expenses and fees may not be fully considered</li>
                    <li><strong>Economic Factors:</strong> Interest rates, policy changes, and economic conditions are not predicted</li>
                    <li><strong>Currency Risk:</strong> Exchange rate fluctuations affect international investments</li>
                  </ul>
                </div>
              </section>

              {/* Investment Risks */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Investment Risks</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>All investments carry risk.</strong> Past performance does not guarantee future results. 
                    Key risks to consider:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Market Risk:</strong> The possibility of losing money due to market factors</li>
                    <li><strong>Inflation Risk:</strong> The risk that inflation reduces purchasing power</li>
                    <li><strong>Interest Rate Risk:</strong> Changes in interest rates affecting investment values</li>
                    <li><strong>Liquidity Risk:</strong> Difficulty selling investments at fair prices</li>
                    <li><strong>Credit Risk:</strong> Risk of default on debt investments</li>
                    <li><strong>Concentration Risk:</strong> Overexposure to specific sectors or assets</li>
                  </ul>
                </div>
              </section>

              {/* Specific Calculator Disclaimers */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Specific Calculator Disclaimers</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">SIP & Lumpsum Calculators</h3>
                    <p className="text-sm">
                      Assume constant returns and do not account for market volatility, fund performance variations, 
                      or changes in investment strategy.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">PPF Calculator</h3>
                    <p className="text-sm">
                      Based on current government rates which may change annually. Does not account for potential 
                      policy changes or interest rate fluctuations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">FD & RD Calculators</h3>
                    <p className="text-sm">
                      Use current interest rates which are subject to change based on RBI policies and individual 
                      bank decisions. Tax implications are not considered.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">EMI Calculator</h3>
                    <p className="text-sm">
                      Does not include processing fees, prepayment charges, or other costs associated with loans. 
                      Interest rates may vary based on credit profile and lender policies.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">CAGR Calculator</h3>
                    <p className="text-sm">
                      Shows average annual growth but does not reflect year-to-year volatility or the sequence of returns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Accuracy */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Data Accuracy</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    While we strive to provide accurate calculations, we cannot guarantee:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The accuracy of all mathematical formulas</li>
                    <li>Real-time interest rates or market data</li>
                    <li>Error-free operation of the calculators</li>
                    <li>Compatibility with all devices and browsers</li>
                  </ul>
                  <p>
                    Users should independently verify all calculations before making financial decisions.
                  </p>
                </div>
              </section>

              {/* No Warranty */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">No Warranty</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WealthCalc is provided "as is" without any warranties, express or implied. We make no 
                    warranties regarding:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The accuracy or reliability of calculations</li>
                    <li>The suitability of results for your needs</li>
                    <li>The availability or performance of the service</li>
                    <li>The security of data transmission</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WealthCalc and its operators shall not be liable for any direct, indirect, incidental, 
                    special, or consequential damages arising from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use of or reliance on calculator results</li>
                    <li>Investment decisions made based on our calculations</li>
                    <li>Technical issues or service interruptions</li>
                    <li>Errors or inaccuracies in calculations</li>
                    <li>Any financial losses incurred</li>
                  </ul>
                  <p>
                    Your use of this service is entirely at your own risk.
                  </p>
                </div>
              </section>

              {/* Professional Advice */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Seek Professional Advice</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Always consult with qualified professionals before making financial decisions:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Financial Advisor:</strong> For personalized investment planning</li>
                    <li><strong>Tax Consultant:</strong> For tax implications and planning</li>
                    <li><strong>Legal Advisor:</strong> For legal and regulatory matters</li>
                    <li><strong>Insurance Advisor:</strong> For insurance-related decisions</li>
                    <li><strong>Real Estate Expert:</strong> For property investments</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Links */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Third-Party Links</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the 
                    content, accuracy, or practices of external sites. Always review the terms and privacy 
                    policies of linked websites.
                  </p>
                </div>
              </section>
            </div>

            {/* Final Warning */}
            <div className="mt-12 bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-destructive mb-2">
                    Final Warning
                  </h3>
                  <p className="text-sm text-destructive/90">
                    By using WealthCalc calculators, you acknowledge that you have read, understood, and agreed 
                    to this disclaimer. You agree that you are using these tools at your own risk and that 
                    WealthCalc is not responsible for any financial decisions you make based on the calculations 
                    provided. Always seek professional financial advice before investing.
                  </p>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
