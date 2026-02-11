<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SAVANNA_APPS, slugify } from '@techsavanna/shared'
import { useAuth } from '@techsavanna/auth'
import type { PricingPlan } from '@techsavanna/shared'
import {
  LandingLayout,
  HeroSection,
  ValuePropsSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  TrustSection,
  usePlans
} from '@techsavanna/ui'
import type { Feature, Testimonial, FAQ, ValueProp } from '@techsavanna/ui'

const router = useRouter()
const appConfig = SAVANNA_APPS.people
const appDomain = import.meta.env.VITE_PEOPLE_DOMAIN || 'saas.techsavanna.technology'
const { isAuthenticated, fullName, initials, user, logout } = useAuth()

const siteUrl = computed(() => {
  const tenantName = user.value?.tenantName
  const subdomain = tenantName ? slugify(tenantName) : ''
  return subdomain ? `https://${subdomain}.${appDomain}` : ''
})

// Value Propositions
const valueProps: ValueProp[] = [
  {
    icon: 'clock',
    value: '3 Hours',
    label: 'Payroll Processing',
    title: 'Payroll in Hours, Not Days',
    description: 'What used to take days now takes just 3 hours. Automatic calculations for PAYE, NHIF, NSSF, and Housing Levy ensure accuracy every time.',
    features: ['Automatic tax calculations', 'Statutory deductions', 'Multi-currency payroll', 'Direct bank integration']
  },
  {
    icon: 'secure',
    value: 'KRA',
    label: 'Fully Compliant',
    title: 'Stay Compliant, Automatically',
    description: 'Never worry about compliance again. We automatically update for new regulations and generate all required statutory reports.',
    features: ['KRA P9/P10 generation', 'NHIF & NSSF reports', 'Housing Levy ready', 'Automatic updates']
  },
  {
    icon: 'mobile',
    value: 'Mobile',
    label: 'Employee Self-Service',
    title: 'Empower Your Employees',
    description: 'Give employees 24/7 access to payslips, leave requests, and personal information. Reduce HR queries by 80%.',
    features: ['Mobile app access', 'Payslip downloads', 'Leave requests', 'Profile management']
  },
  {
    icon: 'users',
    value: '2000+',
    label: 'Companies Trust Us',
    title: 'Trusted by Leading Companies',
    description: 'Join over 2,000 companies who trust WorkwiseHRM to manage their most valuable asset - their people.',
    features: ['Enterprise-ready', 'Dedicated support', 'Regular updates', 'Community of HR leaders']
  }
]

// HR & Payroll Features
const features: Feature[] = [
  {
    icon: 'currency-dollar',
    title: 'Payroll Automation',
    description: 'Process payroll in minutes, not hours. Automatic tax calculations for PAYE, NHIF, NSSF, and Housing Levy. Multi-currency support for your diverse workforce with direct bank integration.',
    highlights: ['Auto tax calculation', 'Statutory deductions', 'Bank integration', 'Multi-currency'],
    previewType: 'dashboard'
  },
  {
    icon: 'calendar',
    title: 'Leave Management',
    description: 'Streamline leave requests and approvals. Track balances in real-time, manage custom policies per department, and ensure compliance with labor laws across multiple countries.',
    highlights: ['One-click approvals', 'Balance tracking', 'Custom policies', 'Holiday calendar'],
    previewType: 'list'
  },
  {
    icon: 'user-circle',
    title: 'Employee Self-Service',
    description: 'Empower employees to update profiles, request leaves, view payslips, and manage benefits from their personal portal or mobile app. Reduce HR queries by 80%.',
    highlights: ['Payslip downloads', 'Profile updates', 'Leave requests', 'Mobile access'],
    previewType: 'form'
  },
  {
    icon: 'clock',
    title: 'Time & Attendance',
    description: 'Accurate attendance tracking with biometric integration, GPS clock-in, and flexible shift management. Support for remote workers, field staff, and office employees.',
    highlights: ['Biometric integration', 'GPS clock-in', 'Shift scheduling', 'Overtime tracking'],
    previewType: 'chart'
  },
  {
    icon: 'shield-check',
    title: 'Compliance & Reporting',
    description: 'Stay compliant with NHIF, NSSF, PAYE, and other statutory requirements. Generate P9, P10, and audit-ready reports with one click. Automatic updates for regulation changes.',
    highlights: ['P9/P10 generation', 'NHIF & NSSF reports', 'Audit trails', 'Auto updates'],
    previewType: 'cards'
  },
  {
    icon: 'chart-bar',
    title: 'Performance Reviews',
    description: 'Set goals, track progress, and conduct 360-degree performance reviews. Build a culture of continuous feedback and growth with structured evaluation cycles.',
    highlights: ['Goal setting', '360° feedback', 'Review cycles', 'Growth tracking'],
    previewType: 'dashboard'
  }
]

