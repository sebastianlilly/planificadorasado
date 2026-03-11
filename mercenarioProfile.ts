export interface MercenarioCard {
  title: string;
  value: string;
  description: string;
}

export interface MercenarioProfile {
  maridaje: MercenarioCard;
  consejo: MercenarioCard;
  herramienta: MercenarioCard;
  perfil: MercenarioCard;
}

interface MercenarioInput {
  selectedItemIds: Set<string>;
  guestCount: number;
  totalMeatKg: number;
  totalBeefKg: number;
  totalPorkKg: number;
  totalChickenKg: number;
  language: 'es' | 'en';
}

const hasAny = (selected: Set<string>, ids: string[]) => ids.some((id) => selected.has(id));

export function getMercenarioProfile({
  selectedItemIds,
  guestCount,
  totalMeatKg,
  totalBeefKg,
  totalPorkKg,
  totalChickenKg,
  language,
}: MercenarioInput): MercenarioProfile {
  const isSpanish = language === 'es';

  const hasBeef =
    totalBeefKg > 0 ||
    hasAny(selectedItemIds, [
      'lomo-vetado',
      'lomo-liso',
      'entrana',
      'punta-picana',
      'sobrecostilla',
      'asado-carnicero',
      'posta-negra',
      'posta-rosada',
      'pollo-ganso',
      'tapapecho',
    ]);

  const hasPork = totalPorkKg > 0 || selectedItemIds.has('costillar');
  const hasChicken = totalChickenKg > 0 || selectedItemIds.has('trutro');

  let maridaje: MercenarioCard = {
    title: isSpanish ? 'Tu Maridaje' : 'Your Pairing',
    value: isSpanish ? 'Cerveza ámbar o tinto joven' : 'Amber beer or young red wine',
    description: isSpanish
      ? 'Una opción versátil para un asado mixto y relajado.'
      : 'A versatile choice for a relaxed mixed BBQ.',
  };

  if (hasBeef) {
    maridaje = {
      title: isSpanish ? 'Tu Maridaje' : 'Your Pairing',
      value: isSpanish ? 'Cabernet Sauvignon o Carménère' : 'Cabernet Sauvignon or Carménère',
      description: isSpanish
        ? 'Los cortes de vacuno piden estructura, cuerpo y buena presencia en copa.'
        : 'Beef cuts ask for structure, body and a wine with presence.',
    };
  } else if (hasPork) {
    maridaje = {
      title: isSpanish ? 'Tu Maridaje' : 'Your Pairing',
      value: isSpanish ? 'Pinot Noir, sidra seca o cerveza ámbar' : 'Pinot Noir, dry cider or amber beer',
      description: isSpanish
        ? 'El cerdo acepta contraste y funciona muy bien con opciones más jugosas y frescas.'
        : 'Pork handles contrast well and pairs nicely with juicier, fresher options.',
    };
  } else if (hasChicken) {
    maridaje = {
      title: isSpanish ? 'Tu Maridaje' : 'Your Pairing',
      value: isSpanish ? 'Sauvignon Blanc o cerveza rubia' : 'Sauvignon Blanc or lager beer',
      description: isSpanish
        ? 'Para pollo conviene algo más fresco, liviano y de buena acidez.'
        : 'Chicken works best with something fresher, lighter and crisp.',
    };
  }

  let consejo: MercenarioCard = {
    title: isSpanish ? 'Tu Consejo de Parrilla' : 'Your Grill Tip',
    value: isSpanish
      ? 'Arma una secuencia y no tires todo al fuego al mismo tiempo.'
      : 'Build a sequence and do not throw everything on the grill at once.',
    description: isSpanish
      ? 'La diferencia entre improvisar y dominar está en el orden.'
      : 'The difference between improvising and controlling the cook is order.',
  };

  if (guestCount >= 10) {
    consejo = {
      title: isSpanish ? 'Tu Consejo de Parrilla' : 'Your Grill Tip',
      value: isSpanish ? 'Trabaja por tandas y define una zona de servicio.' : 'Cook in rounds and define a serving zone.',
      description: isSpanish
        ? 'Con mucha gente, el caos se evita antes de encender la parrilla.'
        : 'With a big group, avoiding chaos starts before lighting the grill.',
    };
  } else if (totalMeatKg >= 3) {
    consejo = {
      title: isSpanish ? 'Tu Consejo de Parrilla' : 'Your Grill Tip',
      value: isSpanish ? 'Sella primero y luego baja a fuego medio.' : 'Sear first, then move to medium heat.',
      description: isSpanish
        ? 'Con una carga grande de carne, el control del calor vale oro.'
        : 'With a large amount of meat, heat control is everything.',
    };
  }

  let herramienta: MercenarioCard = {
    title: isSpanish ? 'Tu Herramienta Recomendada' : 'Your Recommended Tool',
    value: isSpanish ? 'Tabla de asado Taller Amable' : 'Taller Amable serving board',
    description: isSpanish
      ? 'Te sirve para presentar mejor, ordenar los cortes y elevar la experiencia.'
      : 'Use it to present better, organize the cuts and elevate the experience.',
  };

  if (guestCount >= 8) {
    herramienta = {
      title: isSpanish ? 'Tu Herramienta Recomendada' : 'Your Recommended Tool',
      value: isSpanish ? 'Tabla grande de servicio Taller Amable' : 'Large Taller Amable serving board',
      description: isSpanish
        ? 'Cuando sube la escala del asado, necesitas superficie, orden y presencia.'
        : 'As the BBQ scales up, you need surface area, order and presence.',
    };
  }

  let perfil: MercenarioCard = {
    title: isSpanish ? 'Tu Perfil Mercenario' : 'Your Mercenary Profile',
    value: isSpanish ? 'Mercenario Clásico' : 'Classic Grill Mercenary',
    description: isSpanish
      ? 'Vas a la segura, respetas el producto y entiendes que un buen asado no necesita circo.'
      : 'You play it smart, respect the product and know that a great BBQ does not need theatrics.',
  };

  if (guestCount >= 10 && totalMeatKg >= 3) {
    perfil = {
      title: isSpanish ? 'Tu Perfil Mercenario' : 'Your Mercenary Profile',
      value: isSpanish ? 'Mercenario de Gran Escala' : 'Large-Scale Grill Mercenary',
      description: isSpanish
        ? 'Aquí ya no solo cocinas: administras fuego, tiempos y reputación.'
        : 'At this point you are not just cooking: you are managing fire, timing and reputation.',
    };
  } else if (hasBeef) {
    perfil = {
      title: isSpanish ? 'Tu Perfil Mercenario' : 'Your Mercenary Profile',
      value: isSpanish ? 'Mercenario de Combate Pesado' : 'Heavy Combat Mercenary',
      description: isSpanish
        ? 'Te llevas bien con cortes intensos, fuego firme y decisiones sin temblor.'
        : 'You are comfortable with intense cuts, steady heat and firm decisions.',
    };
  } else if (hasChicken) {
    perfil = {
      title: isSpanish ? 'Tu Perfil Mercenario' : 'Your Mercenary Profile',
      value: isSpanish ? 'Mercenario de Precisión' : 'Precision Mercenary',
      description: isSpanish
        ? 'No buscas brutalidad: buscas control, equilibrio y buena ejecución.'
        : 'You are not after brute force: you want control, balance and execution.',
    };
  } else if (hasPork) {
    perfil = {
      title: isSpanish ? 'Tu Perfil Mercenario' : 'Your Mercenary Profile',
      value: isSpanish ? 'Mercenario Táctico' : 'Tactical Mercenary',
      description: isSpanish
        ? 'Sabes jugar con jugosidad, contraste y timing sin perder el estilo.'
        : 'You know how to balance juiciness, contrast and timing without losing style.',
    };
  }

  return { maridaje, consejo, herramienta, perfil };
}
