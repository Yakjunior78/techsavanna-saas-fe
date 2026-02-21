<script setup lang="ts">
import { onMounted, computed, provide } from 'vue'
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
const appConfig = SAVANNA_APPS.erp
provide('landingAppId', 'erp')
const appDomain = import.meta.env.VITE_ERP_DOMAIN || 'saas.techsavanna.technology'
const { isAuthenticated, fullName, initials, user, logout } = useAuth()

const siteUrl = computed(() => {
  const tenantName = user.value?.tenantName
  const subdomain = tenantName ? slugify(tenantName) : ''
  return subdomain ? `https://${subdomain}.${appDomain}` : ''
})

// Value Propositions
const valueProps: ValueProp[] = [
  {
    icon: 'uptime',
    value: '99.9%',
    label: 'Uptime Guaranteed',
    title: 'Enterprise-Grade Reliability',
    description: 'Your operations run 24/7, and so does our platform. With 99.9% uptime guarantee backed by SLA, you can trust your business-critical processes to always be available.',
    features: ['Redundant infrastructure', 'Auto-scaling capacity', 'Real-time monitoring', 'Disaster recovery']
  },
  {
    icon: 'cloud',
    value: 'Real-time',
    label: 'Cloud Sync',
    title: 'Always In Sync',
    description: 'All your data synchronized across locations in real-time. Whether you have one office or fifty, everyone works with the same up-to-date information.',
    features: ['Instant data sync', 'Multi-location support', 'Conflict resolution', 'Offline capability']
  },
  {
    icon: 'secure',
    value: 'SOC 2',
    label: 'Compliance Ready',
    title: 'Bank-Level Security & Compliance',
    description: 'SOC 2 Type II certified with enterprise security controls. Your financial data is protected with the highest industry standards.',
    features: ['SOC 2 Type II certified', 'AES-256 encryption', 'Role-based access', 'Audit trails']
  },
  {
    icon: 'globe',
    value: 'Multi',
    label: 'Currency Support',
    title: 'Global Business Ready',
    description: 'Operate across borders with multi-currency support, automatic exchange rate updates, and consolidated reporting in your base currency.',
    features: ['50+ currencies supported', 'Auto exchange rates', 'Multi-company consolidation', 'Regional tax compliance']
  }
]

// ERP Features
const features: Feature[] = [
  {
    icon: 'calculator',
    title: 'Accounting & Finance',
    description: 'Complete financial management with general ledger, accounts payable/receivable, multi-currency support, and automated bank reconciliation. Generate financial statements with one click.',
    highlights: ['General ledger', 'AP/AR management', 'Bank reconciliation', 'Financial reports'],
    previewType: 'dashboard'
  },
  {
    icon: 'cube',
    title: 'Inventory Management',
    description: 'Real-time inventory tracking across multiple warehouses with automated reorder points, batch tracking, and barcode scanning. Never run out of stock or overstock again.',
    highlights: ['Multi-warehouse', 'Auto reorder', 'Batch tracking', 'Barcode scanning'],
    previewType: 'list'
  },
  {
    icon: 'shopping-cart',
    title: 'Procurement',
    description: 'Streamline purchasing with vendor management, purchase orders, approval workflows, and supplier performance tracking. Compare quotes and track deliveries in one place.',
    highlights: ['Vendor management', 'PO automation', 'Approval workflows', 'Quote comparison'],
    previewType: 'form'
  },
  {
    icon: 'users',
    title: 'Customer Relationship Management',
    description: 'Manage leads, opportunities, and customer interactions. Track sales pipelines and automate follow-ups for better conversions. 360-degree view of every customer.',
    highlights: ['Lead tracking', 'Sales pipeline', 'Auto follow-ups', 'Customer 360°'],
    previewType: 'cards'
  },
  {
    icon: 'clipboard-list',
    title: 'Project Management',
    description: 'Plan, execute, and monitor projects with task management, resource allocation, time tracking, and budget controls. Keep projects on time and on budget.',
    highlights: ['Task management', 'Resource planning', 'Time tracking', 'Budget control'],
    previewType: 'chart'
  },
  {
    icon: 'chart-pie',
    title: 'Business Intelligence',
    description: 'Powerful dashboards and reports with real-time KPIs, customizable analytics, and data-driven insights for strategic decisions. Visualize your business performance at a glance.',
    highlights: ['Real-time KPIs', 'Custom dashboards', 'Trend analysis', 'Export reports'],
    previewType: 'dashboard'
  }
]

// Pricing Plans - fetched from backend
const { plans: pricingPlans, fetchPlans } = usePlans()

onMounted(() => {
  fetchPlans('PRODUCT_ERP_SUITE', {
    description: 'Complete ERP solution for enterprises of all sizes',
    features: [
      'Unlimited users',
      'Full accounting suite',
      'Advanced inventory & warehousing',
      'Procurement & vendor management',
      'CRM module',
      'Custom reports & dashboards',
      'Custom workflows & automation',
      'API access & integrations',
      'Priority support'
    ],
    featured: true,
    ctaText: 'Start Free Trial',
    trialDays: 14
  })
})

