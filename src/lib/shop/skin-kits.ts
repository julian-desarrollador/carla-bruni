export type ShopItem = {
  id: string;
  name: string;
  detail: string;
  price: number;
};

export type SkinKit = {
  id: string;
  name: string;
  kitName: string;
  tagline: string;
  checks: string[];
  needs: string;
  kitPrice: number;
  units: ShopItem[];
  relatedIds: string[];
};

export const SAMPLE_NOTE =
  "Vista de muestra. Los frascos y los valores no son el catálogo real: sirven para recorrer la pared y el carrito.";

export const COUNTER_EXTRAS: ShopItem[] = [
  {
    id: "extra-necessaire",
    name: "Neceser del mostrador",
    detail: "Accesorio de muestra para llevar el ritual.",
    price: 18000,
  },
  {
    id: "extra-spf",
    name: "Protector para sumar al ritual",
    detail: "Producto de muestra. Se integra a cualquier kit.",
    price: 24000,
  },
  {
    id: "extra-guasha",
    name: "Gua sha",
    detail: "Accesorio de muestra para el momento de la crema.",
    price: 15000,
  },
];

function units(id: string, skin: string, prices: [number, number, number]): ShopItem[] {
  return [
    {
      id: `${id}-limpieza`,
      name: `Limpieza · ${skin}`,
      detail: "Paso 1 de muestra. Composición ilustrativa, no es un frasco real.",
      price: prices[0],
    },
    {
      id: `${id}-serum`,
      name: `Sérum · ${skin}`,
      detail: "Paso 2 de muestra. Composición ilustrativa, no es un frasco real.",
      price: prices[1],
    },
    {
      id: `${id}-crema`,
      name: `Crema · ${skin}`,
      detail: "Paso 3 de muestra. Composición ilustrativa, no es un frasco real.",
      price: prices[2],
    },
  ];
}

export const SKIN_KITS: SkinKit[] = [
  {
    id: "grasa",
    name: "Piel grasa",
    kitName: "Kit Piel Grasa",
    tagline: "Equilibra y purifica",
    checks: ["Control de sebo", "Poros dilatados", "Brillos", "Imperfecciones"],
    needs: "Equilibrio · Purificación · Regulación",
    kitPrice: 78000,
    units: units("grasa", "piel grasa", [26000, 32000, 34000]),
    relatedIds: ["extra-spf", "extra-necessaire"],
  },
  {
    id: "resistente",
    name: "Piel resistente",
    kitName: "Kit Piel Resistente",
    tagline: "Renueva y potencia",
    checks: ["Tolera bien los activos", "Piel engrosada", "Menor sensibilidad", "Responde lento"],
    needs: "Activos potentes · Renovación · Resultados",
    kitPrice: 82000,
    units: units("resistente", "piel resistente", [27000, 34000, 36000]),
    relatedIds: ["extra-guasha", "extra-spf"],
  },
  {
    id: "pigmentada",
    name: "Piel pigmentada",
    kitName: "Kit Piel Pigmentada",
    tagline: "Ilumina y unifica",
    checks: ["Manchas", "Tono desigual", "Piel opaca"],
    needs: "Iluminación · Unificación · Antioxidantes",
    kitPrice: 84000,
    units: units("pigmentada", "piel pigmentada", [28000, 36000, 36000]),
    relatedIds: ["extra-spf", "extra-necessaire"],
  },
  {
    id: "tirante",
    name: "Piel tirante",
    kitName: "Kit Piel Tirante",
    tagline: "Hidrata y reconforta",
    checks: ["Falta de hidratación", "Sensación de tirantez", "Líneas finas"],
    needs: "Hidratación profunda · Nutrición · Confort",
    kitPrice: 80000,
    units: units("tirante", "piel tirante", [26000, 33000, 36000]),
    relatedIds: ["extra-guasha", "extra-necessaire"],
  },
  {
    id: "sensible",
    name: "Piel sensible",
    kitName: "Kit Piel Sensible",
    tagline: "Calma, barrera, equilibra",
    checks: ["Rojeces", "Reactividad", "Inflamación"],
    needs: "Calma · Barrera · Equilibrio",
    kitPrice: 79000,
    units: units("sensible", "piel sensible", [27000, 32000, 35000]),
    relatedIds: ["extra-necessaire", "extra-spf"],
  },
  {
    id: "seca",
    name: "Piel seca",
    kitName: "Kit Piel Seca",
    tagline: "Nutrición, lípidos, confort",
    checks: ["Deshidratación", "Textura áspera", "Sensación de incomodidad"],
    needs: "Nutrición · Lípidos · Confort",
    kitPrice: 81000,
    units: units("seca", "piel seca", [27000, 33000, 36000]),
    relatedIds: ["extra-guasha", "extra-necessaire"],
  },
  {
    id: "madura",
    name: "Piel madura",
    kitName: "Kit Piel Madura",
    tagline: "Firmeza, regeneración, densidad",
    checks: ["Pérdida de firmeza", "Líneas y arrugas", "Piel más fina"],
    needs: "Firmeza · Regeneración · Densidad",
    kitPrice: 86000,
    units: units("madura", "piel madura", [28000, 36000, 38000]),
    relatedIds: ["extra-guasha", "extra-spf"],
  },
  {
    id: "mixta",
    name: "Piel mixta",
    kitName: "Kit Piel Mixta",
    tagline: "Equilibrio, hidratación, control",
    checks: ["Zona T grasa", "Mejillas secas", "Desequilibrio"],
    needs: "Equilibrio · Hidratación · Control",
    kitPrice: 80000,
    units: units("mixta", "piel mixta", [26000, 33000, 35000]),
    relatedIds: ["extra-spf", "extra-guasha"],
  },
];

export const FAIR_EVENTS = [
  {
    id: "ogham-playa",
    dateLabel: "Domingo 8 de noviembre",
    place: "Ogham Playa Grande",
    area: "Mar del Plata",
    detail: "Dermoconsultoría, productos y analizador facial 3D Baumann.",
  },
  {
    id: "ogham-guemes",
    dateLabel: "Domingo 15 de noviembre",
    place: "Ogham Güemes",
    area: "Olavarría",
    detail: "Dermoconsultoría, productos y analizador facial 3D Baumann.",
  },
] as const;

export function findSkinKit(id: string): SkinKit | undefined {
  return SKIN_KITS.find((kit) => kit.id === id);
}

export function kitItem(kit: SkinKit): ShopItem {
  return {
    id: `kit-${kit.id}`,
    name: kit.kitName,
    detail: `${kit.tagline}. Incluye los tres pasos de muestra.`,
    price: kit.kitPrice,
  };
}

export function findShopItem(id: string): ShopItem | undefined {
  if (id.startsWith("kit-")) {
    const kit = findSkinKit(id.slice(4));
    return kit ? kitItem(kit) : undefined;
  }
  for (const kit of SKIN_KITS) {
    const unit = kit.units.find((item) => item.id === id);
    if (unit) return unit;
  }
  return COUNTER_EXTRAS.find((item) => item.id === id);
}

export function relatedForKit(kit: SkinKit): ShopItem[] {
  return kit.relatedIds.flatMap((id) => {
    const item = COUNTER_EXTRAS.find((extra) => extra.id === id);
    return item ? [item] : [];
  });
}

export function productImageSrc(id: string): string {
  return `/productos/${id}.jpg`;
}

export function formatArs(value: number): string {
  const digits = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$ ${digits}`;
}
