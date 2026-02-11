export interface AppConfig {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  domain: string
  basePath: string
  primaryColor: string
  gradientFrom: string
  gradientTo: string
  icon: string
  logo: string
  logoWhite: string
  logoIcon: string
  logoIconWhite: string
}

const getEnvVar = (key: string, fallback: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as Record<string, string>)[key] || fallback
  }
  return fallback
}

export const SAVANNA_APPS: Record<string, AppConfig> = {
  admin: {
    id: 'admin',
    name: 'TechSavanna Admin',
    shortName: 'Admin',
    tagline: 'Manage Your Savanna Ecosystem',
    description: 'Central administration portal for managing all TechSavanna applications, users, and subscriptions.',
    domain: getEnvVar('VITE_ADMIN_DOMAIN', 'localhost:3000'),
    basePath: '/admin',
    primaryColor: '#1E293B',
    gradientFrom: 'from-slate-700',
    gradientTo: 'to-slate-900',
    icon: 'shield-check',
    logo: '/imgs/Techsavanna/tech_logo_regular.png',
    logoWhite: '/imgs/Techsavanna/tech_logo_white.png',
    logoIcon: '/imgs/Techsavanna/tech_logo_regular.png',
    logoIconWhite: '/imgs/Techsavanna/tech_logo_white.png'
  },
  pos: {
    id: 'pos',
    name: 'SavannapayPOS',
    shortName: 'POS',
    tagline: 'The Perfect POS Solution for Your Business',
    description: 'A flexible, user-friendly solution for seamless transactions, inventory, and customer management on any device.',
    domain: getEnvVar('VITE_POS_DOMAIN', 'localhost:3001'),
    basePath: '/pos',
    primaryColor: '#0f62ae',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-500',
    icon: 'credit-card',
    logo: '/imgs/SavannapayPOS/regular.png',
    logoWhite: '/imgs/SavannapayPOS/white.png',
    logoIcon: '/imgs/SavannapayPOS/icon_1.png',
    logoIconWhite: '/imgs/SavannapayPOS/icon white.png'
  },
  people: {
    id: 'people',
    name: 'WorkwiseHRM',
    shortName: 'HRM',
    tagline: 'Grow and Evolve with Your Business Needs',
    description: 'WorkWise HRM streamlines employee management with tools for payroll, benefits, onboarding, time tracking, and performance, ensuring efficiency and compliance.',
    domain: getEnvVar('VITE_PEOPLE_DOMAIN', 'localhost:3002'),
    basePath: '/people',
    primaryColor: '#6366F1',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-purple-500',
    icon: 'users',
    logo: '/imgs/WorkwiseHRM/workwise_regular.png',
    logoWhite: '/imgs/WorkwiseHRM/workwise_white.png',
    logoIcon: '/imgs/WorkwiseHRM/workwise_icon_regular.png',
    logoIconWhite: '/imgs/WorkwiseHRM/workwise_icon_white.png'
  },
  elimu: {
    id: 'elimu',
    name: 'ElimuCoreLMS',
    shortName: 'LMS',
    tagline: 'Complete School Management System',
    description: 'Transform your educational institution with comprehensive ERP for admissions, academics, finance, and administration.',
    domain: getEnvVar('VITE_ELIMU_DOMAIN', 'localhost:3003'),
    basePath: '/elimu',
    primaryColor: '#F59E0B',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-500',
    icon: 'academic-cap',
    logo: '/imgs/ElimucoreLMS/elimucore_regular.png',
    logoWhite: '/imgs/ElimucoreLMS/elimucore_white.png',
    logoIcon: '/imgs/ElimucoreLMS/elimucore_icon_regular.png',
    logoIconWhite: '/imgs/ElimucoreLMS/elimucore_icon_white.png'
  },
  erp: {
    id: 'erp',
    name: 'Savanna360ERP',
    shortName: 'ERP',
    tagline: 'The Ultimate ERP Solution for Your Business',
    description: 'The comprehensive ERP solution that streamlines operations, integrates all business functions, and drives efficiency for your growth.',
    domain: getEnvVar('VITE_ERP_DOMAIN', 'localhost:3004'),
    basePath: '/erp',
    primaryColor: '#8B5CF6',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-600',
    icon: 'building-office',
    logo: '/imgs/Savanna360/erp_regular.png',
    logoWhite: '/imgs/Savanna360/erp_white.png',
    logoIcon: '/imgs/Savanna360/erp_icon_regular.png',
    logoIconWhite: '/imgs/Savanna360/erp_icon_white.png'
  }
} as const

export type AppId = keyof typeof SAVANNA_APPS

export function getAppUrl(appId: AppId, path: string = ''): string {
  const app = SAVANNA_APPS[appId]
  const isProduction = typeof import.meta !== 'undefined' && import.meta.env?.PROD
  const protocol = isProduction ? 'https' : 'http'
  return `${protocol}://${app.domain}${path}`
}

export function getCurrentApp(): AppConfig | undefined {
  if (typeof window === 'undefined') return undefined
  const hostname = window.location.hostname
  const port = window.location.port
  const hostWithPort = port ? `${hostname}:${port}` : hostname

  return Object.values(SAVANNA_APPS).find(app =>
    app.domain === hostWithPort ||
    app.domain === hostname ||
    hostWithPort.includes(app.id)
  )
}

export function getOtherApps(currentAppId: AppId): AppConfig[] {
  return Object.values(SAVANNA_APPS).filter(app => app.id !== currentAppId)
}
