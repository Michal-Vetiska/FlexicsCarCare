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

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'washing',
    label: 'MYTÍ',
    code: '01',
    services: [
      {
        id: 'hand-wash',
        code: 'M01',
        title: 'Detailní ruční mytí',
        short: 'Šetrné ruční mytí s aktivní pěnou, sušením a ošetřením pneumatik.',
        price: 'od 790 Kč',
        overview:
          'Kompletní detailní ruční mytí vozu s důrazem na šetrnost k laku. Aktivní pěna, ruční mytí a pečlivé sušení zajistí čistý výsledek bez zbytečných rizik.',
        includes: [
          'Aktivní pěna',
          'Šetrné ruční mytí',
          'Sušení',
          'Ošetření pneumatik',
        ],
        process: [
          'Předmytí aktivní pěnou',
          'Ruční mytí karoserie a disků',
          'Sušení mikrovláknem',
          'Ošetření pneumatik',
        ],
        idealFor: 'Pravidelná údržba a vozy, které potřebují bezpečné a precizní umytí.',
      },
      {
        id: 'paint-prep',
        code: 'M02',
        title: 'Detailní příprava laku',
        short: 'Dekontaminace, odstranění asfaltu a polétavé rzi před leštěním nebo ochranou.',
        price: 'od 2 490 Kč',
        overview:
          'Důkladná příprava laku před leštěním nebo nanesením ochrany. Odstraníme asfalt, polétavou rez a další kontaminaci, aby byl povrch připravený na další kroky.',
        includes: [
          'Dekontaminace',
          'Odstranění asfaltu',
          'Odstranění polétavé rzi',
          'Příprava na leštění nebo nanesení ochrany',
        ],
        process: [
          'Kontrola stavu laku',
          'Chemická a mechanická dekontaminace',
          'Odstranění asfaltu a železitých částic',
          'Finální příprava povrchu',
        ],
        idealFor: 'Vozy před leštěním, keramikou nebo jinou dlouhodobou ochranou.',
      },
    ],
  },
  {
    id: 'interior',
    label: 'INTERIÉR',
    code: '02',
    services: [
      {
        id: 'interior-clean',
        code: 'I01',
        title: 'Detailní čištění',
        short: 'Vysávání, plasty, okna, kufr a čištění koberců pro svěží interiér.',
        price: 'od 2 490 Kč',
        overview:
          'Detailní čištění interiéru od prachu a běžných nečistot. Zahrnuje vysávání, ošetření plastů, oken, kufru i koberců.',
        includes: [
          'Vysávání',
          'Plasty',
          'Okna',
          'Kufr',
          'Čištění koberců atd.',
        ],
        process: [
          'Vysávání celého interiéru a kufru',
          'Čištění a ošetření plastů',
          'Čištění oken',
          'Úprava koberců a finální kontrola',
        ],
        idealFor: 'Pravidelná údržba kabiny a vozy po běžném provozu.',
      },
      {
        id: 'interior-full',
        code: 'I02',
        title: 'Kompletní detailing interiéru',
        short: 'Tepování, strop, sedačky, kůže a impregnace pro kompletní obnovu.',
        price: 'od 3 990 Kč',
        overview:
          'Kompletní detailing interiéru včetně tepování, čištění stropu, sedaček, kůže a finální impregnace. Ideální při silném znečištění nebo sezónní obnově.',
        includes: [
          'Tepování',
          'Strop',
          'Sedačky',
          'Kůže',
          'Impregnace',
        ],
        process: [
          'Demontáž a příprava interiéru',
          'Tepování a hloubkové čištění',
          'Ošetření stropu, sedaček a kůže',
          'Impregnace a finální úprava',
        ],
        idealFor: 'Vozy po zimě, rodinné vozy a interiéry vyžadující hloubkové vyčištění.',
      },
    ],
  },
  {
    id: 'polishing',
    label: 'LEŠTĚNÍ',
    code: '03',
    services: [
      {
        id: 'polish-one',
        code: 'L01',
        title: 'Jednokrokové leštění',
        short: 'Odstranění přibližně 60 % defektů, více lesku a příprava pod keramiku.',
        price: 'od 5 990 Kč',
        overview:
          'Jednokrokové leštění zaměřené na odstranění přibližně 60 % defektů. Zvýší lesk laku, odstraní hologramy a připraví povrch pod keramickou ochranu.',
        includes: [
          'Odstranění hologramů',
          'Zvýšení lesku',
          'Příprava pod keramiku',
        ],
        process: [
          'Diagnostika stavu laku',
          'Jednokroková strojní korekce',
          'Kontrola lesku a odrazů',
          'Příprava na případnou ochranu',
        ],
        idealFor: 'Vozy s mírnými defekty a příprava před keramickou ochranou.',
      },
      {
        id: 'polish-multi',
        code: 'L02',
        title: 'Vícekrokové leštění',
        short: 'Maximální obnova laku — až 95 % škrábanců a hluboký lesk.',
        price: 'od 8 990 Kč',
        overview:
          'Vícekrokové leštění pro maximální obnovu laku. Odstraní až 95 % škrábanců, obnoví hluboký lesk a dokonale připraví povrch na dlouhodobou ochranu.',
        includes: [
          'Odstranění až 95 % škrábanců',
          'Hluboký lesk',
          'Perfektní příprava na ochranu',
        ],
        process: [
          'Mapování defektů a měření laku',
          'Vícekroková korekce panel po panelu',
          'Finishing pro hluboký lesk',
          'Finální kontrola pod světlem',
        ],
        idealFor: 'Silněji poškozený lak, showroom look a příprava na ochranu.',
      },
    ],
  },
]