// Pricing Plans - fetched from backend
const { plans: pricingPlans, fetchPlans } = usePlans()

onMounted(() => {
  fetchPlans('PRODUCT_PEOPLE', {
    description: 'Complete HR & payroll solution for teams of all sizes',
    features: [
      'Unlimited employees',
      'Advanced payroll with multi-location',
      'Time & attendance tracking',
      'Performance management',
      'Leave management & custom policies',
      'NHIF & NSSF compliance',
      'Employee self-service portal',
      'Custom reports & analytics',
      'Priority support'
    ],
    featured: true,
    ctaText: 'Start Free Trial',
    trialDays: 14
  })
})

// Testimonials from HR managers
const testimonials: Testimonial[] = [
  {
    name: 'George Njuguna',
    role: 'CIO',
    company: 'Safaricom PLC',
    quote: 'TechSavanna has provided us with exceptional service. Their team was incredibly knowledgeable and professional, delivering a solution tailored to our unique needs. We have been able to efficiently manage our operations in a manner that is both cost-effective and secure.',
    rating: 5
  },
  {
    name: 'Catherine Wambui',
    role: 'HR Director',
    company: 'TechVentures Kenya',
    quote: 'WorkwiseHRM reduced our payroll processing time from 3 days to 3 hours. The automatic statutory deductions ensure we never miss a deadline with KRA or NSSF.',
    rating: 5
  },
  {
    name: 'Michael Oduor',
    role: 'Head of People',
    company: 'Nairobi Fintech Ltd',
    quote: 'The employee self-service portal eliminated 80% of routine HR queries. Our team now focuses on strategic initiatives instead of paperwork.',
    rating: 5
  },
  {
    name: 'Fatima Hassan',
    role: 'HR Manager',
    company: 'Coast Hospitality Group',
    quote: 'Managing leave across 5 hotels with different shift patterns was a nightmare. WorkwiseHRM made it seamless with customizable policies for each location.',
    rating: 5
  },
  {
    name: 'James Kipkorir',
    role: 'CFO',
    company: 'Agribusiness Solutions',
    quote: 'The payroll accuracy is remarkable. We\'ve had zero compliance issues since switching, and the reporting makes audits a breeze.',
    rating: 5
  },
  {
    name: 'Grace Achieng',
    role: 'People Operations Lead',
    company: 'Digital Commerce Africa',
    quote: 'Performance reviews used to be dreaded. Now with 360-degree feedback and goal tracking, our employees actually look forward to growth conversations.',
    rating: 5
  },
  {
    name: 'David Mutua',
    role: 'Managing Director',
    company: 'Savanna Manufacturing',
    quote: 'Time tracking with biometric integration solved our attendance challenges. We\'ve seen a 15% improvement in productivity since implementation.',
    rating: 5
  }
]

