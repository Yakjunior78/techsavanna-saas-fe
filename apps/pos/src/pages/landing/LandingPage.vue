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
  DownloadSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  TrustSection,
  usePlans
} from '@techsavanna/ui'
import type { Feature, Testimonial, FAQ, ValueProp } from '@techsavanna/ui'

const router = useRouter()
const appConfig = SAVANNA_APPS.pos
provide('landingAppId', 'pos')
const appDomain = import.meta.env.VITE_POS_DOMAIN || 'saas.techsavanna.technology'
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
    title: 'Always-On Reliability',
    description: 'Your business never sleeps, and neither does our infrastructure. With 99.9% uptime guarantee, you can focus on selling while we handle the technology.',
    features: ['Redundant cloud infrastructure', 'Automatic failover systems', 'Real-time health monitoring', 'Instant incident response']
  },
  {
    icon: 'offline',
    value: 'Offline',
    label: 'Works Without Internet',
    title: 'Sell Anywhere, Anytime',
    description: 'Internet down? No problem. Continue processing sales offline and sync automatically when you\'re back online. Never lose a sale again.',
    features: ['Full offline functionality', 'Automatic data sync', 'Local data storage', 'Seamless reconnection']
  },
  {
    icon: 'secure',
    value: 'PCI-DSS',
    label: 'Bank-Level Security',
    title: 'Enterprise-Grade Security',
    description: 'Your customer data and transactions are protected with the same security standards used by major banks. Sleep easy knowing your business is safe.',
    features: ['AES-256 encryption', 'PCI-DSS compliance', 'Secure payment processing', 'Regular security audits']
  },
  {
    icon: 'fast',
    value: '<3s',
    label: 'Transaction Speed',
    title: 'Lightning-Fast Checkout',
    description: 'Process transactions in under 3 seconds. Handle peak hours with ease and keep your customers happy with quick, efficient service.',
    features: ['Optimized checkout flow', 'Quick product search', 'One-tap payments', 'Barcode scanning']
  }
]

// POS Features
const features: Feature[] = [
  {
    icon: 'cube',
    title: 'Inventory Management',
    description: 'Track stock levels in real-time across all locations. Set low stock alerts, manage expiry dates, and get automatic reorder suggestions to never run out of your best-sellers.',
    highlights: ['Real-time tracking', 'Low stock alerts', 'Expiry management', 'Reorder suggestions'],
    previewType: 'list'
  },
  {
    icon: 'currency-dollar',
    title: 'Sales Management',
    description: 'Process sales quickly with barcode scanning, quick product search, and one-tap payments. Support for M-Pesa, cards, and cash with instant receipt printing.',
    highlights: ['Fast checkout', 'Multiple payment methods', 'Receipt printing', 'Sales history'],
    previewType: 'dashboard'
  },
  {
    icon: 'shopping-cart',
    title: 'Stock Orders & Purchases',
    description: 'Create purchase orders, receive stock, and track supplier payments. Manage your procurement process from order to delivery with full audit trails.',
    highlights: ['Purchase orders', 'Stock receiving', 'Supplier management', 'Cost tracking'],
    previewType: 'form'
  },
  {
    icon: 'clipboard-list',
    title: 'Transfers & Adjustments',
    description: 'Transfer stock between locations, record adjustments for damages or losses, and maintain accurate inventory counts with built-in stocktake tools.',
    highlights: ['Inter-branch transfers', 'Stock adjustments', 'Stocktake tools', 'Movement history'],
    previewType: 'list'
  },
  {
    icon: 'globe',
    title: 'Multi-Shop Management',
    description: 'Manage multiple stores from a single dashboard. Centralized inventory, consolidated reporting, and role-based access for each location.',
    highlights: ['Central dashboard', 'Per-store reports', 'Unified inventory', 'Branch permissions'],
    previewType: 'cards'
  },
  {
    icon: 'chart-bar',
    title: 'Reports & Analytics',
    description: 'Get real-time insights into sales performance, profit margins, and inventory turnover. Export reports for accounting and make data-driven decisions.',
    highlights: ['Sales reports', 'Profit analysis', 'Inventory reports', 'Export to Excel'],
    previewType: 'chart'
  }
]

