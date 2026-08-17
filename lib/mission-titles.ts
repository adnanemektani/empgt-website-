import type { MissionSlug } from "./mission-slugs";

type LocalizedTitle = {
  fr: string;
  en: string;
  ar: string;
  zh: string;
  pt: string;
};

type TitleMatch = {
  key: string;
  title: LocalizedTitle;
};

const TITLES: TitleMatch[] = [
  {
    key: "PERSPECTIVE DU CAMPUS CONDORCET",
    title: {
      fr: "Campus Condorcet — Aubervilliers",
      en: "Campus Condorcet — Aubervilliers",
      ar: "جامعة كوندورسيه — أوبيرفيلييه",
      zh: "孔多塞校区 — 奥贝维利耶",
      pt: "Campus Condorcet — Aubervilliers",
    },
  },
  {
    key: "CAMPUS CONDORCET",
    title: {
      fr: "Campus Condorcet — Aubervilliers",
      en: "Campus Condorcet — Aubervilliers",
      ar: "جامعة كوندورسيه — أوبيرفيلييه",
      zh: "孔多塞校区 — 奥贝维利耶",
      pt: "Campus Condorcet — Aubervilliers",
    },
  },
  {
    key: "CAMPUS CYBER",
    title: {
      fr: "Campus Cyber — La Défense (Puteaux)",
      en: "Campus Cyber — La Défense (Puteaux)",
      ar: "سايبر كامبوس — لا ديفونس (بوتو)",
      zh: "网络安全园区 — 拉德芳斯（皮托）",
      pt: "Campus Cyber — La Défense (Puteaux)",
    },
  },
  {
    key: "BMW",
    title: {
      fr: "Siège social BMW Group France — Montigny-le-Bretonneux",
      en: "BMW Group France headquarters — Montigny-le-Bretonneux",
      ar: "المقر الرئيسي لمجموعة بي إم دبليو فرنسا — مونتيني لو بريتونو",
      zh: "宝马集团法国总部 — 蒙蒂尼勒布勒托讷",
      pt: "Sede da BMW Group France — Montigny-le-Bretonneux",
    },
  },
  {
    key: "JOYA",
    title: {
      fr: "Bureaux JOYA — Fontenay-sous-Bois",
      en: "JOYA offices — Fontenay-sous-Bois",
      ar: "مكاتب جوييا — فونتنيه سو بوا",
      zh: "JOYA 办公楼 — 丰特奈苏布瓦",
      pt: "Escritórios JOYA — Fontenay-sous-Bois",
    },
  },
  {
    key: "MALAKOFF",
    title: {
      fr: "Second Grand Site des ministères sociaux — Bâtiment Simone Veil, Malakoff",
      en: "Second Grand Site of the social ministries — Simone Veil building, Malakoff",
      ar: "المقر الكبير الثاني للوزارات الاجتماعية — مبنى سيمون فاي، مالاكوف",
      zh: "社会事务部第二大型办公园区 — 西蒙·韦伊大楼，马拉科夫",
      pt: "Segundo Grand Site dos ministérios sociais — Edifício Simone Veil, Malakoff",
    },
  },
  {
    key: "CANCEROPOLE",
    title: {
      fr: "Bâtiment de recherche en cancérologie — Villejuif",
      en: "Cancer research building — Villejuif",
      ar: "مبنى أبحاث السرطان — فيلجويف",
      zh: "癌症研究大楼 — 维勒瑞夫",
      pt: "Edifício de investigação em oncologia — Villejuif",
    },
  },
  {
    key: "I2BC",
    title: {
      fr: "Institut de Biologie Intégrative de la Cellule (I2BC) — Gif-sur-Yvette",
      en: "Institute for Integrative Biology of the Cell (I2BC) — Gif-sur-Yvette",
      ar: "معهد البيولوجيا التكاملية للخلية (I2BC) — جيف سور إيفيت",
      zh: "综合细胞生物学研究所 (I2BC) — 伊维特河畔吉夫",
      pt: "Instituto de Biologia Integrativa da Célula (I2BC) — Gif-sur-Yvette",
    },
  },
  {
    key: "IPVF",
    title: {
      fr: "Institut Photovoltaïque d'Île-de-France (IPVF) — Palaiseau",
      en: "Île-de-France Photovoltaic Institute (IPVF) — Palaiseau",
      ar: "معهد إيل دو فرانس للطاقة الشمسية (IPVF) — باليزو",
      zh: "法兰西岛光伏研究所 (IPVF) — 帕莱索",
      pt: "Instituto Fotovoltaico da Île-de-France (IPVF) — Palaiseau",
    },
  },
  {
    key: "GARE NOISY CHAMPS",
    title: {
      fr: "Gare Noisy–Champs — Grand Paris Express (lignes 15 & 16)",
      en: "Noisy–Champs station — Grand Paris Express (lines 15 & 16)",
      ar: "محطة نويزي شام — غراند باريس إكسبرس (الخطان 15 و16)",
      zh: "努瓦西尚站 — 大巴黎快线（15 号线和 16 号线）",
      pt: "Estação Noisy–Champs — Grand Paris Express (linhas 15 & 16)",
    },
  },
  {
    key: "LAURISTON",
    title: {
      fr: "Rénovation de bureaux rue Lauriston — Paris 16e",
      en: "Office renovation, rue Lauriston — Paris 16th",
      ar: "تجديد مكاتب في شارع لوريستون — باريس 16",
      zh: "洛里斯顿街办公楼翻新 — 巴黎十六区",
      pt: "Renovação de escritórios na rue Lauriston — Paris 16.º",
    },
  },
  {
    key: "GAITE MONTPARNASSE",
    title: {
      fr: "Réhabilitation d'un immeuble de bureaux — Gaîté Montparnasse, Paris 14e",
      en: "Office building rehabilitation — Gaîté Montparnasse, Paris 14th",
      ar: "إعادة تأهيل مبنى مكاتب — غاييت مونبارناس، باريس 14",
      zh: "办公楼翻修改造 — 蒙帕纳斯盖特，巴黎十四区",
      pt: "Reabilitação de um edifício de escritórios — Gaîté Montparnasse, Paris 14.º",
    },
  },
  {
    key: "COTENTIN EIFFAGE",
    title: {
      fr: "Immeuble Cotentin « Rythme » — Paris 15e",
      en: "Cotentin “Rythme” building — Paris 15th",
      ar: "مبنى كوتنتان «ريتم» — باريس 15",
      zh: "科唐坦“节奏”大楼 — 巴黎十五区",
      pt: "Edifício Cotentin “Rythme” — Paris 15.º",
    },
  },
  {
    key: "SMI VITRY",
    title: {
      fr: "Site de Maintenance des Infrastructures (SMI) ligne 15 — Vitry-sur-Seine",
      en: "Infrastructure Maintenance Site (SMI) line 15 — Vitry-sur-Seine",
      ar: "موقع صيانة البنية التحتية (SMI) الخط 15 — فيتري سور سين",
      zh: "基础设施维护基地 (SMI) 15 号线 — 塞纳河畔维特里",
      pt: "Local de Manutenção de Infraestruturas (SMI) linha 15 — Vitry-sur-Seine",
    },
  },
  {
    key: "AUDITORIUM CLAMART",
    title: {
      fr: "Auditorium du Conservatoire Henri Dutilleux — Clamart",
      en: "Henri Dutilleux Conservatory auditorium — Clamart",
      ar: "قاعة حفلات المعهد الموسيقي هنري دوتيو — كلامار",
      zh: "亨利·杜蒂耶音乐学院音乐厅 — 克拉马尔",
      pt: "Auditório do Conservatório Henri Dutilleux — Clamart",
    },
  },
  {
    key: "CENTRE HEBERT",
    title: {
      fr: "Centre d'animation Hébert — Paris 18e",
      en: "Hébert community centre — Paris 18th",
      ar: "مركز هيبر للأنشطة — باريس 18",
      zh: "埃贝尔社区活动中心 — 巴黎十八区",
      pt: "Centro de animação Hébert — Paris 18.º",
    },
  },
  {
    key: "VILLAGE DES ATHLETES",
    title: {
      fr: "Village des Athlètes Paris 2024 — Saint-Denis / Saint-Ouen",
      en: "Paris 2024 Athletes' Village — Saint-Denis / Saint-Ouen",
      ar: "قرية الرياضيين باريس 2024 — سان دوني / سان ووان",
      zh: "巴黎 2024 运动员村 — 圣但尼 / 圣旺",
      pt: "Vila dos Atletas Paris 2024 — Saint-Denis / Saint-Ouen",
    },
  },
  {
    key: "T6B SMAC",
    title: {
      fr: "Lot T6B « Air du Temps » — Paris 13e",
      en: "T6B “Air du Temps” lot — Paris 13th",
      ar: "قطعة T6B «إير دو تون» — باريس 13",
      zh: "T6B“时代气息”地块 — 巴黎十三区",
      pt: "Lote T6B “Air du Temps” — Paris 13.º",
    },
  },
  {
    key: "SIGNATURE",
    title: {
      fr: "Immeuble Signature — Paris 8e",
      en: "Signature building — Paris 8th",
      ar: "مبنى سيجناتور — باريس 8",
      zh: "“签名”大楼 — 巴黎八区",
      pt: "Edifício Signature — Paris 8.º",
    },
  },
  {
    key: "LE COLISEE LEGENDRE",
    title: {
      fr: "Le Colisée Grand Paris — Tremblay-en-France",
      en: "Le Colisée Grand Paris — Tremblay-en-France",
      ar: "لو كوليزيه غراند باريس — تريمبلي أون فرانس",
      zh: "大巴黎竞技场 — 法兰西特朗布莱",
      pt: "Le Colisée Grand Paris — Tremblay-en-France",
    },
  },
];

function normalizeStem(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .trim();
}

function findTitle(filename: string): LocalizedTitle | null {
  const stem = normalizeStem(filename);
  const sorted = [...TITLES].sort((a, b) => b.key.length - a.key.length);
  for (const match of sorted) {
    if (stem.includes(match.key)) return match.title;
  }
  return null;
}

export function getProfessionalTitle(
  slug: MissionSlug,
  filename: string,
  locale: string
): string | null {
  const title = findTitle(filename);
  if (!title) return null;
  return title[locale as keyof LocalizedTitle] ?? title.fr;
}

export function getProfessionalTitles(
  filename: string
): LocalizedTitle | null {
  return findTitle(filename);
}
