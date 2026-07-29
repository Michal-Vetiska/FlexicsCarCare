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

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'essential',
    code: 'M01',
    name: 'ESSENTIAL',
    interval: 'měsíčně',
    price: '2 490 Kč',
    desc: 'Pravidelné ruční mytí a základní kontrola povrchu. Ideální pro denní provoz ve městě.',
    features: ['Ruční mytí 2× / měsíc', 'Interiérový dust-off', 'Kontrola laku'],
    overview:
      'Základní maintenance program pro vozy v denním provozu. Udržuje lak čistý, interiér svěží a včas odhalí drobná poškození dřív, než se zhorší.',
    includes: [
      '2× ruční mytí exteriéru měsíčně',
      'Vysávání a dust-off interiéru',
      'Očištění disků a plastů',
      'Vizuální kontrola stavu laku',
      'Základní reporting po každé návštěvě',
      'Flexibilní termíny v rámci měsíce',
    ],
    schedule: [
      'Rezervace termínu v aplikaci / telefonicky',
      'Rychlá inspekce při příjmu vozu',
      'Ruční mytí + interiérový dust-off',
      'Krátký status report a doporučení',
    ],
    idealFor: 'City cars, firemní flotily a majitele, kteří chtějí čistotu bez starostí.',
    commitment: 'Měsíční předplatné, výpověď ke konci měsíce',
  },
  {
    id: 'signature',
    code: 'M02',
    name: 'SIGNATURE',
    interval: 'měsíčně',
    price: '4 900 Kč',
    desc: 'Komplexní péče včetně dekontaminace a oživení lesku. Pro ty, kdo chtějí stálý showroom look.',
    features: ['Full detail 1× / měsíc', 'Leštění selected panels', 'Priority booking'],
    featured: true,
    overview:
      'Kompletní měsíční péče o vůz s důrazem na stálý showroom vzhled. Kombinuje full detailing, lehký polish vybraných panelů a prioritu v rezervačním kalendáři.',
    includes: [
      '1× full exterior + interior detailing měsíčně',
      'Dekontaminace dle stavu laku',
      'Leštění selected panels (dle potřeby)',
      'Dressing plastů, pneumatik a skel',
      'Priority booking do 48 hodin',
      'Měsíční paint condition note',
    ],
    schedule: [
      'Priority slot dle vašeho kalendáře',
      'Kompletní intake a fotodokumentace',
      'Full detail workflow ve studiu',
      'Finální kontrola a předání s reportem',
    ],
    idealFor: 'Majitelé prémiových vozů, kteří chtějí konzistentní deep gloss celý rok.',
    commitment: 'Měsíční předplatné, doporučený minimální běh 3 měsíce',
  },
  {
    id: 'elite',
    code: 'M03',
    name: 'ELITE CARE',
    interval: 'čtvrtletně',
    price: '12 500 Kč',
    desc: 'Premium maintenance program s keramickou údržbou a kompletnim reportingem stavu vozidla.',
    features: ['Ceramic top-up', 'Paint health report', 'Studio pickup'],
    overview:
      'Nejvyšší úroveň péče pro vozy s keramikou nebo high-end lakem. Čtvrtletní deep maintenance, ceramic top-up a detailní paint health report včetně možnosti studio pickup.',
    includes: [
      'Čtvrtletní deep maintenance session',
      'Ceramic top-up / booster dle systému',
      'Kompletní paint health report + DFT poznámky',
      'Studio pickup & return (v dojezdové zóně)',
      'Preferované termíny a dedicated konzultace',
      'Aftercare balíček produktů na údržbu',
    ],
    schedule: [
      'Domluva pickup / dovezení do studia',
      'Diagnostika laku a coatingu',
      'Deep clean + ceramic maintenance',
      'Report, doporučení a předání vozu',
    ],
    idealFor: 'Vozy s keramickou ochranou, sběratelské a high-value automobiles.',
    commitment: 'Čtvrtletní cyklus, individuální smlouva na míru',
  },
]