// Industries we serve
const industries = [
  {
    name: 'General Retail',
    description: 'Supermarkets, convenience stores, and retail shops',
    icon: 'shopping-cart',
    color: 'blue'
  },
  {
    name: 'Bars & Restaurants',
    description: 'Quick service, fine dining, and bar management',
    icon: 'cake',
    color: 'amber'
  },
  {
    name: 'Pharmacy',
    description: 'Medicine tracking, expiry alerts, and compliance',
    icon: 'beaker',
    color: 'blue'
  },
  {
    name: 'Electronics',
    description: 'Serial number tracking and warranty management',
    icon: 'device-mobile',
    color: 'purple'
  },
  {
    name: 'Fashion & Apparel',
    description: 'Size and color variants, seasonal inventory',
    icon: 'sparkles',
    color: 'rose'
  },
  {
    name: 'Hardware & Building',
    description: 'Bulk items, unit conversions, and measurements',
    icon: 'wrench',
    color: 'slate'
  }
]

// Pricing Plans - fetched from backend
const { plans: pricingPlans, fetchPlans } = usePlans()

onMounted(() => {
  fetchPlans('PRODUCT_POS', {
    description: 'Complete POS solution for businesses of all sizes',
    features: [
      'Unlimited POS Terminals',
      'Unlimited products',
      'Inventory management with alerts',
      'Multi-location support',
      'Real-time analytics dashboard',
      'M-Pesa & card payments',
      'Staff management',
      'Customer loyalty program',
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
    name: 'James Mwangi',
    role: 'Owner',
    company: 'Nairobi Supermart',
    quote: 'SavannapayPOS transformed our checkout experience. We reduced queue times by 60% and sales increased by 30% in the first month. The M-Pesa integration is seamless!',
    rating: 5
  },
  {
    name: 'Grace Akinyi',
    role: 'Operations Manager',
    company: 'Kisumu Electronics',
    quote: 'The inventory management features alone saved us 10 hours of work every week. Real-time stock tracking across our 3 branches has been a game-changer.',
    rating: 5
  },
  {
    name: 'David Ochieng',
    role: 'Founder',
    company: 'QuickMart Chain',
    quote: 'We switched from a legacy POS system and the difference is night and day. Staff training took just 2 hours, and the offline mode has saved us during power outages.',
    rating: 5
  },
  {
    name: 'Amina Hassan',
    role: 'Store Manager',
    company: 'Mombasa Fashions',
    quote: 'The analytics dashboard helps me understand exactly which products are moving. I\'ve optimized our inventory and reduced dead stock by 40%.',
    rating: 5
  },
  {
    name: 'Peter Kamau',
    role: 'CEO',
    company: 'FreshMart Groceries',
    quote: 'Customer support is exceptional. Any time we\'ve had questions, the team responds within minutes. It\'s clear they understand retail in Africa.',
    rating: 5
  },
  {
    name: 'Sarah Wanjiku',
    role: 'Owner',
    company: 'Nairobi Pharmacy',
    quote: 'The expiry date tracking feature has prevented significant losses from expired products. SavannapayPOS pays for itself many times over.',
    rating: 5
  }
]

// FAQs
const faqs: FAQ[] = [
  {
    question: 'Can I use SavannapayPOS on my existing hardware?',
    answer: 'Yes! SavannapayPOS works on any tablet, smartphone, or computer with a modern web browser. We also offer recommended hardware bundles optimized for retail use, including receipt printers and barcode scanners.'
  },
  {
    question: 'How does offline mode work?',
    answer: 'Our system caches all necessary data locally on your device. When offline, you can continue processing sales, and everything syncs automatically when connectivity is restored. You\'ll never lose a sale due to internet issues.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level AES-256 encryption for all data in transit and at rest. We\'re PCI-DSS compliant for card payments, and all payment processing is handled by Paystack, a trusted payment provider.'
  },
  {
    question: 'How long does it take to set up?',
    answer: 'Most businesses are up and running within 30 minutes. You can import your existing product catalog via CSV, or manually add products. Our onboarding wizard guides you through every step.'
  },
  {
    question: 'Can I integrate with my accounting software?',
    answer: 'Yes! We integrate with QuickBooks, Xero, Sage, and other popular accounting tools. Enterprise plans also include API access for custom integrations with your existing systems.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support M-Pesa, Airtel Money, T-Kash, Visa, Mastercard, and cash payments. All mobile money and card payments are processed through Paystack with instant settlement available.'
  },
  {
    question: 'Do you offer training and support?',
    answer: 'All plans include access to our knowledge base and email support. Professional plans get priority support with live chat. Enterprise customers receive dedicated account management and on-site training.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no penalties. Your data remains accessible for 30 days after cancellation, and you can export everything before you go.'
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
    app-id="pos"
    :is-authenticated="isAuthenticated"
    :user-name="fullName"
    :user-initials="initials"
    :site-url="siteUrl"
    @login="handleLogin"
    @signup="handleGetStarted"
    @logout="handleLogout"
  >
    <HeroSection
      pill="Trusted by 5,000+ Businesses"
      :title="appConfig.tagline"
      :subtitle="appConfig.description"
      cta-text="Start Free Trial"
      secondary-cta-text="Watch Demo"
      gradient-from="from-blue-600"
      gradient-to="to-indigo-700"
      preview-type="pos"
      video-url="https://www.youtube.com/watch?v=Ikw1EKJduSQ"
      @cta-click="handleGetStarted"
    />

    <ValuePropsSection :value-props="valueProps" />

    <FeaturesSection
      title="Everything You Need to Run Your Store"
      subtitle="Powerful features designed for modern retail businesses"
      :features="features"
      :columns="3"
    />

    <!-- Industries Section -->
    <section class="relative overflow-hidden bg-blue-50/50 py-16 lg:py-24">
      <!-- Dot pattern background -->
      <div class="absolute inset-0 opacity-[0.4]">
        <svg class="size-full">
          <defs>
            <pattern id="industries-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" class="text-blue-200"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#industries-dots)"/>
        </svg>
      </div>

      <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <span class="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Industries
          </span>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Built for Every Business Type
          </h2>
          <p class="mt-3 text-base text-gray-600">
            Whether you run a supermarket, pharmacy, or restaurant, SavannapayPOS adapts to your needs
          </p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(industry, index) in industries"
            :key="index"
            class="group cursor-pointer rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-gray-200 hover:shadow-md"
          >
            <!-- Icon -->
            <div
              class="mb-3 flex size-10 items-center justify-center rounded-lg transition-colors duration-300"
              :class="{
                'bg-blue-50 text-blue-600 group-hover:bg-blue-100': industry.color === 'blue',
                'bg-amber-50 text-amber-600 group-hover:bg-amber-100': industry.color === 'amber',
                'bg-purple-50 text-purple-600 group-hover:bg-purple-100': industry.color === 'purple',
                'bg-rose-50 text-rose-600 group-hover:bg-rose-100': industry.color === 'rose',
                'bg-slate-100 text-slate-600 group-hover:bg-slate-200': industry.color === 'slate'
              }"
            >
              <!-- Shopping Cart -->
              <svg v-if="industry.icon === 'shopping-cart'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <!-- Cake / Restaurant -->
              <svg v-else-if="industry.icon === 'cake'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
              </svg>
              <!-- Beaker / Pharmacy -->
              <svg v-else-if="industry.icon === 'beaker'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
              <!-- Device Mobile / Electronics -->
              <svg v-else-if="industry.icon === 'device-mobile'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              <!-- Sparkles / Fashion -->
              <svg v-else-if="industry.icon === 'sparkles'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <!-- Wrench / Hardware -->
              <svg v-else-if="industry.icon === 'wrench'" class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              </svg>
            </div>

            <!-- Industry Name -->
            <h3 class="mb-1 text-sm font-semibold text-gray-900">
              {{ industry.name }}
            </h3>

            <!-- Description -->
            <p class="text-xs leading-relaxed text-gray-500">{{ industry.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <DownloadSection
      title="Take Your Business Anywhere"
      subtitle="Access your POS system on any device - mobile, tablet, or desktop"
      download-page-url="/download"
      :desktop-coming-soon="true"
    />

    <TestimonialsSection
      title="Trusted by 5,000+ Businesses"
      subtitle="See what store owners and managers say about SavannapayPOS"
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
      subtitle="Everything you need to know about SavannapayPOS"
      :faqs="faqs"
    />

    <CTASection
      title="Ready to Transform Your Business?"
      subtitle="Join thousands of businesses using SavannapayPOS to grow faster"
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
