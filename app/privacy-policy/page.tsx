import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Shield, Eye, Database, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | WealthCalc',
  description: 'Learn how WealthCalc protects your privacy and handles your data. Our commitment to transparency and user privacy.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'WealthCalc privacy'],
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-8">
              {/* Information Collection */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    WealthCalc is designed to respect your privacy. We collect minimal information necessary to provide our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Anonymous information about how you interact with our calculators</li>
                    <li><strong>Technical Data:</strong> Browser type, device information, and IP address (anonymized)</li>
                    <li><strong>Cookies:</strong> Essential cookies for functionality and preferences</li>
                    <li><strong>Calculator Inputs:</strong> Financial data you enter is processed locally and not stored</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the collected information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our calculator services</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Ensure website security and prevent fraud</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              {/* Data Protection */}
              <section className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Data Protection & Security</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We implement appropriate security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All calculations are performed locally in your browser</li>
                    <li>Financial data is never transmitted to our servers</li>
                    <li>SSL encryption for all data transmissions</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to collected data</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We use the following third-party services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Analytics:</strong> Anonymous usage statistics</li>
                    <li><strong>Hosting:</strong> Secure cloud infrastructure</li>
                    <li><strong>CDN:</strong> Fast content delivery</li>
                  </ul>
                  <p>
                    These services have their own privacy policies and we are not responsible for their practices.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access information we hold about you</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of non-essential data collection</li>
                    <li>Request data portability</li>
                    <li>File a complaint with authorities</li>
                  </ul>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                <div className="text-muted-foreground">
                  <p>
                    Our services are not directed to children under 13. We do not knowingly collect personal information 
                    from children under 13. If you believe we have collected such information, please contact us immediately.
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
                <div className="text-muted-foreground">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Posting the new policy on this page</li>
                    <li>Updating the "Last updated" date</li>
                    <li>Sending email notifications for significant changes</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <div className="text-muted-foreground">
                  <p>
                    If you have questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p><strong>Email:</strong> privacy@wealthcalc.in</p>
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
