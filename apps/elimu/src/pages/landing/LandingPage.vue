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
const appConfig = SAVANNA_APPS.elimu
const appDomain = import.meta.env.VITE_ELIMU_DOMAIN || 'saas.techsavanna.technology'
const { isAuthenticated, fullName, initials, user, logout } = useAuth()

const siteUrl = computed(() => {
  const tenantName = user.value?.tenantName
  const subdomain = tenantName ? slugify(tenantName) : ''
  return subdomain ? `https://${subdomain}.${appDomain}` : ''
})

// Value Propositions
const valueProps: ValueProp[] = [
  {
    icon: 'mobile',
    value: 'M-Pesa',
    label: 'Fee Collection',
    title: 'Effortless Fee Collection',
    description: 'Parents pay fees via M-Pesa, cards, or bank transfer. Automatic reconciliation means no more manual tracking or chasing payments.',
    features: ['M-Pesa integration', 'Card payments', 'Auto reconciliation', 'Payment reminders']
  },
  {
    icon: 'users',
    value: '500+',
    label: 'Schools Trust Us',
    title: 'Trusted by Leading Schools',
    description: 'From primary schools to universities, over 500 educational institutions across Africa rely on ElimuCoreLMS every day.',
    features: ['Primary & secondary schools', 'Colleges & universities', 'School groups', 'International schools']
  },
  {
    icon: 'secure',
    value: 'NEMIS',
    label: 'Government Integration',
    title: 'NEMIS Ready',
    description: 'Seamlessly integrate with Kenya\'s NEMIS and other government education systems. Generate all required reports automatically.',
    features: ['NEMIS integration', 'Enrollment returns', 'Exam entries', 'Government reports']
  },
  {
    icon: 'globe',
    value: 'Offline',
    label: 'Works Anywhere',
    title: 'Works Without Internet',
    description: 'Teachers can mark attendance, enter grades, and manage classes even without internet. Data syncs when connectivity returns.',
    features: ['Full offline mode', 'Automatic sync', 'Low bandwidth friendly', 'SMS fallback']
  }
]

// Education ERP Features
const features: Feature[] = [
  {
    icon: 'users',
    title: 'Student Information System',
    description: 'Comprehensive student profiles with academic history, health records, and parent contact information. Track every student\'s journey from admission to graduation with complete digital records.',
    highlights: ['Complete profiles', 'Academic history', 'Health records', 'Parent contacts'],
    previewType: 'list'
  },
  {
    icon: 'clipboard-document-list',
    title: 'Admissions Management',
    description: 'Streamline your admissions process with online applications, document verification, entrance test scheduling, and automated offer letters. Reduce paperwork by 90%.',
    highlights: ['Online applications', 'Document upload', 'Test scheduling', 'Auto offer letters'],
    previewType: 'form'
  },
  {
    icon: 'calendar-days',
    title: 'Academic Scheduling',
    description: 'Create timetables, manage class schedules, and coordinate room allocations. Handle substitutions and schedule changes with ease. Conflict detection prevents double-booking.',
    highlights: ['Timetable builder', 'Room allocation', 'Substitutions', 'Conflict detection'],
    previewType: 'cards'
  },
  {
    icon: 'currency-dollar',
    title: 'Fee Management',
    description: 'Automate fee collection with M-Pesa, cards, and bank transfers. Send payment reminders via SMS, generate receipts instantly, and track outstanding balances in real-time.',
    highlights: ['M-Pesa payments', 'Auto reminders', 'Instant receipts', 'Balance tracking'],
    previewType: 'dashboard'
  },
  {
    icon: 'device-phone-mobile',
    title: 'Parent Portal',
    description: 'Keep parents informed with real-time access to grades, attendance, homework, and school announcements. Enable direct communication with teachers through the portal or app.',
    highlights: ['Grade viewing', 'Attendance alerts', 'Homework tracking', 'Teacher messaging'],
    previewType: 'chart'
  },
  {
    icon: 'book-open',
    title: 'Library Management',
    description: 'Catalog books, manage borrowing and returns, track overdue items, and generate library usage reports. Integrate with digital resources and e-books for modern learning.',
    highlights: ['Book catalog', 'Borrow/return', 'Overdue alerts', 'E-book integration'],
    previewType: 'list'
  }
]

// Pricing Plans - fetched from backend
const { plans: pricingPlans, fetchPlans } = usePlans()

onMounted(() => {
  fetchPlans('PRODUCT_ELIMU', {
    description: 'Complete school management for institutions of all sizes',
    features: [
      'Unlimited students',
      'Student information system',
      'Fee collection with M-Pesa',
      'Attendance & grade management',
      'Parent & student portals',
      'Multiple campus management',
      'Library & transport tracking',
      'Custom reports & analytics',
      'Priority support'
    ],
    featured: true,
    ctaText: 'Start Free Trial',
    trialDays: 14
  })
})

