export const PHONE_DISPLAY = "01001050018";
export const PHONE_TEL = "+201001050018";
export const WHATSAPP_NUMBER = "201001050018";
export const LEADS_EMAIL = "leads@grandeur-spaces.com";

export type Locale = "ar" | "en";
type T = { ar: string; en: string };

/* ---------- Units (shared data, localized labels) ---------- */
export type Unit = {
  id: string;
  kind: "townhouse" | "villa";
  img: string;
  name: string; // kept in English on both pages
  price: number; // from / average price in EGP
  priceTo?: number;
  priceType: "from" | "avg";
  finishing: "ff" | "cs";
  land: string;
  bua: string;
  penthouse: string;
  pergola?: string;
  roof: string;
  beds: number;
  bedsDetail: T;
  extras: T;
};

export const units: Unit[] = [
  {
    id: "th-middle",
    kind: "townhouse",
    img: "/images/render-6.jpg",
    name: "Townhouse Middle",
    price: 32_600_000,
    priceTo: 33_000_000,
    priceType: "from",
    finishing: "ff",
    land: "212",
    bua: "200.72",
    penthouse: "31.71",
    pergola: "28.87",
    roof: "44",
    beds: 3,
    bedsDetail: { ar: "ماستر + 2 غرف", en: "1 master + 2 bedrooms" },
    extras: { ar: "ليفينج وغرفة مربية", en: "Living & nanny room" },
  },
  {
    id: "th-corner",
    kind: "townhouse",
    img: "/images/render-5.jpg",
    name: "Townhouse Corner",
    price: 34_000_000,
    priceTo: 34_600_000,
    priceType: "from",
    finishing: "ff",
    land: "215.5",
    bua: "210.81",
    penthouse: "30.24",
    pergola: "10.77",
    roof: "56.5",
    beds: 3,
    bedsDetail: { ar: "ماستر + 2 غرف", en: "1 master + 2 bedrooms" },
    extras: { ar: "ليفينج وغرفة مربية", en: "Living & nanny room" },
  },
  {
    id: "villa-4",
    kind: "villa",
    img: "/images/render-3.jpg",
    name: "Villa Type 4",
    price: 37_000_000,
    priceType: "avg",
    finishing: "cs",
    land: "281.6",
    bua: "239.91",
    penthouse: "38.77",
    roof: "69.3",
    beds: 4,
    bedsDetail: { ar: "2 ماستر + 2 غرف", en: "2 master + 2 bedrooms" },
    extras: { ar: "ليفينج ومربية وسائق", en: "Living, nanny & driver rooms" },
  },
  {
    id: "villa-3",
    kind: "villa",
    img: "/images/render-2.jpg",
    name: "Villa Type 3",
    price: 39_000_000,
    priceType: "avg",
    finishing: "cs",
    land: "298.9",
    bua: "246.15",
    penthouse: "34.91",
    roof: "74.73",
    beds: 4,
    bedsDetail: { ar: "2 ماستر + 2 غرف", en: "2 master + 2 bedrooms" },
    extras: { ar: "ليفينج ومربية وسائق", en: "Living, nanny & driver rooms" },
  },
  {
    id: "villa-1",
    kind: "villa",
    img: "/images/render-4.jpg",
    name: "Villa Type 1",
    price: 53_000_000,
    priceTo: 62_000_000,
    priceType: "from",
    finishing: "cs",
    land: "420 – 470",
    bua: "313.67",
    penthouse: "44.69",
    pergola: "25.53",
    roof: "79.29",
    beds: 4,
    bedsDetail: { ar: "3 ماستر + غرفة", en: "3 master + 1 bedroom" },
    extras: { ar: "ليفينج ومربية وسائق ومصعد", en: "Living, nanny, driver & elevator" },
  },
  {
    id: "villa-5",
    kind: "villa",
    img: "/images/render-6.jpg",
    name: "Villa Type 5",
    price: 66_000_000,
    priceTo: 77_000_000,
    priceType: "from",
    finishing: "cs",
    land: "545 – 596",
    bua: "428.04",
    penthouse: "46.2",
    pergola: "30.01",
    roof: "103.89",
    beds: 6,
    bedsDetail: { ar: "6 غرف ماستر", en: "6 master bedrooms" },
    extras: { ar: "ليفينج ومربية وسائق ومصعد", en: "Living, nanny, driver & elevator" },
  },
];

export const fmt = (n: number) => n.toLocaleString("en-US");

/** Wrap numeric ranges ("212 – 215.5") in Unicode LTR isolates so they don't flip inside Arabic text. */
export const iso = (s: string) => s.replace(/(\d[\d.,]*\s*[–-]\s*\d[\d.,]*)/g, "\u2066$1\u2069");

function isoDeep<T>(v: T): T {
  if (typeof v === "string") return iso(v) as T;
  if (Array.isArray(v)) return v.map(isoDeep) as T;
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "src" || k === "href" || k === "img" ? x : isoDeep(x)])) as T;
  }
  return v;
}

/* ---------- Page dictionary ---------- */
type KV = { k: string; v: string };