// FAQs about payroll, compliance, employee management
const faqs: FAQ[] = [
  {
    question: 'How does WorkwiseHRM handle statutory deductions?',
    answer: 'WorkwiseHRM automatically calculates PAYE, NHIF, NSSF, Housing Levy, and other statutory deductions based on current Kenyan tax laws. We update our system whenever regulations change, ensuring you\'re always compliant. You can also configure deductions for other East African countries.'
  },
  {
    question: 'Can I migrate my existing employee data?',
    answer: 'Yes! We provide a simple CSV import tool and offer free migration assistance for Professional and Enterprise plans. Our team will help you transfer employee records, leave balances, payroll history, and more. Most migrations are completed within 1-2 business days.'
  },
  {
    question: 'How secure is employee data?',
    answer: 'We use bank-level AES-256 encryption for all data, both in transit and at rest. Our infrastructure is hosted in secure data centers with SOC 2 Type II compliance. Role-based access control ensures employees only see what they\'re authorized to view.'
  },
  {
    question: 'Does WorkwiseHRM integrate with banking systems?',
    answer: 'Yes, we integrate with major Kenyan banks for direct salary disbursement. We also support M-Pesa bulk payments for businesses that prefer mobile money. Enterprise clients can integrate with their existing ERP and accounting systems via our API.'
  },
  {
    question: 'How does leave management work?',
    answer: 'Employees request leave through the self-service portal or mobile app. Managers receive notifications and can approve with one click. The system automatically tracks balances, prevents conflicts, and integrates with payroll for accurate salary calculations.'
  },
  {
    question: 'Can I customize payroll for different employee types?',
    answer: 'Absolutely. WorkwiseHRM supports permanent, contract, casual, and hourly employees. You can create different salary structures, benefit packages, and deduction rules for each category. Multi-location businesses can manage different currencies and tax jurisdictions.'
  },
  {
    question: 'What reports are available?',
    answer: 'Generate payroll summaries, tax returns (P9, P10), statutory remittance reports, headcount analytics, leave utilization, and more. Enterprise clients can create custom reports and schedule automated delivery to stakeholders.'
  },
  {
    question: 'Is training provided?',
    answer: 'All plans include access to our comprehensive knowledge base and video tutorials. Professional plans get priority onboarding support, and Enterprise clients receive dedicated training sessions for HR teams and employees.'
  }
]

function handleGetStarted() {
  router.push('/signup')
}

function handleLogin() {
  router.push('/login')
}

async function handleLogout() {
  await logout()
  router.push('/')
}

function handleSelectPlan(plan: PricingPlan, billing: 'monthly' | 'yearly') {
  router.push({ path: '/signup', query: { plan: plan.id, billing } })
}
</script>

<template>
  <LandingLayout
    app-id="people"
    :is-authenticated="isAuthenticated"
    :user-name="fullName"
    :user-initials="initials"
    :site-url="siteUrl"
    @login="handleLogin"
    @signup="handleGetStarted"
    @logout="handleLogout"
  >
    <HeroSection
      pill="Trusted by 2,000+ Companies"
      :title="appConfig.tagline"
      :subtitle="appConfig.description"
      cta-text="Start Free Trial"
      secondary-cta-text="Watch Demo"
      video-url="https://www.youtube.com/watch?v=EOohNl8J9rw"
      gradient-from="from-blue-600"
      gradient-to="to-indigo-700"
      preview-type="hrm"
      @cta-click="handleGetStarted"
    />

    <ValuePropsSection :value-props="valueProps" />

    <FeaturesSection
      title="Everything You Need to Manage Your People"
      subtitle="Powerful HR tools designed for modern businesses and compliance requirements"
      :features="features"
      :columns="3"
    />

    <TestimonialsSection
      title="Trusted by 2,000+ Companies"
      subtitle="See what HR leaders and business owners say about WorkwiseHRM"
      :testimonials="testimonials"
    />

    <PricingSection
      title="Simple, Per-User Pricing"
      subtitle="One plan, all features included. Pay per user with a 14-day free trial."
      :plans="pricingPlans"
      currency="KES"
      @select-plan="handleSelectPlan"
    />

    <FAQSection
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about WorkwiseHRM"
      :faqs="faqs"
    />

    <CTASection
      title="Ready to Simplify Your HR Operations?"
      subtitle="Join thousands of companies using WorkwiseHRM to manage their workforce"
      cta-text="Start Your Free Trial"
      secondary-cta-text="Talk to Sales"
      gradient-from="from-blue-600"
      gradient-to="to-indigo-700"
      @cta-click="handleGetStarted"
      @secondary-cta-click="router.push('/sales')"
    />

    <TrustSection />
  </LandingLayout>
</template>