// Testimonials from school administrators
const testimonials: Testimonial[] = [
  {
    name: 'George Njuguna',
    role: 'CIO',
    company: 'Safaricom PLC',
    quote: 'TechSavanna has provided us with exceptional service. Their team was incredibly knowledgeable and professional, delivering a solution tailored to our unique needs. We have been able to efficiently manage our operations in a manner that is both cost-effective and secure.',
    rating: 5
  },
  {
    name: 'Margaret Wanjiru',
    role: 'Principal',
    company: 'Sunrise Academy Nairobi',
    quote: 'ElimuCoreLMS transformed how we manage our school. Fee collection that used to take weeks now happens automatically. Parents love the portal and our admin staff can focus on education instead of paperwork.',
    rating: 5
  },
  {
    name: 'Dr. James Odhiambo',
    role: 'Vice Chancellor',
    company: 'East African Technical University',
    quote: 'Managing 15,000 students across 5 faculties was a nightmare before ElimuCoreLMS. Now we have complete visibility into admissions, academics, and finances from one dashboard.',
    rating: 5
  },
  {
    name: 'Grace Mutua',
    role: 'Director',
    company: 'Bright Future Schools',
    quote: 'We run 4 schools across Kenya. ElimuCoreLMS lets us manage all of them centrally while allowing each school to operate independently. The multi-campus feature is brilliant.',
    rating: 5
  },
  {
    name: 'Peter Kimani',
    role: 'Bursar',
    company: 'St. Mary\'s High School',
    quote: 'The fee management module alone is worth the investment. We\'ve reduced fee defaults by 40% with automated M-Pesa reminders. Reconciliation that took 2 days now takes 2 hours.',
    rating: 5
  },
  {
    name: 'Sarah Achieng',
    role: 'Registrar',
    company: 'Mombasa International School',
    quote: 'Admissions season used to be chaotic. With ElimuCoreLMS, parents apply online, we process applications faster, and entrance test scheduling is automated. It\'s a game-changer.',
    rating: 5
  },
  {
    name: 'David Mwangi',
    role: 'IT Director',
    company: 'Kenya Academy Group',
    quote: 'The parent portal has dramatically reduced phone calls to our offices. Parents can check grades, attendance, and pay fees anytime. Our staff productivity has improved significantly.',
    rating: 5
  }
]

// FAQs about school management
const faqs: FAQ[] = [
  {
    question: 'How long does it take to implement ElimuCoreLMS?',
    answer: 'For a single school, you can be up and running within 1-2 weeks. This includes data migration, staff training, and configuration. Multi-campus deployments typically take 4-6 weeks. Our implementation team guides you through every step.'
  },
  {
    question: 'Can parents pay fees through M-Pesa?',
    answer: 'Yes! We fully support M-Pesa, Airtel Money, card payments, and bank transfers. Parents can pay through the parent portal or via USSD. Payments are automatically reconciled and receipts are sent instantly via SMS and email.'
  },
  {
    question: 'Do parents get access to view student progress?',
    answer: 'Absolutely. Parents get secure login access to view grades, attendance records, exam schedules, homework assignments, and school announcements. They can also communicate directly with teachers and pay fees through the portal.'
  },
  {
    question: 'Can we migrate data from our current system?',
    answer: 'Yes, we provide full data migration support. Whether you\'re using spreadsheets, another school management system, or paper records, our team will help transfer all student records, fee history, and academic data to ElimuCoreLMS.'
  },
  {
    question: 'How does the system handle multiple academic years?',
    answer: 'ElimuCoreLMS maintains complete historical records across academic years. You can easily promote students, archive past years\' data, and generate historical reports. Year-end processes are largely automated.'
  },
  {
    question: 'Is there a mobile app for teachers?',
    answer: 'Yes, teachers can mark attendance, enter grades, and communicate with parents using our mobile app available on iOS and Android. The app works offline and syncs when connectivity is restored.'
  },
  {
    question: 'Can the system generate government-required reports?',
    answer: 'We support all major education ministry reporting requirements including enrollment returns, examination entries, and NEMIS integration for Kenya. Reports are generated automatically with the required formats.'
  },
  {
    question: 'How secure is our student data?',
    answer: 'Student data security is our top priority. We use bank-level encryption, role-based access control, and regular security audits. Data is hosted in secure data centers with automatic backups. We comply with data protection regulations.'
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
    app-id="elimu"
    :is-authenticated="isAuthenticated"
    :user-name="fullName"
    :user-initials="initials"
    :site-url="siteUrl"
    @login="handleLogin"
    @signup="handleGetStarted"
    @logout="handleLogout"
  >
    <HeroSection
      pill="Trusted by 500+ Schools Across Africa"
      :title="appConfig.tagline"
      :subtitle="appConfig.description"
      cta-text="Start Free Trial"
      secondary-cta-text="Watch Demo"
      video-url="https://www.youtube.com/watch?v=crynl8l-Zac"
      gradient-from="from-blue-600"
      gradient-to="to-indigo-700"
      preview-type="lms"
      @cta-click="handleGetStarted"
    />

    <ValuePropsSection :value-props="valueProps" />

    <FeaturesSection
      title="Everything You Need to Run Your School"
      subtitle="Comprehensive tools designed for educational institutions"
      :features="features"
      :columns="3"
    />

    <TestimonialsSection
      title="Trusted by 500+ Schools"
      subtitle="See what school administrators say about ElimuCoreLMS"
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
      subtitle="Everything you need to know about ElimuCoreLMS"
      :faqs="faqs"
    />

    <CTASection
      title="Ready to Transform Your School?"
      subtitle="Join hundreds of schools using ElimuCoreLMS to deliver better education"
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