export type Dict = {
  locale: Locale;
  dir: "rtl" | "ltr";
  seo: { title: string; description: string; keywords: string[]; ogLocale: string };
  brand: { name: string; by: string; agent: string };
  nav: { label: string; href: string }[];
  ctaNow: string;
  langSwitch: { label: string; href: string };
  hero: {
    badge: string;
    eyebrow: string;
    title: string;
    lead: string;
    fromPrice: string;
    leadEnd: string;
    ctaPrices: string;
    ctaWhatsapp: string;
    stats: { value: string; label: string }[];
    note: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    interestLabel: string;
    chips: string[];
    whatsapp: string;
    call: string;
    email: string;
    fine: string;
    waGreeting: string;
    waInterest: string;
  };
  products: {
    eyebrow: string;
    title: string;
    text: string;
    items: {
      eyebrow: string;
      name: string;
      sub: string;
      img: string;
      alt: string;
      text: string;
      bullets: string[];
      stats: KV[];
      cta: string;
      filter: "townhouse" | "villa";
    }[];
  };
  unitsSec: {
    eyebrow: string;
    title: string;
    text: string;
    filters: { id: "all" | "townhouse" | "villa"; label: string }[];
    sortLow: string;
    sortDefault: string;
    swipe: string;
    kindLabel: { townhouse: string; villa: string };
    kindBadge: { townhouse: string; villa: string };
    finishing: { ff: string; cs: string };
    kLand: string;
    kBua: string;
    kRoof: string;
    kFinishing: string;
    kPenthouse: string;
    kPergola: string;
    kBeds: string;
    kExtras: string;
    bedsWord: string;
    sqm: string;
    from: string;
    avg: string;
    details: string;
    installment: string;
    note: string;
  };
  compare: {
    eyebrow: string;
    title: string;
    text: string;
    colA: { eyebrow: string; name: string };
    colB: { eyebrow: string; name: string };
    rowLabel: string;
    rows: { k: string; a: string; b: string }[];
    cta: string;
  };
  calc: {
    eyebrow: string;
    title: string;
    text: string;
    unitLabel: string;
    downLabel: string;
    downHint: string;
    freqLabel: string;
    quarterly: string;
    monthly: string;
    down: string;
    second: string;
    count: string;
    years: string;
    yearsWord: string;
    instQuarter: string;
    instMonth: string;
    currency: string;
    cta: string;
  };
  lifestyle: { eyebrow: string; title: string; text: string; items: { title: string; text: string }[] };
  numbers: { eyebrow: string; title: string; text: string; items: { value: string; text: string }[] };
  masterplan: { eyebrow: string; title: string; text: string; alt: string; rows: KV[] };
  why: { eyebrow: string; title: string; text: string; items: { num: string; unit: string; title: string; text: string }[] };
  developer: { eyebrow: string; title: string; text: string; blocks: { title: string; text: string }[]; cta: string; alt: string };
  gallery: { eyebrow: string; title: string; text: string; items: { src: string; alt: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  lead: {
    eyebrow: string;
    title: string;
    text: string;
    bullets: string[];
    phoneLabel: string;
    emailLabel: string;
    name: string;
    phone: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    or: string;
  };
  modal: { eyebrow: string; title: string; text: string; close: string };
  footer: { address: string; contactTitle: string; linksTitle: string; whatsapp: string; links: { id: "about" | "privacy" | "disclaimer"; label: string }[]; disclaimer: string; copy: string };
  legal: { about: string; privacy: string; disclaimer: string };
  cookie: { text: string; accept: string };
};

const GALLERY = [
  "/images/render-4.jpg",
  "/images/masterplan.jpg",
  "/images/render-6.jpg",
  "/images/render-3.jpg",
  "/images/render-5.jpg",
  "/images/render-2.jpg",
];

const arRaw: Dict = {
  locale: "ar",
  dir: "rtl",
  seo: {
    title: "بالم جاردنز PX | تاون هاوس وفيلات للبيع في بالم هيلز PX",
    description:
      "بالم جاردنز PX من بالم هيلز: تاون هاوس متشطب وفيلات مستقلة على 36 فدان بإطلالات على الأهرامات، مقدم 5% وتقسيط على 7.5 سنة وتسليم خلال 4 سنوات. الأسعار تبدأ من 32.6 مليون جنيه.",
    keywords: [
      "بالم هيلز PX",
      "بالم جاردنز PX",
      "Palm Gardens at PX",
      "تاون هاوس بالم هيلز",
      "فيلات بالم هيلز PX",
      "فيلا للبيع في بالم هيلز",
      "أسعار بالم هيلز PX",
      "تقسيط بالم هيلز",
      "فيلا بإطلالة على الأهرامات",
      "مشروع بالم هيلز الجديد",
    ],
    ogLocale: "ar_EG",
  },
  brand: { name: "PALM GARDENS AT PX", by: "by Palm Hills — المرحلة الثانية", agent: "Grandeur Spaces" },
  nav: [
    { label: "الوحدات", href: "#products" },
    { label: "الأسعار", href: "#units" },
    { label: "مقارنة", href: "#compare" },
    { label: "حاسبة التقسيط", href: "#calc" },
    { label: "المخطط", href: "#masterplan" },
    { label: "الصور", href: "#gallery" },
    { label: "تواصل معنا", href: "#lead" },
  ],
  ctaNow: "تواصل الآن",
  langSwitch: { label: "EN", href: "/en" },
  hero: {
    badge: "إطلاق جديد قريبًا · تاون هاوس وفيلات",
    eyebrow: "PALM GARDENS AT PX · BY PALM HILLS",
    title: "بالم جاردنز PX",
    lead: "تاون هاوس متشطب وفيلات مستقلة للبيع في بالم هيلز PX، المرحلة الثانية على 36 فدان بإطلالات على الأهرامات. الأسعار تبدأ من ",
    fromPrice: "32,600,000",
    leadEnd: " جنيه.",
    ctaPrices: "الأسعار والوحدات",
    ctaWhatsapp: "واتساب",
    stats: [
      { value: "5%", label: "مقدم الحجز" },
      { value: "7.5", label: "سنوات تقسيط" },
      { value: "36", label: "فدان المرحلة الثانية" },
      { value: "4", label: "سنوات للتسليم" },
    ],
    note: "Grandeur Spaces — وكيل بيع معتمد. أسعار استرشادية قابلة للتغيير.",
  },
  contact: {
    eyebrow: "CONTACT US",
    title: "استعلم عن الأسعار والوحدات المتاحة",
    text: "حدد مجال اهتمامك وتواصل معنا عبر واتساب أو الهاتف أو البريد الإلكتروني.",
    interestLabel: "مجال الاهتمام (اختياري)",
    chips: ["تاون هاوس ميدل", "تاون هاوس كورنر", "فيلا Type 3 / 4", "فيلا Type 1 / 5"],
    whatsapp: "التواصل عبر واتساب",
    call: "اتصال هاتفي",
    email: "البريد الإلكتروني",
    fine: "Grandeur Spaces — وكيل بيع معتمد، وهذا الموقع ليس الموقع الرسمي للمطور.",
    waGreeting: "مرحبًا، أود الاستعلام عن أسعار بالم جاردنز PX - بالم هيلز.",
    waInterest: "مجال الاهتمام:",
  },
  products: {
    eyebrow: "TWO PRODUCTS",
    title: "نوعان من الوحدات في بالم جاردنز",
    text: "تاون هاوس متشطب بالكامل على أطراف المرحلة، وفيلات مستقلة Core & Shell في قلبها حوالين The Valley، ولكل نوع مزاياه.",
    items: [
      {
        eyebrow: "FULLY FINISHED",
        name: "TOWNHOUSES",
        sub: "تاون هاوس متشطب بالكامل",
        img: "/images/render-6.jpg",
        alt: "تاون هاوس للبيع في بالم هيلز PX",
        text: "تاون هاوس Middle وCorner على أطراف المرحلة، بثلاث غرف وبنتهاوس وروف، متشطب بالكامل وجاهز للسكن عند الاستلام.",
        bullets: ["مساحة أرض من 212 إلى 215.5 م²", "مساحة بنائية من 200.72 إلى 210.81 م²", "ماستر + غرفتين + ليفينج وغرفة مربية", "تبدأ من 32.6 مليون جنيه"],
        stats: [
          { k: "مقدم الحجز", v: "5%" },
          { k: "السداد", v: "7.5 سنة" },
          { k: "التشطيب", v: "متشطب بالكامل" },
        ],
        cta: "عرض أسعار التاون هاوس",
        filter: "townhouse",
      },
      {
        eyebrow: "CORE & SHELL",
        name: "STANDALONE VILLAS",
        sub: "فيلات مستقلة",
        img: "/images/render-4.jpg",
        alt: "فيلات للبيع في بالم هيلز PX",
        text: "فيلات مستقلة في قلب المرحلة حوالين The Valley، أربعة نماذج من Type 1 إلى Type 5، تسليم Core & Shell عشان تشطبها على ذوقك.",
        bullets: ["مساحة أرض من 281.6 إلى 595.68 م²", "من 4 إلى 6 غرف نوم", "Type 1 وType 5 بمصعد وغرفة سائق", "تبدأ من حوالي 37 مليون جنيه"],
        stats: [
          { k: "مقدم الحجز", v: "5%" },
          { k: "السداد", v: "7.5 سنة" },
          { k: "التشطيب", v: "Core & Shell" },
        ],
        cta: "عرض أسعار الفيلات",
        filter: "villa",
      },
    ],
  },
  unitsSec: {
    eyebrow: "UNITS & PRICES",
    title: "وحدات وأسعار بالم هيلز PX",
    text: "أسعار البداية لكل نموذج في مرحلة الإطلاق. الأسعار استرشادية وقابلة للتغيير وفقًا للمتاح، والمعتمد هو جدول الأسعار الرسمي من بالم هيلز.",
    filters: [
      { id: "all", label: "كل الوحدات" },
      { id: "townhouse", label: "تاون هاوس" },
      { id: "villa", label: "فيلات" },
    ],
    sortLow: "الأقل سعرًا أولًا",
    sortDefault: "الترتيب الافتراضي",
    swipe: "مرّر لعرض باقي الوحدات ←",
    kindLabel: { townhouse: "تاون هاوس", villa: "فيلا مستقلة" },
    kindBadge: { townhouse: "TOWNHOUSE", villa: "STANDALONE VILLA" },
    finishing: { ff: "متشطب بالكامل", cs: "Core & Shell" },
    kLand: "مساحة الأرض",
    kBua: "المساحة البنائية",
    kRoof: "الروف",
    kFinishing: "التشطيب",
    kPenthouse: "البنتهاوس",
    kPergola: "البرجولة",
    kBeds: "الغرف",
    kExtras: "إضافات",
    bedsWord: "غرف",
    sqm: "م²",
    from: "تبدأ من",
    avg: "متوسط السعر",
    details: "التفاصيل",
    installment: "القسط",
    note: "الأسعار المعروضة أسعار بداية أو متوسطة، وتختلف حسب المساحة والموقع داخل المرحلة. الفيلات تُسلَّم Core & Shell والتاون هاوس متشطب بالكامل.",
  },
  compare: {
    eyebrow: "SIDE BY SIDE",
    title: "تاون هاوس أم فيلا؟",
    text: "مقارنة مباشرة بين النوعين علشان تختار الأنسب ليك.",
    colA: { eyebrow: "TOWNHOUSES", name: "تاون هاوس" },
    colB: { eyebrow: "STANDALONE VILLAS", name: "فيلا مستقلة" },
    rowLabel: "البند",
    rows: [
      { k: "الموقع في المرحلة", a: "على أطراف المرحلة", b: "في قلب المرحلة حوالين The Valley" },
      { k: "النماذج", a: "Middle · Corner", b: "Type 1 · 3 · 4 · 5" },
      { k: "مساحة الأرض", a: "212 – 215.5 م²", b: "281.6 – 595.68 م²" },
      { k: "المساحة البنائية", a: "200.72 – 210.81 م²", b: "239.91 – 428.04 م²" },
      { k: "الغرف", a: "3 غرف", b: "4 – 6 غرف" },
      { k: "التشطيب", a: "متشطب بالكامل", b: "Core & Shell" },
      { k: "تبدأ من", a: "32,600,000 جنيه", b: "حوالي 37,000,000 جنيه" },
      { k: "السداد", a: "5% + 5% بعد 3 شهور · 7.5 سنة", b: "5% + 5% بعد 3 شهور · 7.5 سنة" },
      { k: "الأنسب لـ", a: "اللي عايز يستلم جاهز للسكن", b: "اللي عايز مساحة أكبر وتشطيب على ذوقه" },
    ],
    cta: "اطلب استشارة لتحديد الأنسب",
  },
  calc: {
    eyebrow: "PAYMENT PLAN",
    title: "احسب قسطك",
    text: "اختار الوحدة ونسبة المقدم علشان تشوف قيمة القسط التقريبية. الحساب استرشادي بدون فوائد، والمعتمد هو جدول السداد الرسمي من بالم هيلز.",
    unitLabel: "الوحدة",
    downLabel: "نسبة المقدم",
    downHint: "النظام: مقدم 5% + 5% بعد 3 شهور، والباقي على 7.5 سنة",
    freqLabel: "دورية القسط",
    quarterly: "ربع سنوي",
    monthly: "شهري",
    down: "المقدم",
    second: "بعد 3 شهور",
    count: "عدد الأقساط",
    years: "مدة السداد",
    yearsWord: "سنة",
    instQuarter: "القسط الربع سنوي التقريبي",
    instMonth: "القسط الشهري التقريبي",
    currency: "جنيه مصري",
    cta: "اطلب جدول السداد الرسمي",
  },
  lifestyle: {
    eyebrow: "THE LIFESTYLE",
    title: "مرافق وخدمات متكاملة",
    text: "PX بيستهدف الجيل الأصغر بمزيج من السكن والترفيه، وكل اللي العيلة محتاجاه جوه المشروع أو جنبه.",
    items: [
      { title: "Clubhouse بمساحة 15 فدان", text: "مركز رئيسي للأنشطة والمناسبات داخل المشروع." },
      { title: "Gymnasium كبير", text: "صالة رياضية ومساحات للأنشطة الرياضية والاجتماعية." },
      { title: "مسارات مشي ودراجات", text: "مسارات وسط المساحات الخضراء والمسطحات المائية." },
      { title: "مدرسة دولية", text: "ضمن المخطط العام لمشروع PX." },
      { title: "St. Regis Hotel", text: "فندق ضمن المخطط، مع Branded Residences مستقبلية." },
      { title: "مولات ومناطق تجارية", text: "بجانب Golf Central وCrown Central وHale Town." },
    ],
  },
  numbers: {
    eyebrow: "THE NUMBERS",
    title: "PX بالأرقام",
    text: "مشروع واسع بكثافة منخفضة، ومن أعلى المناطق منسوبًا داخل بالم هيلز.",
    items: [
      { value: "370 فدان", text: "إجمالي مساحة مشروع PX." },
      { value: "17.5% Footprint", text: "نسبة بناء منخفضة ومساحات مفتوحة واسعة." },
      { value: "18 فدان", text: "منطقة The Valley، حوالي 50% من المرحلة الثانية." },
      { value: "128 – 140 م", text: "ارتفاع المرحلة فوق سطح البحر، من الأعلى في المشروع." },
    ],
  },
  masterplan: {
    eyebrow: "THE MASTERPLAN",
    title: "المخطط العام لمشروع PX",
    text: "المخطط مقسّم لثلاث مراحل، والمرحلة الثانية بالم جاردنز في منتصف المشروع، بفيلات في القلب وتاون هاوس على الأطراف وإطلالات واضحة على الأهرامات.",
    alt: "المخطط العام لمشروع PX بالم هيلز والمرحلة الثانية بالم جاردنز",
    rows: [
      { k: "المطور", v: "بالم هيلز للتعمير" },
      { k: "إجمالي المساحة", v: "370 فدان" },
      { k: "المرحلة الثانية", v: "36 فدان — تاون هاوس وفيلات" },
      { k: "The Valley", v: "حوالي 18 فدان" },
      { k: "المخطط", v: "Chapman Taylor × Alchemy Architecture" },
      { k: "التسليم", v: "خلال 4 سنوات" },
    ],
  },
  why: {
    eyebrow: "THE CASE",
    title: "ليه تحجز في بالم جاردنز دلوقتي",
    text: "أربعة أسباب بتميز الحجز في مرحلة الإطلاق.",
    items: [
      { num: "5%", unit: "مقدم", title: "أسعار مرحلة الإطلاق", text: "حجز بمقدم 5% و5% بعد 3 شهور، وأسعار الإطلاق عادةً أفضل نقطة دخول في المشروع." },
      { num: "100%", unit: "مُباعة", title: "المرحلة الأولى اتباعت", text: "فيلات المرحلة الأولى اتباعت بالكامل بعد إطلاقها في فبراير 2024، والتنفيذ بدأ بعد حوالي 10 شهور." },
      { num: "7.5", unit: "سنوات", title: "فترة سداد ممتدة", text: "الباقي بعد المقدم مقسّط على 7.5 سنة، مع تسليم خلال 4 سنوات." },
      { num: "140", unit: "متر", title: "من أعلى مناطق بالم هيلز", text: "ارتفاع من 128 إلى 140 متر وإطلالات على الأهرامات من أجزاء كبيرة من المشروع." },
    ],
  },
  developer: {
    eyebrow: "THE DEVELOPER",
    title: "من يقف خلف المشروع",
    text: "PX من تطوير بالم هيلز للتعمير، بمخطط عالمي من Chapman Taylor بالتعاون مع Alchemy Architecture.",
    blocks: [
      { title: "بالم هيلز للتعمير", text: "مطور مشروع PX، والمرحلة الأولى من فيلاته اتباعت بالكامل." },
      { title: "تنفيذ على الأرض", text: "أول إطلاق كان فبراير 2024، والتنفيذ بدأ بعد حوالي 10 شهور." },
      { title: "مخطط عالمي", text: "Masterplan من Chapman Taylor مع Alchemy Architecture." },
      { title: "مجتمع متكامل", text: "St. Regis Hotel ومدرسة دولية وClubhouse بمساحة 15 فدان." },
    ],
    cta: "اطلب كتيّب المشروع",
    alt: "تصور معماري لمباني بالم جاردنز PX",
  },
  gallery: {
    eyebrow: "GALLERY",
    title: "من داخل بالم جاردنز PX",
    text: "صور تعبيرية (Renders) للمباني والمخطط العام.",
    items: GALLERY.map((src, i) => ({
      src,
      alt: src.includes("masterplan") ? "المخطط العام لمشروع PX بالم هيلز" : `تصور معماري لبالم جاردنز PX بالم هيلز ${i + 1}`,
    })),
  },
  faq: {
    eyebrow: "FAQ",
    title: "الأسئلة الشائعة",
    items: [
      { q: "إيه نظام السداد في بالم جاردنز PX؟", a: "مقدم 5%، و5% بعد 3 شهور، والباقي على أقساط خلال 7.5 سنة." },
      { q: "إمتى التسليم؟", a: "التسليم خلال 4 سنوات حسب خطة المشروع." },
      { q: "فين موقع المرحلة الثانية؟", a: "في منتصف مشروع PX بالم هيلز، على واحدة من أعلى المناطق منسوبًا (128–140 متر) وبإطلالات على الأهرامات." },
      { q: "إيه الفرق بين Core & Shell والمتشطب بالكامل؟", a: "التاون هاوس بيتسلم متشطب بالكامل وجاهز للسكن، والفيلات بتتسلم Core & Shell (هيكل وواجهات) علشان تشطبها على ذوقك." },
      { q: "مين المطور؟", a: "بالم هيلز للتعمير، والمخطط العام من Chapman Taylor بالتعاون مع Alchemy Architecture." },
      { q: "إزاي أحجز؟", a: "تواصل معانا على واتساب أو الهاتف، وهنبعتلك الأسعار والوحدات المتاحة وخطوات الحجز وقت الإطلاق." },
    ],
  },
  lead: {
    eyebrow: "CONTACT US",
    title: "تواصل مع فريق المبيعات",
    text: "للاطلاع على الوحدات المتاحة وأسعار الإطلاق وخطوات الحجز، سيب بياناتك أو تواصل معانا عبر واتساب أو الهاتف.",
    bullets: ["تاون هاوس متشطب بالكامل يبدأ من 32.6 مليون جنيه", "فيلات مستقلة Core & Shell من Type 1 إلى Type 5", "مقدم 5% + 5% بعد 3 شهور والباقي على 7.5 سنة"],
    phoneLabel: "هاتف المبيعات",
    emailLabel: "البريد الإلكتروني",
    name: "الاسم",
    phone: "رقم الموبايل",
    submit: "سجّل بياناتك",
    sending: "جاري الإرسال...",
    success: "تم استلام بياناتك، هنتواصل معاك قريبًا.",
    error: "حصلت مشكلة في الإرسال. جرّب تاني أو كلّمنا على واتساب.",
    or: "أو تواصل مباشرة",
  },
  modal: {
    eyebrow: "PRICE LIST",
    title: "اطّلع على أسعار الإطلاق",
    text: "تواصل مع فريق المبيعات عبر واتساب أو الهاتف أو البريد الإلكتروني للاطلاع على الوحدات المتاحة.",
    close: "إغلاق",
  },
  footer: {
    address: "المرحلة الثانية من مشروع PX — بالم هيلز.",
    contactTitle: "تواصل",
    linksTitle: "روابط",
    whatsapp: "واتساب",
    links: [
      { id: "about", label: "من نحن" },
      { id: "privacy", label: "سياسة الخصوصية" },
      { id: "disclaimer", label: "إخلاء المسؤولية" },
    ],
    disclaimer:
      "Grandeur Spaces وكيل بيع معتمد لمشروعات بالم هيلز، وهذا الموقع ليس الموقع الرسمي للمطور. جميع الأسعار والمساحات استرشادية وقابلة للتغيير دون إشعار مسبق، والمعتمد هو ما يصدر رسميًا من المطور. الصور تعبيرية.",
    copy: "Grandeur Spaces",
  },
  legal: {
    about: "Grandeur Spaces وكيل بيع معتمد لعدد من كبار المطورين في مصر منهم بالم هيلز. بنساعدك تختار الوحدة المناسبة وتوصل لأسعار الإطلاق وخطط السداد الرسمية.",
    privacy: "بنجمع الاسم ورقم الموبايل اللي بتسيبهم علشان نتواصل معاك بخصوص بالم جاردنز PX فقط. مش بنبيع بياناتك ولا بنشاركها مع أي طرف تالت إلا لو ده ضروري لتنفيذ طلبك. الموقع بيستخدم ملفات تعريف ارتباط بسيطة لقياس أداء الحملات. تقدر تطلب حذف بياناتك في أي وقت عبر واتساب أو البريد الإلكتروني.",
    disclaimer: "المعلومات والأسعار والمساحات المعروضة مبنية على المواد التسويقية المتاحة وقت النشر، وهي استرشادية وقابلة للتغيير دون إشعار مسبق، ولا تُعتبر عرضًا ملزمًا. الصور والتصورات تعبيرية. هذا الموقع ليس الموقع الرسمي لبالم هيلز.",
  },
  cookie: { text: "نستخدم ملفات تعريف الارتباط لتحسين التجربة وقياس أداء الحملات.", accept: "موافق" },
};

export const ar: Dict = isoDeep(arRaw);

export const en: Dict = {
  locale: "en",
  dir: "ltr",
  seo: {
    title: "Palm Gardens at PX | Townhouses & Villas for Sale in Palm Hills PX",
    description:
      "Palm Gardens at PX by Palm Hills: fully finished townhouses and standalone villas on 36 acres with pyramid views. 5% down, 7.5-year instalments, delivery in 4 years. Prices from EGP 32.6M.",
    keywords: [
      "Palm Hills PX",
      "Palm Gardens at PX",
      "townhouses for sale Palm Hills",
      "villas for sale Palm Hills PX",
      "Palm Hills PX prices",
      "Palm Hills installment plan",
      "Palm Hills pyramid view villas",
      "Palm Hills new launch",
      "PX Palm Hills townhouse",
      "Palm Hills Core and Shell villas",
    ],
    ogLocale: "en_US",
  },
  brand: { name: "PALM GARDENS AT PX", by: "by Palm Hills — Phase 2", agent: "Grandeur Spaces" },
  nav: [
    { label: "Units", href: "#products" },
    { label: "Prices", href: "#units" },
    { label: "Compare", href: "#compare" },
    { label: "Calculator", href: "#calc" },
    { label: "Masterplan", href: "#masterplan" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#lead" },
  ],
  ctaNow: "Contact now",
  langSwitch: { label: "عربي", href: "/" },
  hero: {
    badge: "Launching soon · Townhouses & Villas",
    eyebrow: "PALM GARDENS AT PX · BY PALM HILLS",
    title: "Palm Gardens at PX",
    lead: "Fully finished townhouses and standalone villas for sale in Palm Hills PX. Phase 2 spans 36 acres with views of the Pyramids. Prices from EGP ",
    fromPrice: "32,600,000",
    leadEnd: ".",
    ctaPrices: "Prices & Units",
    ctaWhatsapp: "WhatsApp",
    stats: [
      { value: "5%", label: "Down payment" },
      { value: "7.5", label: "Years to pay" },
      { value: "36", label: "Acres in Phase 2" },
      { value: "4", label: "Years to delivery" },
    ],
    note: "Grandeur Spaces — authorized sales agent. Indicative prices, subject to change.",
  },
  contact: {
    eyebrow: "CONTACT US",
    title: "Ask about prices & available units",
    text: "Pick what you're interested in and reach us on WhatsApp, phone or email.",
    interestLabel: "Interested in (optional)",
    chips: ["Townhouse Middle", "Townhouse Corner", "Villa Type 3 / 4", "Villa Type 1 / 5"],
    whatsapp: "Chat on WhatsApp",
    call: "Call us",
    email: "Email",
    fine: "Grandeur Spaces — authorized sales agent. This is not the developer's official website.",
    waGreeting: "Hello, I'd like to ask about Palm Gardens at PX - Palm Hills prices.",
    waInterest: "Interested in:",
  },
  products: {
    eyebrow: "TWO PRODUCTS",
    title: "Two home types in Palm Gardens",
    text: "Fully finished townhouses on the edges of the phase, and Core & Shell standalone villas at its heart around The Valley.",
    items: [
      {
        eyebrow: "FULLY FINISHED",
        name: "TOWNHOUSES",
        sub: "Fully finished townhouses",
        img: "/images/render-6.jpg",
        alt: "Townhouses for sale in Palm Hills PX",
        text: "Middle and Corner townhouses on the edges of the phase, with 3 bedrooms, a penthouse and roof terrace, fully finished and ready to move in on delivery.",
        bullets: ["Land from 212 to 215.5 sqm", "Built-up area from 200.72 to 210.81 sqm", "1 master + 2 bedrooms, living & nanny room", "From EGP 32.6M"],
        stats: [
          { k: "Down payment", v: "5%" },
          { k: "Instalments", v: "7.5 yrs" },
          { k: "Finishing", v: "Fully finished" },
        ],
        cta: "View townhouse prices",
        filter: "townhouse",
      },
      {
        eyebrow: "CORE & SHELL",
        name: "STANDALONE VILLAS",
        sub: "Standalone villas",
        img: "/images/render-4.jpg",
        alt: "Villas for sale in Palm Hills PX",
        text: "Standalone villas at the heart of the phase around The Valley, in four models from Type 1 to Type 5, delivered Core & Shell so you finish them your way.",
        bullets: ["Land from 281.6 to 595.68 sqm", "4 to 6 bedrooms", "Type 1 and Type 5 with elevator & driver room", "From approx. EGP 37M"],
        stats: [
          { k: "Down payment", v: "5%" },
          { k: "Instalments", v: "7.5 yrs" },
          { k: "Finishing", v: "Core & Shell" },
        ],
        cta: "View villa prices",
        filter: "villa",
      },
    ],
  },
  unitsSec: {
    eyebrow: "UNITS & PRICES",
    title: "Palm Hills PX units & prices",
    text: "Starting prices for each model at launch. Prices are indicative and subject to availability; Palm Hills' official price list prevails.",
    filters: [
      { id: "all", label: "All units" },
      { id: "townhouse", label: "Townhouses" },
      { id: "villa", label: "Villas" },
    ],
    sortLow: "Lowest price first",
    sortDefault: "Default order",
    swipe: "Swipe to see more units →",
    kindLabel: { townhouse: "Townhouse", villa: "Standalone villa" },
    kindBadge: { townhouse: "TOWNHOUSE", villa: "STANDALONE VILLA" },
    finishing: { ff: "Fully finished", cs: "Core & Shell" },
    kLand: "Land",
    kBua: "Built-up",
    kRoof: "Roof",
    kFinishing: "Finishing",
    kPenthouse: "Penthouse",
    kPergola: "Pergola",
    kBeds: "Bedrooms",
    kExtras: "Extras",
    bedsWord: "bed",
    sqm: "sqm",
    from: "From",
    avg: "Average price",
    details: "Details",
    installment: "Instalment",
    note: "Prices shown are starting or average prices and vary by size and position within the phase. Villas are delivered Core & Shell; townhouses are fully finished.",
  },
  compare: {
    eyebrow: "SIDE BY SIDE",
    title: "Townhouse or villa?",
    text: "A direct comparison to help you pick the right fit.",
    colA: { eyebrow: "TOWNHOUSES", name: "Townhouse" },
    colB: { eyebrow: "STANDALONE VILLAS", name: "Standalone villa" },
    rowLabel: "Item",
    rows: [
      { k: "Position", a: "On the edges of the phase", b: "At the heart, around The Valley" },
      { k: "Models", a: "Middle · Corner", b: "Type 1 · 3 · 4 · 5" },
      { k: "Land", a: "212 – 215.5 sqm", b: "281.6 – 595.68 sqm" },
      { k: "Built-up area", a: "200.72 – 210.81 sqm", b: "239.91 – 428.04 sqm" },
      { k: "Bedrooms", a: "3", b: "4 – 6" },
      { k: "Finishing", a: "Fully finished", b: "Core & Shell" },
      { k: "From", a: "EGP 32,600,000", b: "Approx. EGP 37,000,000" },
      { k: "Payment", a: "5% + 5% after 3 months · 7.5 yrs", b: "5% + 5% after 3 months · 7.5 yrs" },
      { k: "Best for", a: "Buyers who want move-in ready", b: "Buyers who want more space and their own finishing" },
    ],
    cta: "Get advice on the right fit",
  },
  calc: {
    eyebrow: "PAYMENT PLAN",
    title: "Calculate your instalment",
    text: "Choose a unit and down payment to see an approximate instalment. Interest-free and indicative; Palm Hills' official payment schedule prevails.",
    unitLabel: "Unit",
    downLabel: "Down payment",
    downHint: "Plan: 5% down + 5% after 3 months, remainder over 7.5 years",
    freqLabel: "Instalment frequency",
    quarterly: "Quarterly",
    monthly: "Monthly",
    down: "Down payment",
    second: "After 3 months",
    count: "Instalments",
    years: "Duration",
    yearsWord: "yrs",
    instQuarter: "Approx. quarterly instalment",
    instMonth: "Approx. monthly instalment",
    currency: "Egyptian pounds",
    cta: "Request the official schedule",
  },
  lifestyle: {
    eyebrow: "THE LIFESTYLE",
    title: "Integrated amenities",
    text: "PX is aimed at the younger generation, with a mix of homes and leisure, and everything a family needs inside or nearby.",
    items: [
      { title: "15-acre Clubhouse", text: "The main hub for activities and events in the project." },
      { title: "Large gymnasium", text: "A gym plus spaces for sports and social activities." },
      { title: "Walking & cycling tracks", text: "Paths through green spaces and water features." },
      { title: "International school", text: "Part of the PX masterplan." },
      { title: "St. Regis Hotel", text: "A hotel in the masterplan, with future Branded Residences." },
      { title: "Malls & commercial zones", text: "Alongside Golf Central, Crown Central and Hale Town." },
    ],
  },
  numbers: {
    eyebrow: "THE NUMBERS",
    title: "PX in numbers",
    text: "A large, low-density project on one of the highest points in Palm Hills.",
    items: [
      { value: "370 acres", text: "Total area of the PX project." },
      { value: "17.5% footprint", text: "Low building coverage and wide open spaces." },
      { value: "18 acres", text: "The Valley, about 50% of Phase 2." },
      { value: "128 – 140 m", text: "Elevation above sea level, among the highest in the project." },
    ],
  },
  masterplan: {
    eyebrow: "THE MASTERPLAN",
    title: "PX masterplan",
    text: "The masterplan is split into three phases. Phase 2, Palm Gardens, sits at the centre, with villas at its heart, townhouses on the edges and clear views of the Pyramids.",
    alt: "PX Palm Hills masterplan showing Phase 2, Palm Gardens",
    rows: [
      { k: "Developer", v: "Palm Hills Developments" },
      { k: "Total area", v: "370 acres" },
      { k: "Phase 2", v: "36 acres — townhouses & villas" },
      { k: "The Valley", v: "About 18 acres" },
      { k: "Masterplan", v: "Chapman Taylor × Alchemy Architecture" },
      { k: "Delivery", v: "Within 4 years" },
    ],
  },
  why: {
    eyebrow: "THE CASE",
    title: "Why Palm Gardens now",
    text: "Four reasons to book at launch.",
    items: [
      { num: "5%", unit: "down", title: "Launch-phase prices", text: "Book with 5% down and 5% after 3 months. Launch prices are usually the best entry point." },
      { num: "100%", unit: "sold", title: "Phase 1 sold out", text: "Phase 1 villas sold out after the February 2024 launch, and construction started about 10 months later." },
      { num: "7.5", unit: "years", title: "Long payment plan", text: "The remainder is spread over 7.5 years, with delivery within 4 years." },
      { num: "140", unit: "metres", title: "One of the highest points", text: "128 to 140 metres above sea level, with Pyramid views from large parts of the project." },
    ],
  },
  developer: {
    eyebrow: "THE DEVELOPER",
    title: "Who's behind the project",
    text: "PX is developed by Palm Hills Developments, with a masterplan by Chapman Taylor in collaboration with Alchemy Architecture.",
    blocks: [
      { title: "Palm Hills Developments", text: "Developer of PX; Phase 1 villas are fully sold out." },
      { title: "Building on site", text: "First launched in February 2024; construction began about 10 months later." },
      { title: "International masterplan", text: "Masterplan by Chapman Taylor with Alchemy Architecture." },
      { title: "Complete community", text: "St. Regis Hotel, an international school and a 15-acre Clubhouse." },
    ],
    cta: "Request the brochure",
    alt: "Architectural rendering of Palm Gardens at PX",
  },
  gallery: {
    eyebrow: "GALLERY",
    title: "Inside Palm Gardens at PX",
    text: "Architectural renders of the buildings and the masterplan.",
    items: GALLERY.map((src, i) => ({
      src,
      alt: src.includes("masterplan") ? "PX Palm Hills masterplan" : `Architectural rendering of Palm Gardens at PX, Palm Hills ${i + 1}`,
    })),
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      { q: "What is the payment plan at Palm Gardens at PX?", a: "5% down payment, 5% after 3 months, and the remainder in instalments over 7.5 years." },
      { q: "When is delivery?", a: "Delivery is within 4 years according to the project plan." },
      { q: "Where is Phase 2 located?", a: "At the centre of Palm Hills PX, on one of the highest points in the project (128–140 m) with views of the Pyramids." },
      { q: "What's the difference between Core & Shell and fully finished?", a: "Townhouses are delivered fully finished and ready to move in. Villas are delivered Core & Shell (structure and facades) so you can finish them your way." },
      { q: "Who is the developer?", a: "Palm Hills Developments, with a masterplan by Chapman Taylor in collaboration with Alchemy Architecture." },
      { q: "How do I book?", a: "Contact us on WhatsApp or by phone and we'll send available units, prices and booking steps at launch." },
    ],
  },
  lead: {
    eyebrow: "CONTACT US",
    title: "Talk to the sales team",
    text: "For available units, launch prices and booking steps, leave your details or reach us on WhatsApp or by phone.",
    bullets: ["Fully finished townhouses from EGP 32.6M", "Core & Shell standalone villas, Type 1 to Type 5", "5% down + 5% after 3 months, remainder over 7.5 years"],
    phoneLabel: "Sales line",
    emailLabel: "Email",
    name: "Full name",
    phone: "Mobile number",
    submit: "Send my details",
    sending: "Sending...",
    success: "Thanks, we've received your details and will contact you shortly.",
    error: "Something went wrong. Please try again or message us on WhatsApp.",
    or: "Or contact us directly",
  },
  modal: {
    eyebrow: "PRICE LIST",
    title: "See the launch prices",
    text: "Reach the sales team on WhatsApp, phone or email to see available units.",
    close: "Close",
  },
  footer: {
    address: "Phase 2 of the PX project — Palm Hills.",
    contactTitle: "Contact",
    linksTitle: "Links",
    whatsapp: "WhatsApp",
    links: [
      { id: "about", label: "About us" },
      { id: "privacy", label: "Privacy policy" },
      { id: "disclaimer", label: "Disclaimer" },
    ],
    disclaimer:
      "Grandeur Spaces is an authorized sales agent for Palm Hills projects; this is not the developer's official website. All prices and areas are indicative and subject to change without notice; the developer's official documents prevail. Images are renders.",
    copy: "Grandeur Spaces",
  },
  legal: {
    about: "Grandeur Spaces is an authorized sales agent for several leading Egyptian developers, including Palm Hills. We help you choose the right unit and access launch prices and official payment plans.",
    privacy: "We collect the name and mobile number you submit only to contact you about Palm Gardens at PX. We do not sell your data or share it with third parties except where needed to handle your request. The site uses basic cookies to measure campaign performance. You can ask us to delete your data at any time via WhatsApp or email.",
    disclaimer: "Information, prices and areas shown are based on marketing material available at the time of publishing. They are indicative, subject to change without notice, and do not constitute a binding offer. Images are renders. This is not the official Palm Hills website.",
  },
  cookie: { text: "We use cookies to improve your experience and measure campaign performance.", accept: "Accept" },
};

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
