import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CalculatorCards } from "@/components/calculator-cards"
import { SIPCalculator } from "@/components/calculators/sip-calculator"
import { LumpsumCalculator } from "@/components/calculators/lumpsum-calculator"
import { PPFCalculator } from "@/components/calculators/ppf-calculator"
import { FDCalculator } from "@/components/calculators/fd-calculator"
import { RDCalculator } from "@/components/calculators/rd-calculator"
import { EMICalculator } from "@/components/calculators/emi-calculator"
import { CAGRCalculator } from "@/components/calculators/cagr-calculator"
import { CompoundInterestCalculator } from "@/components/calculators/compound-interest-calculator"
import { GoalPlanner } from "@/components/goal-planner"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CalculatorCards />
        <SIPCalculator />
        <LumpsumCalculator />
        <PPFCalculator />
        <FDCalculator />
        <RDCalculator />
        <EMICalculator />
        <CAGRCalculator />
        <CompoundInterestCalculator />
        <GoalPlanner />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
