export const LOGO_URL = '/logo-full.png'

export const HERO_IMAGE_URL = '/images/hero-car.jpg'

export const INSTAGRAM_URL = 'https://www.instagram.com/flexic_cars/'
export const INSTAGRAM_HANDLE = '@flexic_cars'

export const PORTFOLIO_ITEMS = [
  {
    src: '/images/portfolio/01.jpg',
    alt: 'Detailing – precizní péče o lak',
    span: 'col-span-1 sm:col-span-2 md:col-span-7 md:row-span-2 min-h-[220px] sm:min-h-0',
    label: 'PAINT CORRECTION',
  },
  {
    src: '/images/portfolio/02.jpg',
    alt: 'Luxusní vůz po detailingu',
    span: 'col-span-1 sm:col-span-1 md:col-span-5 min-h-[200px] sm:min-h-0',
    label: 'SHOWROOM FINISH',
  },
  {
    src: '/images/portfolio/03.jpg',
    alt: 'Keramická ochrana laku',
    span: 'col-span-1 sm:col-span-1 md:col-span-5 min-h-[200px] sm:min-h-0',
    label: 'CERAMIC COAT',
  },
  {
    src: '/images/portfolio/05.jpg',
    alt: 'Sportovní vůz – finální lesk',
    span: 'col-span-1 sm:col-span-2 md:col-span-4 min-h-[200px] sm:min-h-0',
    label: 'EXTERIOR DETAIL',
  },
  {
    src: '/images/portfolio/04.jpg',
    alt: 'Premium detailing studio work',
    span: 'col-span-1 sm:col-span-1 md:col-span-4 min-h-[200px] sm:min-h-0',
    label: 'STUDIO WORK',
  },
  {
    src: '/images/portfolio/06.jpg',
    alt: 'Finální prezentace vozu',
    span: 'col-span-1 sm:col-span-1 md:col-span-4 min-h-[200px] sm:min-h-0',
    label: 'FINAL REVEAL',
  },
]

export const NAV_LINKS = [
  { href: '#services', label: 'Služby' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#maintenance', label: 'Údržba' },
  { href: '#vouchers', label: 'Poukazy' },
  { href: '#about', label: 'O nás' },
]

export const PHONE_NUMBER = '+420 777 721 795'
export const PHONE_TEL = '+420777721795'
export const CONTACT_EMAIL = 'flexicscarecare@gmail.com'

export const STUDIO_LOCATION = {
  name: 'Hustopeče nad Bečvou',
  postal: '753 66 Hustopeče nad Bečvou',
  lat: 49.556138,
  lng: 17.884966,
  shortLabel: 'HUSTOPEČE NAD BEČVOU',
} as const

export const STUDIO_MAPS_URL = `https://www.google.com/maps?q=${STUDIO_LOCATION.lat},${STUDIO_LOCATION.lng}`
export const STUDIO_MAP_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${STUDIO_LOCATION.lng - 0.02}%2C${STUDIO_LOCATION.lat - 0.012}%2C${STUDIO_LOCATION.lng + 0.02}%2C${STUDIO_LOCATION.lat + 0.012}&layer=mapnik&marker=${STUDIO_LOCATION.lat}%2C${STUDIO_LOCATION.lng}`

export const FOOTER_LINKS = [
  'Terms of Service',
  'Privacy Policy',
  'Technical Specs',
  'Studio Location',
] as const
