export type ServiceDetail = {
  id: string
  code: string
  title: string
  short: string
  price: string
  duration?: string
  durability?: string
  featured?: boolean
  layout: 'wide' | 'narrow' | 'featured'
  overview: string
  includes: string[]
  process: string[]
  idealFor: string
}

export const SERVICES: ServiceDetail[] = [
  {
    id: 'washing',
    code: 'S01 // BASIC CARE',
    title: 'RUČNÍ MYTÍ',
    short:
      'Šetrnost a preciznost v každém detailu. Používáme výhradně pH neutrální chemii a vícestupňovou filtrační technologii vody.',
    price: 'od 1 500 Kč',
    duration: '2–4 hodiny',
    layout: 'wide',
    overview:
      'Kompletní ruční mytí exteriéru i interiéru s důrazem na ochranu laku. Proces je navržený tak, aby eliminoval riziko mikroškrábanců a zároveň odstranil agresivní nečistoty z provozu.',
    includes: [
      'Předmytí aktivní pěnou a vysokotlaké opláchnutí',
      'Dvoukbelíková metoda s pH neutrální chemií',
      'Dekontaminace železitých částic (dle stavu)',
      'Čištění disků, výfuků a detailů karoserie',
      'Sušení mikrovláknem + finální dressing plastů',
      'Vysávání interiéru a ošetření povrchů',
    ],
    process: [
      'Inspekce stavu vozu a laku',
      'Bezpečné předmytí a contact wash',
      'Detailing kol a spodních partií',
      'Sušení a finální kontrola pod světlem',
    ],
    idealFor: 'Pravidelná údržba, vozy před keramikou i denní provoz.',
  },
  {
    id: 'polishing',
    code: 'S02 // CORRECTION',
    title: 'LEŠTĚNÍ LAKU',
    short:
      'Obnova lesku a hloubky laku pomocí víceúrovňového stroje. Odstranění mikroškrábanců a oxidace pro zrcadlový efekt.',
    price: 'od 5 000 Kč',
    duration: '1–3 dny',
    layout: 'narrow',
    overview:
      'Vícekroková korekce laku, která odstraňuje hologramy, swirl marks a oxidaci. Výsledkem je hlubší barva, ostré odrazy a připravený povrch pro dlouhodobou ochranu.',
    includes: [
      'Měření tloušťky laku (DFT)',
      'Dekontaminace a clay bar ošetření',
      '1–3 kroková strojní korekce',
      'Odstranění mikroškrábanců a hologramů',
      'Finální finishing paste pro zrcadlový lesk',
      'Kontrola pod spektrálním osvětlením',
    ],
    process: [
      'Diagnostika laku a mapování vad',
      'Příprava povrchu a maskování',
      'Korekce podle stavu jednotlivých panelů',
      'Finishing a finální inspection',
    ],
    idealFor: 'Vozy se zašlým lakem, před prodejem nebo před keramickou ochranou.',
  },
  {
    id: 'ceramic',
    code: 'S03 // ULTIMATE PROTECTION',
    title: 'KERAMICKÁ OCHRANA',
    short:
      'Dlouhodobá ochrana s tvrdostí 9H+. Vytváří neviditelný štít proti UV záření, chemikáliím a mechanickému poškození s extrémní hydrofobitou.',
    price: 'od 12 000 Kč',
    duration: '2–4 dny',
    durability: 'až 5 let',
    featured: true,
    layout: 'featured',
    overview:
      'Profesionální keramický coating vytváří tvrdý, hydrofobní štít na laku. Usnadňuje údržbu, zvyšuje odolnost vůči UV, chemii i jemnému mechanickému poškozování a zachovává deep gloss efekt.',
    includes: [
      'Kompletní příprava a dekontaminace laku',
      'Korekce laku dle potřeby (doporučeno)',
      'Aplikace profesionálního 9H+ coatingu',
      'Kontrolované vytvrzení ve studiu',
      'Ošetření skel / disků (dle balíčku)',
      'Péče aftercare + instrukce k údržbě',
    ],
    process: [
      'Příprava povrchu na molekulární úroveň',
      'Aplikace coatingu panel po panelu',
      'Leveling a odstranění excess produktu',
      'Curing period a výstupní kontrola',
    ],
    idealFor: 'Nové i renovované vozy, dlouhodobá ochrana investice do laku.',
  },
]
