import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FileText, CheckCircle, AlertTriangle, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | WealthCalc',
  description: 'Read WealthCalc terms and conditions for using our free investment calculators. Understand your rights and responsibilities.',
  keywords: ['terms and conditions', 'terms of use', 'user agreement', 'WealthCalc terms'],
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              By using WealthCalc, you agree to these terms and conditions. Please read them carefully.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using WealthCalc ("the Service"), you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              {/* Description of Service */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Description of Service</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WealthCalc provides free online financial calculators including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Systematic Investment Plan (SIP) Calculator</li>
                    <li>Lumpsum Investment Calculator</li>
                    <li>Public Provident Fund (PPF) Calculator</li>
                    <li>Fixed Deposit (FD) Calculator</li>
                    <li>Recurring Deposit (RD) Calculator</li>
                    <li>Equated Monthly Installment (EMI) Calculator</li>
                    <li>Compound Annual Growth Rate (CAGR) Calculator</li>
                    <li>Compound Interest Calculator</li>
                    <li>Goal Planning Tools</li>
                  </ul>
                  <p>
                    All calculators are provided free of charge and are for informational purposes only.
                  </p>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">User Responsibilities</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>As a user of WealthCalc, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the service for lawful purposes only</li>
                    <li>Not attempt to reverse engineer or hack the calculators</li>
                    <li>Not use automated tools to abuse the service</li>
                    <li>Provide accurate information when using calculators</li>
                    <li>Not claim ownership of our calculator algorithms</li>
                    <li>Respect intellectual property rights</li>
                  </ul>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Important Disclaimer</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Financial Advice Disclaimer:</strong> WealthCalc is not a financial advisory service. 
                    The calculations provided are for informational and educational purposes only and should not be 
                    considered as financial advice.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Actual investment returns may vary significantly</li>
                    <li>Market conditions affect real investment outcomes</li>
                    <li>Tax implications are not considered in calculations</li>
                    <li>Inflation impact may not be fully accounted for</li>
                    <li>Past performance does not guarantee future results</li>
                  </ul>
                  <p>
                    Always consult with a qualified financial advisor before making investment decisions.
                  </p>
                </div>
              </section>

              {/* Accuracy of Information */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Accuracy of Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    While we strive to provide accurate calculations, we make no warranties about:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The completeness or accuracy of calculations</li>
                    <li>The suitability of results for your specific situation</li>
                    <li>The timeliness of information</li>
                    <li>Error-free operation of the service</li>
                  </ul>
                  <p>
                    Users should verify all calculations independently before making financial decisions.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WealthCalc and its operators shall not be liable for any direct, indirect, incidental, special, 
                    or consequential damages resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use or inability to use the service</li>
                    <li>Errors or inaccuracies in calculations</li>
                    <li>Investment decisions based on calculator results</li>
                    <li>Service interruptions or technical issues</li>
                    <li>Loss of data or information</li>
                  </ul>
                  <p>
                    Your use of the service is entirely at your own risk.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    All content, features, and functionality of WealthCalc are owned by WealthCalc and are protected 
                    by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may not copy, modify, distribute, sell, or lease any part of the service without our 
                    express written permission.
                  </p>
                </div>
              </section>

              {/* Service Availability */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Service Availability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We strive to maintain the service availability but do not guarantee uninterrupted access. 
                    We reserve the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Modify, suspend, or discontinue the service</li>
                    <li>Update calculator algorithms and formulas</li>
                    <li>Change features and functionality</li>
                    <li>Restrict access to the service</li>
                  </ul>
                </div>
              </section>

              {/* Privacy */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Privacy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy to understand how we 
                    collect, use, and protect your information.
                  </p>
                  <p>
                    By using WealthCalc, you consent to the collection and use of information as described in our Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Termination</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or liability, 
                    for any reason, including if you breach the terms.
                  </p>
                  <p>
                    Upon termination, your right to use the service will cease immediately.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    These terms and conditions shall be governed by and construed in accordance with the laws 
                    of India, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these terms shall be subject to the exclusive jurisdiction of 
                    the courts in [Your City], India.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately 
                    upon posting on this page.
                  </p>
                  <p>
                    Your continued use of the service after changes constitutes acceptance of the new terms.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <div className="text-muted-foreground">
                  <p>
                    If you have questions about these Terms & Conditions, please contact us:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> legal@wealthcalc.in</p>
                    <p><strong>Website:</strong> https://wealthcalc.in</p>
                  </div>
                </div>
              </section>
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