// Testimonials
const testimonials: Testimonial[] = [
  {
    name: 'George Njuguna',
    role: 'CIO',
    company: 'Safaricom PLC',
    quote: 'TechSavanna has provided us with exceptional service. Their team was incredibly knowledgeable and professional, delivering a solution tailored to our unique needs. We have been able to efficiently manage our operations in a manner that is both cost-effective and secure.',
    rating: 5
  },
  {
    name: 'Margaret Wambui',
    role: 'Chief Financial Officer',
    company: 'Nairobi Manufacturing Ltd',
    quote: 'Savanna360ERP transformed our financial operations. We reduced month-end closing from 10 days to just 2 days. The multi-currency support is perfect for our export business.',
    rating: 5
  },
  {
    name: 'Samuel Oduya',
    role: 'Operations Director',
    company: 'East Africa Distributors',
    quote: 'Managing inventory across 5 warehouses was a nightmare before Savanna360ERP. Now we have real-time visibility and reduced stockouts by 60%. The procurement module alone saved us millions.',
    rating: 5
  },
  {
    name: 'Fatima Ahmed',
    role: 'CFO',
    company: 'Mombasa Trading Company',
    quote: 'The business intelligence dashboards give me instant insights into our performance. I can make data-driven decisions without waiting for manual reports. Game-changer for our business.',
    rating: 5
  },
  {
    name: 'Joseph Kiprop',
    role: 'Managing Director',
    company: 'Highland Agro Industries',
    quote: 'Implementation was smooth and the team understood our unique requirements. The system now handles our entire supply chain from farm to market. Highly recommended for agribusiness.',
    rating: 5
  },
  {
    name: 'Grace Mutua',
    role: 'Head of Operations',
    company: 'Savannah Healthcare Group',
    quote: 'The project management module helped us track construction of 3 new clinics simultaneously. Budget tracking and resource allocation are now seamless. Excellent support team too.',
    rating: 5
  },
  {
    name: 'Bernard Otieno',
    role: 'Group CFO',
    company: 'Lakeside Enterprises',
    quote: 'Multi-company consolidation used to take our team weeks. With Savanna360ERP, we generate consolidated reports in minutes. The ROI was evident within the first quarter.',
    rating: 5
  }
]

// FAQs
const faqs: FAQ[] = [
  {
    question: 'How long does ERP implementation typically take?',
    answer: 'Implementation timelines vary based on your organization\'s size and complexity. For small businesses, we can have you up and running in 2-4 weeks. Medium enterprises typically take 6-12 weeks, while large organizations with custom requirements may need 3-6 months. Our phased approach ensures minimal disruption to your operations.'
  },
  {
    question: 'Can Savanna360ERP integrate with our existing systems?',
    answer: 'Yes! We offer robust API integrations with popular tools including banking systems, payment gateways (M-Pesa, Paystack), e-commerce platforms, and productivity tools. Our Business and Enterprise plans include API access for custom integrations with your existing systems.'
  },
  {
    question: 'How do you handle data migration from our current system?',
    answer: 'Our implementation team provides comprehensive data migration support. We\'ll help you export data from your current system, clean and transform it, then import into Savanna360ERP. We support migrations from spreadsheets, QuickBooks, Sage, SAP, and other ERP systems.'
  },
  {
    question: 'Is our financial data secure?',
    answer: 'Absolutely. We use bank-level AES-256 encryption for all data in transit and at rest. Our infrastructure is hosted on AWS with SOC 2 Type II compliance. We perform regular security audits, and your data is backed up multiple times daily with point-in-time recovery options.'
  },
  {
    question: 'Do you support multi-currency and multi-company operations?',
    answer: 'Yes! Savanna360ERP fully supports multi-currency transactions with automatic exchange rate updates. Our Enterprise plan includes multi-company support with inter-company transactions and consolidated financial reporting across all your entities.'
  },
  {
    question: 'What training and support do you provide?',
    answer: 'All plans include access to our comprehensive knowledge base, video tutorials, and email support. Business plans get priority support with live chat. Enterprise customers receive dedicated account management, on-site training, and customized training programs for your team.'
  },
  {
    question: 'Can we customize workflows and reports?',
    answer: 'Business and Enterprise plans include customizable workflows and approval processes. You can create custom fields, modify forms, and build your own reports and dashboards. Enterprise customers can also request custom module development for unique business requirements.'
  },
  {
    question: 'What happens if we need to scale up or add modules later?',
    answer: 'Savanna360ERP is designed to grow with your business. You can easily upgrade your plan or add new modules at any time. Your data and configurations remain intact, and new features are available immediately after upgrade. No data migration needed within our platform.'
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
    app-id="erp"
    :is-authenticated="isAuthenticated"
    :user-name="fullName"
    :user-initials="initials"
    :site-url="siteUrl"
    @login="handleLogin"
    @signup="handleGetStarted"
    @logout="handleLogout"
  >
    <HeroSection
      pill="Enterprise-Grade ERP Solution"
      :title="appConfig.tagline"
      :subtitle="appConfig.description"
      cta-text="Start Free Trial"
      secondary-cta-text="Watch Demo"
      video-url="https://www.youtube.com/watch?v=crynl8l-Zac"
      gradient-from="from-blue-600"
      gradient-to="to-indigo-700"
      preview-type="erp"
      @cta-click="handleGetStarted"
    />

    <ValuePropsSection :value-props="valueProps" />

    <FeaturesSection
      title="Complete Enterprise Resource Planning"
      subtitle="Powerful modules designed for businesses of all sizes"
      :features="features"
      :columns="3"
    />

    <TestimonialsSection
      title="Trusted by Leading Enterprises"
      subtitle="See how CFOs and operations leaders are transforming their businesses"
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
      subtitle="Everything you need to know about Savanna360ERP implementation and features"
      :faqs="faqs"
    />

    <CTASection
      title="Ready to Transform Your Enterprise?"
      subtitle="Join hundreds of businesses using Savanna360ERP to streamline operations and accelerate growth"
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
