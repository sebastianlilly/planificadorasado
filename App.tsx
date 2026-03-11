import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  UtensilsCrossed,
  Beef,
  Bean,
  Utensils,
  RotateCcw,
  Wine,
  CupSoda,
  ShoppingBag,
  GlassWater,
  Snowflake,
  Beer,
  Globe
} from 'lucide-react';
import { GuestCounts, HungerLevel, Category, CalculationResult } from './types';
import { FOOD_ITEMS, CONSUMPTION_RATES, HUNGER_MULTIPLIER } from './constants';
import Counter from './components/Counter';
import FoodGrid from './components/FoodGrid';
import SummaryPanel from './components/SummaryPanel';
import MercenarioPanel from './components/MercenarioPanel';
import { getMercenarioProfile } from './mercenarioProfile';

// Helper to identify sausage items by ID for calculation logic
const SAUSAGE_IDS = ['chorizo', 'longaniza', 'prietas', 'choricillo', 'vienesa', 'butifarra', 'chistorra'];

export default function App() {
  const [guests, setGuests] = useState<GuestCounts>({ men: 0, women: 0, children: 0 });
  const [hunger, setHunger] = useState<HungerLevel>('normal');
  const [isWindyOrLong, setIsWindyOrLong] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<Category>('meat');

  // Language State
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Ref for scrolling to summary on mobile
  const summaryRef = useRef<HTMLDivElement>(null);

  // Quantities state (key: itemId, value: quantity)
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  /**
   * Track which items were manually edited by the user.
   * If an item is "touched", auto-calculation will NOT overwrite it.
   */
  const [touchedIds, setTouchedIds] = useState<Set<string>>(new Set());

  const markTouched = (id: string) => {
    setTouchedIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const unmarkTouched = (id: string) => {
    setTouchedIds(prev => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Logic: Handle Selection Toggle
  const toggleItem = (id: string) => {
    setSelectedItemIds(prev => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);

        // Remove quantity + touched flag if deselected
        setQuantities(qPrev => {
          const qNext = { ...qPrev };
          delete qNext[id];
          return qNext;
        });
        unmarkTouched(id);
      } else {
        next.add(id);

        // Initialize manual items with 1 unit for better UX (but don't mark as touched)
        if (id === 'provoleta') {
          setQuantities(qPrev => ({ ...qPrev, [id]: qPrev[id] ?? 1 }));
        }
      }

      return next;
    });
  };

  const handleQuantityChange = (id: string, val: number) => {
    markTouched(id);
    setQuantities(prev => ({ ...prev, [id]: val }));
  };

  // Logic: Reset Application
  const handleReset = () => {
    setGuests({ men: 0, women: 0, children: 0 });
    setHunger('normal');
    setIsWindyOrLong(false);
    setSelectedItemIds(new Set());
    setQuantities({});
    setTouchedIds(new Set());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic: Scroll to summary
  const scrollToSummary = () => {
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Auto-calculate defaults when guests / hunger / selection changes,
   * BUT do NOT overwrite anything the user manually edited (touchedIds).
   */
  useEffect(() => {
    const { men, women, children } = guests;
    const multiplier = HUNGER_MULTIPLIER[hunger];
    const totalPeople = men + women + children;

    const applyIfNotTouched = (next: Record<string, number>, id: string, value: number) => {
      if (!selectedItemIds.has(id)) return;
      if (touchedIds.has(id)) return;
      next[id] = value;
    };

    const recommended: Record<string, number> = {};

    // 1) Meat needed (Multiplier applies only to adults)
    const rawMeatKg =
      ((men * CONSUMPTION_RATES.men.meat) + (women * CONSUMPTION_RATES.women.meat)) * multiplier +
      (children * CONSUMPTION_RATES.children.meat);

    const selectedMeats = FOOD_ITEMS.filter(item => item.category === 'meat' && selectedItemIds.has(item.id));
    if (selectedMeats.length > 0) {
      const weightPerItem = Number((rawMeatKg / selectedMeats.length).toFixed(1));
      selectedMeats.forEach(item => {
        recommended[item.id] = weightPerItem;
      });
    }

    // 2) Sausages/Embutidos: 0.15kg per person total, distributed among selected sausages
    const selectedSausages = FOOD_ITEMS.filter(item => SAUSAGE_IDS.includes(item.id) && selectedItemIds.has(item.id));
    if (selectedSausages.length > 0) {
      const totalSausageKg = Number((totalPeople * 0.15).toFixed(1));
      const weightPerSausage = Number((totalSausageKg / selectedSausages.length).toFixed(1));
      selectedSausages.forEach(item => {
        recommended[item.id] = weightPerSausage;
      });
    }

    // 3) Marraqueta logic
    const hasSausage = SAUSAGE_IDS.some(id => selectedItemIds.has(id));
    if (selectedItemIds.has('marraqueta')) {
      if (hasSausage) {
        recommended['marraqueta'] = totalPeople;
      } else {
        const breadUnits = Math.ceil(
          men * CONSUMPTION_RATES.men.bread +
          women * CONSUMPTION_RATES.women.bread +
          children * CONSUMPTION_RATES.children.bread
        );
        recommended['marraqueta'] = breadUnits;
      }
    }

    // Ensaladas (kg por persona)
    if (selectedItemIds.has('ensalada-chilena')) {
      recommended['ensalada-chilena'] = Number((totalPeople * 0.2).toFixed(1));
    }
    if (selectedItemIds.has('ensalada-hojas-verdes')) {
      recommended['ensalada-hojas-verdes'] = Number((totalPeople * 0.15).toFixed(1));
    }
    if (selectedItemIds.has('apio-con-palta')) {
      recommended['apio-con-palta'] = Number((totalPeople * 0.15).toFixed(1));
    }
    if (selectedItemIds.has('choclo-con-palmitos')) {
      recommended['choclo-con-palmitos'] = Number((totalPeople * 0.2).toFixed(1));
    }

    // Acompañamientos (kg por persona)
    if (selectedItemIds.has('papas-mayo')) {
      recommended['papas-mayo'] = Number((totalPeople * 0.25).toFixed(1));
    }
    if (selectedItemIds.has('arroz-primavera')) {
      recommended['arroz-primavera'] = Number((totalPeople * 0.08).toFixed(1));
    }
    if (selectedItemIds.has('arroz-solo')) {
      recommended['arroz-solo'] = Number((totalPeople * 0.08).toFixed(1));
    }

    // 4) Wines
    const selectedWines = FOOD_ITEMS.filter(item => item.category === 'wine' && selectedItemIds.has(item.id));
    if (selectedWines.length > 0) {
      const totalAdults = men + women;
      if (totalAdults > 0) {
        const totalBottles = Math.max(1, Math.ceil(totalAdults / 3));
        const bottlesPerType = Math.max(1, Math.ceil(totalBottles / selectedWines.length));
        selectedWines.forEach(item => {
          recommended[item.id] = bottlesPerType;
        });
      }
    }

    // 5) Pisco
    const selectedPiscos = FOOD_ITEMS.filter(item => item.category === 'pisco' && selectedItemIds.has(item.id));
    if (selectedPiscos.length > 0) {
      if (men + women > 0) {
        const bottlesForMen = men / 3;
        const bottlesForWomen = women / 5;
        const totalBottles = Math.max(1, Math.ceil(bottlesForMen + bottlesForWomen));
        const bottlesPerType = Math.max(1, Math.ceil(totalBottles / selectedPiscos.length));
        selectedPiscos.forEach(item => {
          recommended[item.id] = bottlesPerType;
        });
      }
    }

    // 6) Beer
    const selectedBeers = FOOD_ITEMS.filter(item => item.category === 'beer' && selectedItemIds.has(item.id));
    if (selectedBeers.length > 0) {
      if (men + women > 0) {
        const totalUnits = men * 5 + women * 3;
        if (totalUnits > 0) {
          const unitsPerType = Math.max(1, Math.ceil(totalUnits / selectedBeers.length));
          selectedBeers.forEach(item => {
            recommended[item.id] = unitsPerType;
          });
        }
      }
    }

    // 7) Ice
    const selectedIce = FOOD_ITEMS.filter(item => item.category === 'ice' && selectedItemIds.has(item.id));
    if (selectedIce.length > 0) {
      const totalAdults = men + women;
      if (totalAdults > 0) {
        const totalIceKg = totalAdults * 1;
        const bagsNeeded = Math.ceil(totalIceKg / 2);
        selectedIce.forEach(item => {
          recommended[item.id] = bagsNeeded;
        });
      }
    }

    // 8) Drinks (Sodas)
    const selectedDrinks = FOOD_ITEMS.filter(item => item.category === 'drink' && selectedItemIds.has(item.id));
    if (selectedDrinks.length > 0) {
      const drinksLiters =
        ((men * CONSUMPTION_RATES.men.drink) + (women * CONSUMPTION_RATES.women.drink)) * multiplier +
        (children * CONSUMPTION_RATES.children.drink);

      if (drinksLiters > 0) {
        const totalBottlesNeeded = Math.ceil(drinksLiters / 2.0);
        const bottlesPerType = Math.max(1, Math.ceil(totalBottlesNeeded / selectedDrinks.length));
        selectedDrinks.forEach(item => {
          recommended[item.id] = bottlesPerType;
        });
      }
    }

    setQuantities(prev => {
      const next = { ...prev };

      Object.entries(recommended).forEach(([id, value]) => {
        applyIfNotTouched(next, id, value);
      });

      return next;
    });
  }, [guests, hunger, selectedItemIds, touchedIds]);

  // Summary calculation
  const calculationResults: CalculationResult = useMemo(() => {
    const { men, women, children } = guests;
    const multiplier = HUNGER_MULTIPLIER[hunger];
    const totalPeople = men + women + children;

    const totalMeatKg =
      ((men * CONSUMPTION_RATES.men.meat) + (women * CONSUMPTION_RATES.women.meat)) * multiplier +
      (children * CONSUMPTION_RATES.children.meat);

    const hasDrinksSelected = Array.from(selectedItemIds).some(
      id => FOOD_ITEMS.find(i => i.id === id)?.category === 'drink'
    );

    const drinksLiters = hasDrinksSelected
      ? ((men * CONSUMPTION_RATES.men.drink) + (women * CONSUMPTION_RATES.women.drink)) * multiplier +
        (children * CONSUMPTION_RATES.children.drink)
      : 0;

    let breadUnits = 0;
    if (selectedItemIds.has('marraqueta') && quantities['marraqueta'] !== undefined) {
      breadUnits = quantities['marraqueta'];
    }

    let totalBeefKg = 0;
    let totalPorkKg = 0;
    let totalChickenKg = 0;
    let totalGrillWeight = 0;
    let totalBeerUnits = 0;

    Object.keys(quantities).forEach(key => {
      const item = FOOD_ITEMS.find(i => i.id === key);
      const qty = quantities[key];

      if (item) {
        if (item.category === 'meat') {
          if (item.iconType === 'beef') totalBeefKg += qty;
          if (item.iconType === 'pork') totalPorkKg += qty;
          if (item.iconType === 'chicken') totalChickenKg += qty;
        }

        if (item.category === 'beer') {
          totalBeerUnits += qty;
        }

        // Coal logic: meats + sausages (+ provoleta)
        if (item.category === 'meat' || SAUSAGE_IDS.includes(item.id)) {
          totalGrillWeight += qty;
        } else if (item.id === 'provoleta') {
          totalGrillWeight += qty * 0.15;
        }
      }
    });

    const coalRatio = isWindyOrLong ? 1.5 : 1.2;
    const neededCoalKg = totalGrillWeight * coalRatio;
    const coalBags = totalPeople > 0 && totalGrillWeight > 0 ? Math.max(1, Math.ceil(neededCoalKg / 2.5)) : 0;

    const meatDetails: { name: string; amount: string }[] = [];

    selectedItemIds.forEach(id => {
      const item = FOOD_ITEMS.find(i => i.id === id);
      if (item && quantities[id] !== undefined) {
        let unit = 'kg';

        if (item.category === 'appetizer' && (item.id === 'marraqueta' || item.id === 'provoleta')) {
          unit = 'unid';
        }

        if (item.category === 'meat' || SAUSAGE_IDS.includes(item.id)) {
          unit = 'kg';
        }

        if (
          item.category === 'wine' ||
          item.category === 'drink' ||
          item.category === 'pisco' ||
          item.category === 'beer'
        ) {
          unit = 'unid';
        }

        if (item.category === 'ice') {
          unit = 'bolsas';
        }

        if (item.category === 'wine' || item.category === 'pisco') {
          unit = 'botellas';
        }
        if (item.category === 'beer') {
          unit = 'latas/bot';
        }
        if (item.category === 'drink') {
          unit = 'botellas';
        }

        if (language === 'en') {
          if (unit === 'unid') unit = 'units';
          if (unit === 'bolsas') unit = 'bags';
          if (unit === 'botellas') unit = 'bottles';
          if (unit === 'latas/bot') unit = 'cans/bot';
        }

        meatDetails.push({
          name: item.name,
          amount: `${quantities[id]} ${unit}`
        });
      }
    });

    return {
      totalMeatKg,
      totalBeefKg,
      totalPorkKg,
      totalChickenKg,
      coalBags,
      drinksLiters,
      totalBeerUnits,
      breadUnits,
      meatDetails
    };
  }, [guests, hunger, quantities, selectedItemIds, isWindyOrLong, language]);

  const mercenarioProfile = useMemo(() => {
    const guestCount = guests.men + guests.women + guests.children;

    return getMercenarioProfile({
      selectedItemIds,
      guestCount,
      totalMeatKg: calculationResults.totalMeatKg,
      totalBeefKg: calculationResults.totalBeefKg,
      totalPorkKg: calculationResults.totalPorkKg,
      totalChickenKg: calculationResults.totalChickenKg,
      language
    });
  }, [selectedItemIds, guests, calculationResults, language]);

  // Derived state for filtering
  const meatItems = FOOD_ITEMS.filter(i => i.category === 'meat');
  const appItems = FOOD_ITEMS.filter(i => i.category === 'appetizer');
  const saladItems = FOOD_ITEMS.filter(i => i.category === 'ensaladas');
  const accompanimentItems = FOOD_ITEMS.filter(i => i.category === 'acompanamientos');
  const drinkItems = FOOD_ITEMS.filter(i => i.category === 'drink');
  const piscoItems = FOOD_ITEMS.filter(i => i.category === 'pisco');
  const beerItems = FOOD_ITEMS.filter(i => i.category === 'beer');
  const iceItems = FOOD_ITEMS.filter(i => i.category === 'ice');

  // Wines split
  const wineItemsRed = FOOD_ITEMS.filter(i => i.category === 'wine' && i.subcategory === 'red');
  const wineItemsWhite = FOOD_ITEMS.filter(i => i.category === 'wine' && i.subcategory === 'white');
  const wineItemsSparkling = FOOD_ITEMS.filter(i => i.category === 'wine' && i.subcategory === 'sparkling');

  // Translations
  const t = {
    headerTitle: language === 'es' ? 'Planificador' : 'BBQ',
    headerSubtitle: language === 'es' ? 'Asado' : 'Planner',
    headerDesc: language === 'es' ? 'Organiza tu carrete' : 'Organize your party',
    expertTag: language === 'es' ? 'Experto' : 'Expert',
    mercenarioTitle: language === 'es' ? 'El Mercenario' : 'The Grill',
    mercenarioSub: language === 'es' ? 'de la Parrilla' : 'Mercenary',
    mercenarioQuote: language === 'es' ? '"¡Sigue mis consejos para un asado legendario!"' : '"Follow my tips for legendary grilling!"',

    step1: language === 'es' ? 'Paso 1' : 'Step 1',
    defineGuests: language === 'es' ? 'Define tus comensales' : 'Define your guests',
    whoIsComing: language === 'es' ? '¿Quiénes vienen al asado?' : 'Who is coming to the BBQ?',
    men: language === 'es' ? 'Hombres' : 'Men',
    women: language === 'es' ? 'Mujeres' : 'Women',
    children: language === 'es' ? 'Niños' : 'Children',
    hungerTitle: language === 'es' ? 'Nivel de Hambre' : 'Hunger Level',
    normal: language === 'es' ? 'Normal' : 'Normal',
    feroz: language === 'es' ? 'Feroz 🔥' : 'Fierce 🔥',
    coalQuestion:
      language === 'es'
        ? 'Para medir el consumo de carbón: ¿Habrá viento en el lugar? o ¿Tu asado será largo?'
        : 'For charcoal calculation: Will it be windy? or Will it be a long BBQ?',
    no: language === 'es' ? 'No' : 'No',
    yes: language === 'es' ? 'Sí 💨' : 'Yes 💨',
    reset: language === 'es' ? 'Reiniciar Selección' : 'Reset Selection',

    step2: language === 'es' ? 'Paso 2' : 'Step 2',
    chooseProducts: language === 'es' ? 'Elige los productos' : 'Choose products',
    chooseDesc: language === 'es' ? 'Selecciona carnes, ensaladas y bebestibles' : 'Select meats, salads and drinks',
    manualHint:
      language === 'es'
        ? 'Primero elije los cortes de carne y luego corrige manualmente si lo necesitas.'
        : 'First choose the meat cuts and then manually correct if needed.',

    tabMeat: language === 'es' ? 'Carnes' : 'Meats',
    tabApp: language === 'es' ? 'Embutidos' : 'Appetizers',
    tabSides: language === 'es' ? 'Ensaladas' : 'Salads',
    tabWine: language === 'es' ? 'Vinos' : 'Wines',
    tabBeer: language === 'es' ? 'Cervezas' : 'Beers',
    tabPisco: language === 'es' ? 'Pisco' : 'Pisco',
    tabIce: language === 'es' ? 'Hielo' : 'Ice',
    tabDrinks: language === 'es' ? 'Bebidas' : 'Sodas',

    titleMeat: language === 'es' ? 'Cortes Parrilleros' : 'Grill Cuts',
    titleApp: language === 'es' ? 'Embutidos y Previa' : 'Sausages & Starters',
    titleSalads: language === 'es' ? 'Ensaladas' : 'Salads',
    titleAcomp: language === 'es' ? 'Acompañamientos' : 'Hearty Sides',
    acompSubtitle: language === 'es' ? 'Guarnición más contundente' : 'A more filling side dish',
    titleRed: language === 'es' ? 'Vinos Tintos' : 'Red Wines',
    titleWhite: language === 'es' ? 'Vinos Blancos' : 'White Wines',
    titleSparkling: language === 'es' ? 'Champaña' : 'Sparkling Wine',
    titlePisco: language === 'es' ? 'Piscolas y Destilados' : 'Piscolas & Spirits',
    titleBeer: language === 'es' ? 'Cervezas Tradicionales y Artesanales' : 'Traditional & Craft Beers',
    titleIce: language === 'es' ? 'Hielo' : 'Ice',
    titleSoda: language === 'es' ? 'Bebidas y Gaseosas' : 'Sodas & Soft Drinks',

    totalMeat: language === 'es' ? 'Total Carne' : 'Total Meat',
    totalCoal: language === 'es' ? 'Carbón' : 'Charcoal',
    bags: language === 'es' ? 'bolsas' : 'bags',
    viewDetail: language === 'es' ? 'Ver Detalle' : 'View Detail',

    englishVersion: 'English Version',
    spanishVersion: 'Versión en Español'
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-sans text-text-main pb-24 lg:pb-10 print:bg-white print:pb-0">
      {/* Header */}
      <header className="relative w-full bg-[#181111] border-b border-gray-800 px-4 py-6 lg:py-10 shadow-lg overflow-hidden group print:hidden">
        <div className="absolute inset-0 z-0 select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#181111]/95"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-6 mb-2 sm:mb-3 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-1 sm:gap-2">
              <Utensils className="text-gray-500/50 w-8 h-8 sm:w-12 sm:h-12 rotate-12" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase transform -skew-x-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-center leading-none">
                {t.headerTitle}{' '}
                <span className="text-primary drop-shadow-[0_0_15px_rgba(236,19,30,0.6)]">{t.headerSubtitle}</span>
              </h1>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Utensils className="text-gray-500/50 w-8 h-8 sm:w-12 sm:h-12 -rotate-12 transform scale-x-[-1]" strokeWidth={2.5} />
            </div>
          </div>

          <p className="text-xs sm:text-lg text-gray-300 font-extrabold tracking-[0.2em] uppercase flex items-center gap-3 drop-shadow-sm">
            <span className="w-6 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-400 rounded-full"></span>
            {t.headerDesc}
            <span className="w-6 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-400 rounded-full"></span>
          </p>

          <p className="text-[10px] sm:text-sm text-gray-300 font-bold tracking-[0.2em] mt-3 sm:mt-4 opacity-90 drop-shadow-sm">
            by Sebastián Lilly
          </p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 lg:p-8 print:max-w-none print:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start print:block">
          {/* Left Column */}
          <div className="lg:col-span-3 flex flex-col gap-6 print:hidden">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 relative group animate-in slide-in-from-left-4 duration-500">
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                <img
                  src="https://i.imgur.com/cq56d7S.png"
                  alt="El Mercenario de la Parrilla"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-2 right-2 text-white flex flex-col items-center text-center z-10">
                  <div className="px-3 py-1 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded mb-2 transform -skew-x-12 shadow-lg ring-1 ring-white/20">
                    {t.expertTag}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase leading-[0.9] italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {t.mercenarioTitle}
                    <br />
                    <span className="text-xl sm:text-2xl block mt-1 text-gray-200">{t.mercenarioSub}</span>
                  </h2>
                </div>

                <button
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                  className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/20 text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 shadow-lg group-hover:bg-primary group-hover:border-transparent"
                >
                  <Globe size={9} />
                  {language === 'es' ? t.englishVersion : t.spanishVersion}
                </button>
              </div>
              <div className="p-4 bg-surface-off border-t border-gray-100">
                <p className="text-sm text-text-sub font-bold italic text-center">{t.mercenarioQuote}</p>
              </div>
            </div>

            {/* Inputs Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_0_20px_rgba(236,19,30,0.15)] border-2 border-primary/40 ring-4 ring-primary/10 relative overflow-hidden z-20">
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider shadow-sm">
                {t.step1}
              </div>

              <h3 className="text-lg font-black tracking-tight mb-1 text-primary">{t.defineGuests}</h3>
              <p className="text-sm text-text-sub mb-6">{t.whoIsComing}</p>

              <div className="flex flex-col gap-6">
                <Counter label={t.men} type="men" value={guests.men} onChange={v => setGuests({ ...guests, men: v })} />
                <Counter label={t.women} type="women" value={guests.women} onChange={v => setGuests({ ...guests, women: v })} />
                <Counter
                  label={t.children}
                  type="children"
                  value={guests.children}
                  onChange={v => setGuests({ ...guests, children: v })}
                />

                <div className="h-px bg-gray-100 my-1"></div>

                {/* Hunger */}
                <div className="flex flex-col gap-4 mt-2">
                  <h3 className="text-xl font-extrabold text-text-main text-center">{t.hungerTitle}</h3>
                  <div className="flex h-16 w-full bg-surface-off p-1.5 rounded-xl border border-gray-200">
                    <button
                      onClick={() => setHunger('normal')}
                      className={`flex-1 rounded-lg text-base sm:text-lg font-bold transition-all ${
                        hunger === 'normal'
                          ? 'bg-white shadow-md text-primary ring-1 ring-black/5'
                          : 'text-text-sub hover:text-text-main'
                      }`}
                    >
                      {t.normal}
                    </button>
                    <button
                      onClick={() => setHunger('feroz')}
                      className={`flex-1 rounded-lg text-base sm:text-lg font-bold transition-all ${
                        hunger === 'feroz'
                          ? 'bg-white shadow-md text-primary ring-1 ring-black/5'
                          : 'text-text-sub hover:text-text-main'
                      }`}
                    >
                      {t.feroz}
                    </button>
                  </div>
                </div>

                {/* Wind/Long */}
                <div className="flex flex-col gap-4 mt-2">
                  <h3 className="text-xl font-extrabold text-text-main text-center">{t.coalQuestion}</h3>
                  <div className="flex h-16 w-full bg-surface-off p-1.5 rounded-xl border border-gray-200">
                    <button
                      onClick={() => setIsWindyOrLong(false)}
                      className={`flex-1 rounded-lg text-base sm:text-lg font-bold transition-all ${
                        !isWindyOrLong
                          ? 'bg-white shadow-md text-primary ring-1 ring-black/5'
                          : 'text-text-sub hover:text-text-main'
                      }`}
                    >
                      {t.no}
                    </button>
                    <button
                      onClick={() => setIsWindyOrLong(true)}
                      className={`flex-1 rounded-lg text-base sm:text-lg font-bold transition-all ${
                        isWindyOrLong
                          ? 'bg-white shadow-md text-primary ring-1 ring-black/5'
                          : 'text-text-sub hover:text-text-main'
                      }`}
                    >
                      {t.yes}
                    </button>
                  </div>
                </div>

                {/* Reset */}
                <div className="mt-2 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg border-2 border-gray-200 text-gray-500 font-bold text-base hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all group"
                  >
                    <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
                    {t.reset}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 print:hidden">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2 sm:p-4 shadow-[0_0_20px_rgba(236,19,30,0.15)] border-2 border-primary/40 ring-4 ring-primary/10 relative z-20">
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider shadow-sm z-50">
                {t.step2}
              </div>

              <div className="px-2 pt-2 pb-4">
                <h3 className="text-lg font-black tracking-tight mb-1 text-primary">{t.chooseProducts}</h3>
                <p className="text-sm text-text-sub mb-2">{t.chooseDesc}</p>
                <p className="text-xs font-bold text-primary bg-red-50 border border-red-100 p-2 rounded-lg inline-block">
                  <span className="mr-1">💡</span> {t.manualHint}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 justify-center sticky top-0 z-40 py-2 -mx-2 px-2 bg-white/95 backdrop-blur-md border-b border-gray-100 mb-4 rounded-b-lg">
                <TabButton active={activeTab === 'meat'} onClick={() => setActiveTab('meat')} icon={<Beef size={18} />} label={t.tabMeat} />
                <TabButton
                  active={activeTab === 'appetizer'}
                  onClick={() => setActiveTab('appetizer')}
                  icon={<UtensilsCrossed size={18} />}
                  label={t.tabApp}
                />
                <TabButton active={activeTab === 'sides'} onClick={() => setActiveTab('sides')} icon={<Bean size={18} />} label={t.tabSides} />
                <TabButton active={activeTab === 'wine'} onClick={() => setActiveTab('wine')} icon={<Wine size={18} />} label={t.tabWine} />
                <TabButton active={activeTab === 'beer'} onClick={() => setActiveTab('beer')} icon={<Beer size={18} />} label={t.tabBeer} />
                <TabButton active={activeTab === 'pisco'} onClick={() => setActiveTab('pisco')} icon={<GlassWater size={18} />} label={t.tabPisco} />
                <TabButton active={activeTab === 'ice'} onClick={() => setActiveTab('ice')} icon={<Snowflake size={18} />} label={t.tabIce} />
                <TabButton active={activeTab === 'drink'} onClick={() => setActiveTab('drink')} icon={<CupSoda size={18} />} label={t.tabDrinks} />
              </div>

              <div className="flex flex-col gap-2">
                {activeTab === 'meat' && (
                  <FoodGrid
                    title={t.titleMeat}
                    items={meatItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-primary"
                    language={language}
                  />
                )}

                {activeTab === 'appetizer' && (
                  <FoodGrid
                    title={t.titleApp}
                    items={appItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-secondary"
                    language={language}
                  />
                )}

                {activeTab === 'sides' && (
                  <>
                    <FoodGrid
                      title={t.titleSalads}
                      items={saladItems}
                      selectedIds={selectedItemIds}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                      onToggle={toggleItem}
                      categoryColor="bg-green-600"
                      language={language}
                    />

                    <FoodGrid
                      title={t.titleAcomp}
                      subtitle={t.acompSubtitle}
                      items={accompanimentItems}
                      selectedIds={selectedItemIds}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                      onToggle={toggleItem}
                      categoryColor="bg-green-600"
                      language={language}
                    />
                  </>
                )}

                {activeTab === 'wine' && (
                  <>
                    <FoodGrid
                      title={t.titleRed}
                      items={wineItemsRed}
                      selectedIds={selectedItemIds}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                      onToggle={toggleItem}
                      categoryColor="bg-purple-700"
                      language={language}
                    />
                    <FoodGrid
                      title={t.titleWhite}
                      items={wineItemsWhite}
                      selectedIds={selectedItemIds}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                      onToggle={toggleItem}
                      categoryColor="bg-yellow-500"
                      language={language}
                    />
                    <FoodGrid
                      title={t.titleSparkling}
                      items={wineItemsSparkling}
                      selectedIds={selectedItemIds}
                      quantities={quantities}
                      onQuantityChange={handleQuantityChange}
                      onToggle={toggleItem}
                      categoryColor="bg-amber-400"
                      language={language}
                    />
                  </>
                )}

                {activeTab === 'pisco' && (
                  <FoodGrid
                    title={t.titlePisco}
                    items={piscoItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-indigo-600"
                    language={language}
                  />
                )}

                {activeTab === 'beer' && (
                  <FoodGrid
                    title={t.titleBeer}
                    items={beerItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-amber-600"
                    language={language}
                  />
                )}

                {activeTab === 'ice' && (
                  <FoodGrid
                    title={t.titleIce}
                    items={iceItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-blue-400"
                    language={language}
                  />
                )}

                {activeTab === 'drink' && (
                  <FoodGrid
                    title={t.titleSoda}
                    items={drinkItems}
                    selectedIds={selectedItemIds}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onToggle={toggleItem}
                    categoryColor="bg-cyan-500"
                    language={language}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div ref={summaryRef} className="lg:col-span-3 print:col-span-12 print:w-full scroll-mt-24">
            <SummaryPanel results={calculationResults} language={language} />
          </div>
        </div>

        <div className="mt-6 lg:mt-8 print:hidden">
          <MercenarioPanel data={mercenarioProfile} language={language} />
        </div>
      </main>

      {/* Mobile Sticky Summary Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 lg:hidden z-50 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sub uppercase font-bold">{t.totalMeat}</span>
            <span className="text-lg font-black text-text-main leading-none">
              {calculationResults.totalMeatKg.toFixed(1)} <span className="text-sm">kg</span>
            </span>
          </div>
          <div className="w-px bg-gray-200 h-auto"></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-sub uppercase font-bold">{t.totalCoal}</span>
            <span className="text-lg font-black text-text-main leading-none">
              {calculationResults.coalBags} <span className="text-sm">{t.bags}</span>
            </span>
          </div>
        </div>
        <button
          onClick={scrollToSummary}
          className="bg-primary text-white px-6 py-3 rounded-lg text-base font-bold flex items-center gap-1 shadow-lg active:scale-95 transition-transform"
        >
          <ShoppingBag size={20} />
          {t.viewDetail}
        </button>
      </div>
    </div>
  );
}

const TabButton = ({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm sm:text-base font-bold transition-all ${
      active
        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
        : 'bg-white border border-gray-200 text-text-main hover:bg-gray-50'
    }`}
  >
    {icon}
    {label}
  </button>
);
