export type NavLink = {
  href: string
  label: string
}

export type ServiceDetail = {
  id: string
  code: string
  title: string
  short: string
  price: string
  overview: string
  includes: string[]
  process?: string[]
  idealFor?: string
}

export type ServiceCategory = {
  id: string
  label: string
  code: string
  services: ServiceDetail[]
}

export type PortfolioItem = {
  id: string
  src: string
  alt: string
  span: string
  label: string
}

export type MaintenancePlan = {
  id: string
  code: string
  name: string
  interval: string
  price: string
  desc: string
  features: string[]
  featured?: boolean
  overview: string
  includes: string[]
  schedule: string[]
  idealFor: string
  commitment: string
}

export type SiteContent = {
  meta: {
    title: string
    logoUrl: string
  }
  nav: {
    links: NavLink[]
    bookLabel: string
  }
  contact: {
    phoneNumber: string
    phoneTel: string
    email: string
    instagramUrl: string
    instagramHandle: string
    location: {
      name: string
      postal: string
      lat: number
      lng: number
      shortLabel: string
    }
  }
  hero: {
    eyebrow: string
    headlineLine1: string
    headlineLine2: string
    body: string
    cta: string
    locationEyebrow: string
    imageUrl: string
    kineticText: string
  }
  services: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    intro: string
    additionalTitle: string
    categories: ServiceCategory[]
    additional: ServiceDetail[]
  }
  portfolio: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    intro: string
    ctaLabel: string
    items: PortfolioItem[]
  }
  maintenance: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    intro: string
    plans: MaintenancePlan[]
  }
  vouchers: {
    eyebrow: string
    title: string
    cardTagline: string
    voucherId: string
    cardTitle: string
    cardBody: string
    cta: string
    validity: string
  }
  about: {
    eyebrow: string
    title: string
    body1: string
    body2: string
    studioLabel: string
    mapCta: string
    stats: { value: string; label: string }[]
  }
  footer: {
    brand: string
    tagline: string
    links: { label: string; href: string }[]
    copyrightSuffix: string
    creditName: string
    creditUrl: string
  }
  booking: {
    title: string
    subtitle: string
    phoneLabel: string
    emailLabel: string
    nameLabel: string
    messageLabel: string
    submitLabel: string
  }
}
