"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is SIP?",
    answer:
      "SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds. Instead of making a lump sum investment, you invest small amounts at regular intervals (usually monthly). This helps in rupee cost averaging and reduces the impact of market volatility. SIP is ideal for salaried individuals who want to build wealth over time with disciplined investing.",
  },
  {
    question: "SIP vs Lumpsum - which is better?",
    answer:
      "Both SIP and Lumpsum have their advantages. SIP is better for: 1) Regular income earners who can't invest large amounts at once, 2) Risk-averse investors as it averages out market volatility, 3) Building discipline in investing. Lumpsum is better when: 1) You have a large amount to invest, 2) Markets are at a low point, 3) For short-term goals. Studies show that in rising markets, lumpsum performs better, while in volatile markets, SIP reduces risk through rupee cost averaging.",
  },
  {
    question: "Is PPF still worth it in 2025?",
    answer:
      "Yes, PPF remains an excellent investment option for conservative investors in 2025. Key benefits include: 1) Tax-free returns under Section 80C (up to ₹1.5 lakh), 2) Guaranteed returns backed by the government, 3) Current rate of 7.1% is competitive for risk-free investments, 4) EEE status (Exempt-Exempt-Exempt) for tax benefits. However, it has a 15-year lock-in and may not beat inflation significantly. It's best suited for the debt portion of your portfolio, retirement planning, and as a safe haven during market uncertainty.",
  },
  {
    question: "How is EMI calculated?",
    answer:
      "EMI (Equated Monthly Installment) is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P = Principal loan amount, r = Monthly interest rate (annual rate/12/100), n = Loan tenure in months. For example, for a ₹25 lakh loan at 8.5% for 20 years: Monthly rate = 8.5/12/100 = 0.00708, Tenure = 240 months. The EMI works out to approximately ₹21,700. In the initial years, a larger portion goes toward interest; this shifts toward principal repayment over time.",
  },
  {
    question: "What is CAGR?",
    answer:
      "CAGR (Compound Annual Growth Rate) measures the mean annual growth rate of an investment over a specified period longer than one year. It's calculated as: CAGR = (Final Value / Initial Value)^(1/Years) - 1. For example, if you invested ₹1 lakh and it grew to ₹2 lakh in 5 years, CAGR = (2,00,000/1,00,000)^(1/5) - 1 = 14.87%. CAGR is useful because it smooths out volatility and gives a single growth rate, making it easy to compare different investments. However, it doesn't reflect actual year-to-year fluctuations.",
  },
  {
    question: "What is the difference between Simple Interest and Compound Interest?",
    answer:
      "Simple Interest (SI) is calculated only on the principal amount: SI = P × R × T / 100. Compound Interest (CI) is calculated on the principal plus accumulated interest: CI = P × (1 + r/n)^(nt) - P. The key difference is that with compound interest, your earnings generate their own earnings. For example, ₹1 lakh at 10% for 10 years: SI = ₹1 lakh, CI (yearly) = ₹1.59 lakh. The longer your investment horizon, the more powerful compounding becomes - this is why starting early is crucial for wealth building.",
  },
  {
    question: "How much should I save for an emergency fund?",
    answer:
      "Financial experts recommend maintaining 3-6 months of your monthly expenses as an emergency fund. If you have dependents or unstable income, aim for 6-12 months. Calculate your essential monthly expenses (rent, EMIs, utilities, groceries, insurance) and multiply by the number of months. This fund should be kept in highly liquid instruments like savings accounts, liquid funds, or FDs with premature withdrawal facility. Don't invest this in equity or locked instruments as you may need immediate access during emergencies.",
  },
]

export function FAQSection() {
  return (
    <section
      id="learn"
      className="py-16 sm:py-24 bg-secondary/30"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Learn About Investing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Frequently asked questions about investments and calculators
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
