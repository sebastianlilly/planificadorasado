import { FoodItem } from './types';

// Constants for calculation logic
export const CONSUMPTION_RATES = {
  men: { meat: 0.50, drink: 1.5, bread: 3 }, // 500g meat
  women: { meat: 0.25, drink: 1.0, bread: 2 }, // 250g meat
  children: { meat: 0.20, drink: 0.8, bread: 1 }, // 200g meat
};

export const HUNGER_MULTIPLIER = {
  normal: 1.0,
  feroz: 1.25, // 25% increase
};

export const FOOD_ITEMS: FoodItem[] = [
  // CORTES DE CARNE
  {
    id: 'lomo-vetado',
    name: 'Lomo Vetado',
    description: 'El rey de la parrilla, buena infiltración de grasa.',
    description_en: 'The king of the grill, good fat marbling.',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'lomo-liso',
    name: 'Lomo Liso',
    description: 'Corte magro y rectangular con capa de grasa.',
    description_en: 'Lean and rectangular cut with a layer of fat (Striploin).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'entrana',
    name: 'Entraña',
    description: 'Corte delgado de sabor intenso y cocción rápida.',
    description_en: 'Thin cut with intense flavor and quick cooking (Skirt Steak).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'punta-picana',
    name: 'Punta Picana',
    description: 'Triangular y jugosa, con cobertura de grasa.',
    description_en: 'Triangular and juicy, with fat coverage (Picanha).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'sobrecostilla',
    name: 'Sobrecostilla',
    description: 'Sabrosa y versátil, ideal para fuego medio.',
    description_en: 'Tasty and versatile, ideal for medium heat (Chuck).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'asado-carnicero',
    name: 'Asado Carnicero',
    description: 'Corte plano, excelente relación precio-calidad.',
    description_en: 'Flat cut, excellent value for money.',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'posta-negra',
    name: 'Posta Negra',
    description: 'Magra, blanda y sin grasa. Ideal para cuidarse.',
    description_en: 'Lean, soft and fat-free. Ideal for watching your diet (Topside).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'posta-rosada',
    name: 'Posta Rosada',
    description: 'Poca grasa, se recomienda marinar.',
    description_en: 'Little fat, marinating is recommended (Silverside).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'pollo-ganso',
    name: 'Pollo Ganso',
    description: 'Cilíndrico y magro. Requiere fuego suave.',
    description_en: 'Cylindrical and lean. Requires gentle heat (Eye of Round).',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'tapapecho',
    name: 'Tapapecho',
    description: 'Ideal para cocciones largas tipo Brisket.',
    description_en: 'Ideal for long cooking times like Brisket.',
    category: 'meat',
    iconType: 'beef',
  },
  {
    id: 'costillar',
    name: 'Costillar de Cerdo',
    description: 'Clásico chileno, aliñado con orégano y merquén.',
    description_en: 'Chilean classic, seasoned with oregano and merquén (Pork Ribs).',
    category: 'meat',
    iconType: 'pork',
  },
  {
    id: 'trutro',
    name: 'Trutro de Pollo',
    description: 'Económico y del gusto de los niños.',
    description_en: 'Economical and a favorite for kids (Chicken Drumsticks).',
    category: 'meat',
    iconType: 'chicken',
  },

  // APPETIZERS (EMBUTIDOS)
  {
    id: 'chorizo',
    name: 'Chorizo',
    description:
      'El protagonista indiscutido, esencial para el choripán; existen variedades tradicionales, ahumadas y artesanales.',
    description_en:
      'The undisputed protagonist, essential for choripán; traditional, smoked and artisanal varieties exist.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'longaniza',
    name: 'Longaniza',
    description:
      'Especialmente valoradas las de Chillán y San Carlos por su receta de cerdo y especias, aunque su consumo es masivo en todo el país.',
    description_en:
      'Those from Chillán and San Carlos are especially valued for their pork and spice recipe.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'prietas',
    name: 'Prietas',
    description:
      'Embutido de sangre cocida con cebolla y especias, a veces con nueces, muy popular en la parrillada tradicional.',
    description_en:
      'Blood sausage cooked with onion and spices, sometimes with walnuts, very popular in traditional BBQ.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'choricillo',
    name: 'Choricillo',
    description:
      'Una versión más pequeña del chorizo, ideal para servir rápidamente como aperitivo durante el inicio del asado.',
    description_en:
      'A smaller version of chorizo, ideal to serve quickly as an appetizer.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'vienesa',
    name: 'Vienesa (Salchicha)',
    description:
      'Aunque es un producto de consumo diario, es la cecina más vendida en Chile y se utiliza frecuentemente en asados familiares para los niños.',
    description_en:
      'Although a daily product, it is the best-selling sausage in Chile and often used in family BBQs for children.',
    category: 'appetizer',
    iconType: 'sausage',
  },
  {
    id: 'butifarra',
    name: 'Butifarra',
    description:
      'Embutido de origen europeo muy integrado en la zona central, valorado por su suavidad y sabor a cerdo.',
    description_en:
      'Sausage of European origin very integrated in the central zone, valued for its mildness.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'chistorra',
    name: 'Chistorra',
    description:
      'Ha ganado mucha popularidad recientemente en asados más "gourmet" por su delgadez y rapidez de cocción.',
    description_en:
      'Has gained much popularity recently in more "gourmet" BBQs for its thinness and quick cooking.',
    category: 'appetizer',
    iconType: 'chorizo',
  },
  {
    id: 'provoleta',
    name: 'Provoleta',
    description: 'Queso fundido a la parrilla con orégano.',
    description_en: 'Melted cheese on the grill with oregano.',
    category: 'appetizer',
    iconType: 'cheese',
  },
  {
    id: 'marraqueta',
    name: 'Marraqueta Crujiente',
    description: 'Infaltable para el choripán.',
    description_en: 'Essential for the choripán (Chilean bread).',
    category: 'appetizer',
    iconType: 'bread',
  },

  // ENSALADAS (antes estaban en "sides")
  {
    id: 'ensalada-chilena',
    name: 'Ensalada Chilena',
    description: 'Tomate, cebolla y cilantro.',
    description_en: 'Tomato, onion and cilantro salad.',
    category: 'ensaladas',
    iconType: 'salad',
  },
  {
    id: 'ensalada-hojas-verdes',
    name: 'Lechugas / Hojas verdes',
    description: 'Mezcla de lechugas o ensaladas de hojas verdes.',
    description_en: 'Mixed lettuces or leafy greens.',
    category: 'ensaladas',
    iconType: 'salad',
  },
  {
    id: 'apio-con-palta',
    name: 'Apio con Palta',
    description: 'Apio fresco con palta, ideal como ensalada liviana.',
    description_en: 'Fresh celery with avocado, ideal as a light salad.',
    category: 'ensaladas',
    iconType: 'salad',
  },
  {
    id: 'choclo-con-palmitos',
    name: 'Choclo con Palmitos',
    description: 'Choclo con palmitos, clásico para acompañar el asado.',
    description_en: 'Corn with hearts of palm, a classic BBQ side.',
    category: 'ensaladas',
    iconType: 'salad',
  },

  // ACOMPAÑAMIENTOS (guarnición más contundente)
  {
    id: 'papas-mayo',
    name: 'Papas Mayo',
    description: 'El clásico acompañamiento chileno.',
    description_en: 'The classic Chilean side dish (Potatoes with Mayo).',
    category: 'acompanamientos',
    iconType: 'salad',
  },
  {
    id: 'arroz-primavera',
    name: 'Arroz Primavera',
    description: 'Arroz con verduras (zanahoria, arvejas, etc.).',
    description_en: 'Rice with mixed vegetables (carrot, peas, etc.).',
    category: 'acompanamientos',
    iconType: 'salad',
  },
  {
    id: 'arroz-solo',
    name: 'Arroz (solo)',
    description: 'Arroz blanco simple.',
    description_en: 'Plain white rice.',
    category: 'acompanamientos',
    iconType: 'salad',
  },

  // HIELO
  {
    id: 'hielo-2kg',
    name: 'Hielo (Bolsa 2kg)',
    description: 'Fundamental. Calculado a 1kg por adulto.',
    description_en: 'Essential. Calculated at 1kg per adult (2kg bag).',
    category: 'ice',
    iconType: 'ice',
  },

  // PISCO
  {
    id: 'alto-carmen',
    name: 'Alto del Carmen',
    description: 'Para la piscola estándar y confiable.',
    description_en: 'For the standard and reliable piscola.',
    category: 'pisco',
    iconType: 'pisco',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'Para una piscola con toque más maderero.',
    description_en: 'For a piscola with a woodier touch.',
    category: 'pisco',
    iconType: 'pisco',
  },
  {
    id: 'capel',
    name: 'Capel',
    description: 'Para el consumo masivo y "piscola de combate".',
    description_en: 'For mass consumption and "battle piscola".',
    category: 'pisco',
    iconType: 'pisco',
  },
  {
    id: 'mal-paso',
    name: 'Mal Paso',
    description: 'Para los que buscan una piscola de nivel superior.',
    description_en: 'For those looking for a top-tier piscola.',
    category: 'pisco',
    iconType: 'pisco',
  },
  {
    id: 'bauza',
    name: 'Pisco Bauzá',
    description: 'Para quienes prefieren un sabor más destilado.',
    description_en: 'For those who prefer a more distilled flavor.',
    category: 'pisco',
    iconType: 'pisco',
  },
  {
    id: 'mistral-nobel',
    name: 'Mistral Nobel',
    description: 'Para tomarlo solo con hielo o piscola premium.',
    description_en: 'To drink neat with ice or premium piscola.',
    category: 'pisco',
    iconType: 'pisco',
  },

  // DRINKS
  {
    id: 'coca-original',
    name: 'Coca-Cola Original',
    description: 'Para la piscola tradicional.',
    description_en: 'For the traditional piscola.',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'coca-zero',
    name: 'Coca-Cola Zero',
    description: 'Para acompañar la carne sin azúcar.',
    description_en: 'To accompany meat without sugar.',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'pap',
    name: 'Pap',
    description: 'Para los cabros chicos.',
    description_en: 'For the kids (Papaya soda).',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'bilz',
    name: 'Bilz',
    description: 'Para los cabros chicos.',
    description_en: 'For the kids (Red soda).',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'sprite',
    name: 'Sprite',
    description: 'Para mezclar con licores blancos.',
    description_en: 'To mix with white spirits.',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'ginger-ale',
    name: 'Ginger Ale',
    description: 'Para preparar aperitivos y cócteles.',
    description_en: 'To prepare appetizers and cocktails.',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'fanta',
    name: 'Fanta Naranja',
    description: 'Para acompañar la comida con sabor frutal.',
    description_en: 'To accompany food with fruity flavor.',
    category: 'drink',
    iconType: 'soda',
  },
  {
    id: 'pepsi',
    name: 'Pepsi',
    description: 'Para consumo general en formato familiar.',
    description_en: 'For general consumption in family size.',
    category: 'drink',
    iconType: 'soda',
  },

  // CERVEZAS (BEERS)
  {
    id: 'cristal',
    name: 'Cristal',
    description:
      'La lager líder y más transversal de Chile, destacada por ser ligera y muy refrescante.',
    description_en:
      "Chile's leading lager, noted for being light and very refreshing.",
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'escudo',
    name: 'Escudo',
    description:
      'Preferida en los asados por tener un sabor más intenso y mayor cuerpo que la competencia.',
    description_en:
      'Preferred at BBQs for having a more intense flavor and body.',
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'becker',
    name: 'Becker',
    description:
      'Opción económica y suave, muy popular entre el público joven por su filtrado en frío.',
    description_en:
      'Economical and smooth option, very popular among young people.',
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'royal-guard',
    name: 'Royal Guard',
    description:
      'Cerveza de calidad superior (Premium nacional) ideal para maridar con carnes rojas.',
    description_en:
      'Superior quality beer (National Premium) ideal for pairing with red meats.',
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'baltica',
    name: 'Baltica',
    description:
      'Reconocida por su bajo precio y una graduación alcohólica ligeramente más alta.',
    description_en:
      'Known for its low price and slightly higher alcohol content.',
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'austral-lager',
    name: 'Austral Lager',
    description:
      'Clásico de la Patagonia valorado por su pureza y tradición de alta calidad.',
    description_en:
      'Patagonian classic valued for its purity and high-quality tradition.',
    category: 'beer',
    iconType: 'beer',
  },
  {
    id: 'kunstmann-lager',
    name: 'Kunstmann Lager',
    description:
      'La referente de Valdivia que combina masividad con un perfil de especialidad.',
    description_en:
      'The Valdivia reference that combines mass appeal with a specialty profile.',
    category: 'beer',
    iconType: 'beer',
  },

  // WINES - RED
  {
    id: 'cabernet',
    name: 'Cabernet Sauvignon',
    description: 'La cepa más plantada y consumida del país.',
    description_en: 'The most planted and consumed grape variety in the country.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'carmenere',
    name: 'Carménère',
    description: 'Reconocida como la cepa emblemática de Chile.',
    description_en: "Recognized as Chile's emblematic grape variety.",
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'merlot',
    name: 'Merlot',
    description: 'Altamente valorada por su suavidad.',
    description_en: 'Highly valued for its smoothness.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'syrah',
    name: 'Syrah',
    description: 'En crecimiento, especialmente en valles de clima moderado.',
    description_en:
      'Growing popularity, especially in moderate climate valleys.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'pinot-noir',
    name: 'Pinot Noir',
    description: 'Preferida dentro del segmento de tintos frescos y ligeros.',
    description_en:
      'Preferred within the segment of fresh and light reds.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'pais',
    name: 'Cepa País',
    description: 'Variedad patrimonial con gran auge en el consumo actual.',
    description_en:
      'Heritage variety with a great boom in current consumption.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },
  {
    id: 'malbec',
    name: 'Malbec',
    description:
      'Con presencia relevante, especialmente en zonas de viñedos antiguos.',
    description_en:
      'Relevant presence, especially in old vineyard areas.',
    category: 'wine',
    subcategory: 'red',
    iconType: 'wine',
  },

  // WINES - WHITE
  {
    id: 'sauvignon-blanc',
    name: 'Sauvignon Blanc',
    description: 'El blanco líder en ventas, destacado por su frescura y notas cítricas.',
    description_en: 'Top-selling white, noted for its freshness and citrus notes.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'chardonnay',
    name: 'Chardonnay',
    description: 'Muy popular, especialmente las versiones con madera o de climas fríos.',
    description_en: 'Very popular, especially oaked versions or from cold climates.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'late-harvest',
    name: 'Late Harvest',
    description: 'El preferido en la categoría de vinos dulces para postres.',
    description_en: 'Preferred in the sweet dessert wine category.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'semillon',
    name: 'Semillón',
    description: 'Cepa que ha recuperado gran protagonismo y demanda en los últimos años.',
    description_en: 'Grape variety that has regained prominence and demand in recent years.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'riesling',
    name: 'Riesling',
    description: 'Con un consumo creciente en el segmento de vinos aromáticos y de nicho.',
    description_en: 'Increasing consumption in the aromatic and niche wine segment.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'viognier',
    name: 'Viognier',
    description: 'Utilizado tanto en mezclas como en variedades puras de alta gama.',
    description_en: 'Used both in blends and pure high-end varieties.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },
  {
    id: 'gewurztraminer',
    name: 'Gewürztraminer',
    description: 'Valorada por los consumidores que buscan perfiles florales y exóticos.',
    description_en: 'Valued by consumers looking for floral and exotic profiles.',
    category: 'wine',
    subcategory: 'white',
    iconType: 'wine',
  },

  // WINES - SPARKLING
  {
    id: 'champana',
    name: 'Champaña',
    description: 'Porque decirle Espumante es muy siútico.',
    description_en: 'Because calling it Sparkling Wine is too fancy for us.',
    category: 'wine',
    subcategory: 'sparkling',
    iconType: 'wine',
  },
];