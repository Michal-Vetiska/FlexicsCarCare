/**
 * Jediný zdroj pravdy pro ceník. Používá se na stránce Ceník i v Rezervaci (výběr služby).
 * ID slouží pro URL parametr ?sluzba= při přechodu na rezervaci.
 */

export const exteriorPackages = [
  {
    id: 'exterier-1',
    name: 'Exteriér 1',
    priceL: '500 Kč',
    priceXL: '800 Kč',
    description: 'Kompletní ruční umytí karoserie s aktivní pěnou, vypláchnutí podběhů a umytí kol.',
    extras: [
      'Chemická dekontaminace laku – 500 Kč',
      'Nanesení nanokeramického vosku na karoserii – 1 000 Kč',
      'Umýtí mezidveřových prostor – 200 Kč',
      'Lehké přeleštění malých odřených míst – 1 000 Kč',
      'Nanesení keramických tekutých stěračů – 800 Kč',
    ],
  },
  {
    id: 'exterier-2',
    name: 'Exteriér 2',
    priceL: '2 000 Kč',
    priceXL: '2 500 Kč',
    description:
      'Kompletní ruční umytí karoserie s aktivní pěnou, ruční umytí kol, chemická dekontaminace laku, lehké přeleštění malých odřených míst, vypláchnutí podběhů a oživení pneumatik i mezidveřních prostor.',
    extras: [
      'Nanesení nanokeramického vosku na karoserii – 1 000 Kč',
      'Nanesení keramických tekutých stěračů – 800 Kč',
    ],
  },
  {
    id: 'exterier-3',
    name: 'Exteriér 3',
    priceL: '5 000 Kč',
    priceXL: '7 000 Kč',
    description:
      'Kompletní ruční umytí karoserie s aktivní pěnou, ruční umytí kol, vypláchnutí podběhů, chemická a mechanická dekontaminace laku, 1krokové leštění karoserie a nanesení vosku.',
    extras: [
      'Nanesení keramické ochrany (více v sekci keramických ochran) – od 1 500 Kč',
      'Nanesení keramických tekutých stěračů – 800 Kč',
    ],
  },
  {
    id: 'exterier-4',
    name: 'Exteriér 4',
    priceL: '8 000 Kč',
    priceXL: '10 000 Kč',
    description:
      'Kompletní ruční umytí karoserie s aktivní pěnou, ruční mytí kol, vypláchnutí podběhů, chemická a mechanická dekontaminace laku, 2krokové leštění karoserie a nanesení vosku.',
    extras: [
      'Nanesení keramické ochrany – od 1 500 Kč',
      'Nanesení keramických tekutých stěračů – 800 Kč',
    ],
  },
  {
    id: 'exterier-5',
    name: 'Exteriér 5',
    priceL: 'od 12 000 Kč',
    priceXL: 'od 13 000 Kč',
    description:
      'Kompletní ruční umytí karoserie s aktivní pěnou, ruční mytí kol, chemická a mechanická dekontaminace laku, vícekrokové leštění karoserie a nanesení vosku, vypláchnutí podběhů.',
    extras: [
      'Nanesení keramické ochrany – od 1 500 Kč',
      'Nanesení keramických tekutých stěračů – 800 Kč',
    ],
  },
]

export const interiorPackages = [
  {
    id: 'interier-1',
    name: 'Interiér 1',
    priceL: '1 500 Kč',
    priceXL: '2 200 Kč',
    description:
      'Detailní luxování interiéru vč. zavazadlového prostoru a koberečků, umytí plastů, ochrana a jejich vyživení, vyleštění oken, vyčištění kůže a následná impregnace, vyčištění stropnice.',
    extras: [
      'Dezinfekce ozónem – 500 Kč',
      'Tepování sedaček, koberců a tapce – 1 100 Kč',
      'Pejsek v autě – 700 Kč',
    ],
  },
  {
    id: 'interier-2',
    name: 'Interiér 2',
    priceL: '2 500 Kč',
    priceXL: '3 200 Kč',
    description:
      'Detailní luxování interiéru vč. zavazadlového prostoru a koberečků, umytí a ochrana vč. vyživení plastů, vyleštění oken, mokré čištění sedaček, koberečků a tapce, vyčištění kožených ploch a impregnace, vyčištění stropnice.',
    extras: [
      'Dezinfekce ozónem – 500 Kč',
      'Impregnace kůže keramickou ochranou – 900 Kč',
      'Pejsek v autě – 700 Kč',
    ],
  },
]