export const ADDITIONAL_SERVICES: ServiceDetail[] = [
  {
    id: 'headlights',
    code: 'D01',
    title: 'Leštění světlometů',
    short: 'Obnova průhlednosti a vzhledu světlometů.',
    price: 'dle stavu',
    overview:
      'Leštění světlometů obnoví jejich průhlednost, zlepší vzhled vozu i světelný výkon při noční jízdě.',
    includes: [
      'Očištění a příprava světlometů',
      'Leštění zmatnělého povrchu',
      'Finální úprava a ochrana dle potřeby',
    ],
  },
  {
    id: 'ceramic-textile',
    code: 'D02',
    title: 'Keramická ochrana textilu',
    short: 'Ochrana textilních povrchů proti špíně a vlhkosti.',
    price: 'dle rozsahu',
    overview:
      'Keramická ochrana textilu pomáhá odpuzovat nečistoty a vlhkost a usnadňuje následnou údržbu interiérových textilií.',
    includes: [
      'Příprava textilních povrchů',
      'Aplikace keramické ochrany',
      'Kontrola a doporučení k údržbě',
    ],
  },
  {
    id: 'ceramic-leather',
    code: 'D03',
    title: 'Keramická ochrana kůže',
    short: 'Ochrana kožených povrchů a prodloužení jejich životnosti.',
    price: 'dle rozsahu',
    overview:
      'Keramická ochrana kůže pomáhá chránit sedačky a další kožené části před opotřebením, špínou a vysycháním.',
    includes: [
      'Vyčištění a příprava kůže',
      'Aplikace ochranné vrstvy',
      'Finální ošetření a tipy k péči',
    ],
  },
  {
    id: 'ozone',
    code: 'D04',
    title: 'Ozon',
    short: 'Odstranění zápachu a hygienická úprava interiéru.',
    price: 'dle potřeby',
    overview:
      'Ozonová úprava interiéru pomáhá odstranit zápach a zlepšit hygienu kabiny — například po kouření, zvířatech nebo dlouhodobém znečištění.',
    includes: [
      'Příprava interiéru',
      'Ozonová sanitace',
      'Vyvětrání a kontrola výsledku',
    ],
  },
  {
    id: 'soft-top',
    code: 'D05',
    title: 'Impregnace látkové střechy',
    short: 'Obnova voděodolnosti a ochrany látkové střechy.',
    price: 'dle stavu',
    overview:
      'Impregnace látkové střechy obnoví voděodolnost, pomůže chránit materiál a usnadní údržbu kabrioletů a soft-top střech.',
    includes: [
      'Vyčištění látkové střechy',
      'Aplikace impregnace',
      'Kontrola voděodolnosti',
    ],
  },
]

/** Flat list for lookups / modals */
export const SERVICES: ServiceDetail[] = [
  ...SERVICE_CATEGORIES.flatMap((category) => category.services),
  ...ADDITIONAL_SERVICES,
]