export const ceramicPackages = [
  {
    id: 'keramika-rychla',
    name: 'Rychlá nanokeramická ochrana',
    subtitle: '1 roční profesionální nanokeramický vosk',
    priceL: '1 000 Kč',
    priceXL: '1 500 Kč',
    description:
      'Chrání před vnějším znečištěním (ptačí trus, posypová sůl či déšť) a zajišťuje vysokou hydrofobnost.',
    extra: 'Doplňkové služby: nanesení keramických tekutých stěračů od 800 Kč.',
  },
  {
    id: 'keramika-1',
    name: 'Keramická ochrana 1',
    subtitle: '1 roční profesionální nanokeramická ochrana – lesk a hydrofobnost',
    priceL: '1 500 Kč',
    priceXL: '2 500 Kč',
    description:
      'Chrání před drobnými škrábanci, UV paprsky, chemikáliemi a vnějším znečištěním (ptačí trus), posypovou solí či deštěm.',
    extra: 'Doplňkové služby: nanesení keramických tekutých stěračů od 800 Kč.',
  },
  {
    id: 'keramika-2',
    name: 'Keramická ochrana 2',
    subtitle: '1,5 letá profesionální nanokeramická ochrana s tvrdostí 9H',
    priceL: '2 500 Kč',
    priceXL: '3 500 Kč',
    description:
      'Chrání před drobnými škrábanci, UV paprsky, chemikáliemi a vnějším znečištěním (ptačí trus), posypovou solí či deštěm.',
    extra: 'Doplňkové služby: nanesení keramických tekutých stěračů od 800 Kč.',
  },
  {
    id: 'keramika-3',
    name: 'Keramická ochrana 3',
    subtitle: '3 letá profesionální nanokeramická ochrana s tvrdostí 10H',
    priceL: '4 000 Kč',
    priceXL: '5 000 Kč',
    description:
      'Chrání před drobnými škrábanci, UV paprsky, chemikáliemi a vnějším znečištěním (ptačí trus), posypovou solí či deštěm.',
    extra: 'Doplňkové služby: nanesení keramických tekutých stěračů.',
  },
  {
    id: 'keramika-4',
    name: 'Keramická ochrana 4',
    subtitle: '5 letá profesionální nanokeramická ochrana s tvrdostí 10H',
    priceL: '11 000 Kč',
    priceXL: '12 500 Kč',
    description:
      'Maximální dlouhodobá ochrana laku před drobnými škrábanci, UV paprsky, chemikáliemi a vnějším znečištěním.',
    extra: 'Doplňkové služby: nanesení keramických tekutých stěračů od 800 Kč.',
  },
  {
    id: 'keramika-kuze',
    name: 'Nanokeramická ochrana kůže',
    subtitle: '1 roční profesionální nanokeramická ochrana na kožené povrchy',
    priceL: '1 200 Kč',
    priceXL: '1 700 Kč',
    description:
      'Chrání kožené povrchy před skvrnami od tekutin či jiného znečištění a prodlužuje životnost kožených komponentů.',
  },
  {
    id: 'keramika-plast',
    name: 'Nanokeramická ochrana plastu',
    subtitle: '2 letá profesionální nanokeramická ochrana s tvrdostí 7H na plasty',
    priceL: '1 200 Kč',
    priceXL: '1 700 Kč',
    description:
      'Chrání vnitřní i venkovní plasty před drobnými škrábanci, UV paprsky, chemikáliemi a vnějším znečištěním.',
  },
  {
    id: 'keramika-svetlomety',
    name: 'Renovace světlometů s keramickou ochranou',
    subtitle: '3 leté profesionální oživení a ochrana světlometů',
    priceL: '1 000 Kč',
    priceXL: '1 000 Kč',
    description:
      'Zlepšuje viditelnost, chrání před UV zářením a brání oxidaci a žloutnutí světlometů.',
  },
]

export const polishingLevels = [
  { title: '1 krok', text: 'Odstranění jemných škrábanců, hologramů a sluníček, oživení lesku.' },
  { title: '2 kroky', text: 'Odstranění hrubších defektů na laku a doleštění do vysokého lesku.' },
  {
    title: 'Vícekrokové leštění',
    text: 'Maximální odstranění defektů v rozsahu, který dovolí tloušťka laku, leštění do extrémního lesku.',
  },
]

/** Všechny služby pro výběr v rezervaci (id + name). */
export function getAllBookableServices() {
  const from = (arr) => arr.map((p) => ({ id: p.id, name: p.name }))
  return [...from(exteriorPackages), ...from(interiorPackages), ...from(ceramicPackages)]
}
