import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Lightbulb,
  ThumbsUp,
  List,
  X,
  MessageSquareText,
  Calendar,
  Star,
  Plus,
  Trash2,
} from "lucide-react";
import { CalculationResult } from "../types";

interface SummaryPanelProps {
  results: CalculationResult;
  language: "es" | "en";
}

// Custom WhatsApp Icon for branding
const WhatsAppIcon = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const BBQ_TIPS_ES = [
  {
    title: "Limpieza impecable",
    text: "Antes de cualquier asado, la parrilla debe estar reluciente. Una rejilla sucia afecta el sellado y el sabor final de la carne.",
  },
  {
    title: "Temperatura ambiente",
    text: "Nunca pongas la carne directo del refrigerador al fuego. Déjala reposar fuera unos 30 minutos para que la cocción interna sea pareja.",
  },
  {
    title: 'El "Manual del Hueso"',
    text: "Si el corte tiene hueso (como el costillar o asado de tira), comienza siempre cocinando por ese lado. El hueso actúa como un escudo térmico que protege los jugos.",
  },
  {
    title: "Sellar para triunfar",
    text: "Empieza con la parrilla bien caliente para sellar la carne por ambos lados. Esto bloquea los jugos en el interior y mejora la textura.",
  },
  {
    title: "Prohibido pinchar",
    text: "Usa pinzas, nunca tenedores o cuchillos para dar vuelta la carne. Cada pinchazo es una vía de escape para los jugos que garantizan la sabrosura.",
  },
  {
    title: "Paciencia con el fuego",
    text: "Cocina con brasas potentes, no con llamas directas. El fuego debe ser constante y suave para cortes grandes como el costillar.",
  },
  {
    title: "Sal parrillera",
    text: "Prefiere siempre la sal gruesa (o de Cahuil). Aplícala justo antes o durante la cocción para que la carne absorba solo lo necesario sin deshidratarse.",
  },
  {
    title: "Menos es más (vueltas)",
    text: 'Evita manipular la carne en exceso. Da vuelta el corte solo cuando veas que la parte superior está tibia o empieza a "sudar" jugos.',
  },
  {
    title: "El reposo sagrado",
    text: "Una vez fuera de la parrilla, deja descansar la carne de 5 a 10 minutos antes de cortarla. Esto permite que los jugos se redistribuyan y no se pierdan en la tabla.",
  },
  {
    title: "Cortes estratégicos",
    text: 'Elige cortes chilenos confiables: para algo premium busca punta de ganso o entraña; para algo "BBB" prefiere huachalomo, sobrecostilla o punta paleta.',
  },
];

const BBQ_TIPS_EN = [
  {
    title: "Impeccable Cleaning",
    text: "Before any BBQ, the grill must be sparkling clean. A dirty grate affects the sear and final flavor of the meat.",
  },
  {
    title: "Room Temperature",
    text: "Never put meat straight from the fridge to the fire. Let it rest outside for about 30 minutes so internal cooking is even.",
  },
  {
    title: 'The "Bone Manual"',
    text: "If the cut has bone (like ribs), always start cooking on that side. The bone acts as a thermal shield protecting the juices.",
  },
  {
    title: "Sear to Win",
    text: "Start with a very hot grill to sear the meat on both sides. This locks juices inside and improves texture.",
  },
  {
    title: "Do Not Pierce",
    text: "Use tongs, never forks or knives to turn the meat. Every puncture is an escape route for the juices that guarantee flavor.",
  },
  {
    title: "Patience with Fire",
    text: "Cook with powerful embers, not direct flames. The heat should be constant and gentle for large cuts like ribs.",
  },
  {
    title: "Grilling Salt",
    text: "Always prefer coarse salt. Apply it just before or during cooking so the meat absorbs only what is necessary without dehydrating.",
  },
  {
    title: "Less is More (Flipping)",
    text: 'Avoid handling the meat excessively. Flip the cut only when you see the top part is warm or starts to "sweat" juices.',
  },
  {
    title: "The Sacred Rest",
    text: "Once off the grill, let the meat rest for 5 to 10 minutes before cutting. This allows juices to redistribute and not be lost on the board.",
  },
  {
    title: "Strategic Cuts",
    text: "Choose reliable Chilean cuts: for something premium look for Punta de Ganso or Entraña; for value, prefer Huachalomo, Sobrecostilla or Punta Paleta.",
  },
];

const SummaryPanel: React.FC<SummaryPanelProps> = ({ results, language }) => {
  const tips = language === "es" ? BBQ_TIPS_ES : BBQ_TIPS_EN;

  // ✅ GA4 helper (gtag)
  const track = (eventName: string, params: Record<string, any> = {}) => {
    const gtag = (window as any)?.gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    }
  };

  // Start with a random tip
  const [currentTipIndex, setCurrentTipIndex] = useState(() =>
    Math.floor(Math.random() * tips.length)
  );
  const [showAllTips, setShowAllTips] = useState(false);
  const [eventDate, setEventDate] = useState("");

  // ✅ "Otra" (custom items) state
  const [otherText, setOtherText] = useState("");
  const [otherItems, setOtherItems] = useState<string[]>([]);

  const addOtherItem = () => {
    const val = otherText.trim();
    if (!val) return;

    // Avoid duplicates (case-insensitive)
    const exists = otherItems.some((x) => x.toLowerCase() === val.toLowerCase());
    if (exists) {
      setOtherText("");
      return;
    }

    setOtherItems((prev) => [...prev, val]);
    setOtherText("");
    track("add_other_item", { language });
  };

  const removeOtherItem = (idx: number) => {
    setOtherItems((prev) => prev.filter((_, i) => i !== idx));
    track("remove_other_item", { language });
  };

  // Auto-rotate tips every 8 seconds
  useEffect(() => {
    if (showAllTips) return; // Pause rotation if modal is open
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [showAllTips, tips.length]);

  const handleShareWhatsApp = () => {
    // ✅ Track share action (viral loop)
    track("share_whatsapp_list", {
      language,
      has_event_date: !!eventDate,
      other_items_count: otherItems.length,
      total_meat_kg: Number(
        ((results.totalMeatKg ?? 0) as number).toFixed?.(1) ?? (results.totalMeatKg ?? 0)
      ),
      coal_bags: results.coalBags ?? 0,
      beers_units: results.totalBeerUnits ?? 0,
      bread_units: results.breadUnits ?? 0,
    });

    // Empty start
    let message = "";

    if (eventDate) {
      const [year, month, day] = eventDate.split("-");
      message +=
        language === "es"
          ? `📅 *Fecha del Carrete:* ${day}/${month}/${year}\n`
          : `📅 *Party Date:* ${day}/${month}/${year}\n`;
      message +=
        language === "es"
          ? "🛒 *Esta es la lista para las compras:*\n\n"
          : "🛒 *Shopping List:*\n\n";
    } else {
      message +=
        language === "es"
          ? "🛒 *Lista de Compras:*\n\n"
          : "🛒 *Shopping List:*\n\n";
    }

    const tt = {
      beef: language === "es" ? "Vacuno" : "Beef",
      pork: language === "es" ? "Cerdo" : "Pork",
      chicken: language === "es" ? "Pollo" : "Chicken",
      totalMeat: language === "es" ? "Total Carne" : "Total Meat",
      coal: language === "es" ? "Carbón" : "Charcoal",
      bags: language === "es" ? "bolsas" : "bags",
      drinks: language === "es" ? "Bebestibles" : "Drinks",
      beer: language === "es" ? "Cervezas" : "Beers",
      units: language === "es" ? "unid." : "units",
      bread: language === "es" ? "Pan" : "Bread",
      detail: language === "es" ? "Detalle" : "Detail",
      other: language === "es" ? "Otros" : "Other",
      footer:
        language === "es"
          ? "Usa tu también la app entra a https://planificadorasado.netlify.app/"
          : "Try the app yourself at https://planificadorasado.netlify.app/",
    };

    if (results.totalBeefKg > 0) message += `● *${tt.beef}:* ${results.totalBeefKg.toFixed(1)} kg\n`;
    if (results.totalPorkKg > 0) message += `● *${tt.pork}:* ${results.totalPorkKg.toFixed(1)} kg\n`;
    if (results.totalChickenKg > 0) message += `● *${tt.chicken}:* ${results.totalChickenKg.toFixed(1)} kg\n`;

    if (
      results.totalBeefKg === 0 &&
      results.totalPorkKg === 0 &&
      results.totalChickenKg === 0 &&
      results.totalMeatKg > 0
    ) {
      message += `● *${tt.totalMeat}:* ${results.totalMeatKg.toFixed(1)} kg\n`;
    }

    if (results.meatDetails?.length > 0) {
      message += `\n*${tt.detail}:*\n`;
      results.meatDetails.forEach((detail) => {
        message += `- ${detail.name}: ${detail.amount}\n`;
      });
    }

    // ✅ Append "Otros"
    if (otherItems.length > 0) {
      message += `\n*${tt.other}:*\n`;
      otherItems.forEach((item) => {
        message += `- ${item}\n`;
      });
    }

    message += `\n● *${tt.coal}:* ${results.coalBags} ${tt.bags}`;

    if (results.drinksLiters > 0) {
      message += `\n● *${tt.drinks}:* ${results.drinksLiters.toFixed(0)} lts`;
    }
    if (results.totalBeerUnits > 0) {
      message += `\n● *${tt.beer}:* ${results.totalBeerUnits} ${tt.units}`;
    }
    if (results.breadUnits > 0) {
      message += `\n● *${tt.bread}:* ${results.breadUnits} ${tt.units}`;
    }

    message += `\n\n${tt.footer}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  const currentTip = tips[currentTipIndex];

  // Translations
  const t = {
    step3: language === "es" ? "Paso 3" : "Step 3",
    totals: language === "es" ? "Totales de Compra" : "Shopping Totals",
    review:
      language === "es"
        ? "Revisa el resumen y comparte la lista"
        : "Review summary and share the list",
    dateLabel: language === "es" ? "La fecha del carrete" : "Party Date",
    shareBtn:
      language === "es"
        ? "Comparte la lista con tus amigos"
        : "Share the list with friends",
    tipTitle: language === "es" ? "Tip Parrillero" : "BBQ Pro Tip",
    viewTips: language === "es" ? "Ver todos los tips" : "View all tips",
    hireTitle:
      language === "es" ? "¿Quieres que yo haga el asado?" : "Want me to do the BBQ?",
    hireDesc:
      language === "es"
        ? "Si quieres disfrutar con tus invitados y olvidarte de la parrilla, contrata el servicio completo en tu casa."
        : "If you want to enjoy with guests and forget about the grill, hire the full service at your home.",
    hireBtn: language === "es" ? "Escribir al Parrillero" : "Contact the Grill Master",
    premium: language === "es" ? "Servicio Premium" : "Premium Service",
    opinionTitle: language === "es" ? "¡Tu opinión nos importa!" : "Your opinion matters!",
    opinionDesc:
      language === "es"
        ? "¿Crees que falta algo? ¿Te gustó la app? Ayúdanos a mejorar para el próximo asado."
        : "Missing something? Liked the app? Help us improve for the next BBQ.",
    opinionBtn: language === "es" ? "Enviar Comentarios" : "Send Feedback",
    modalTitle: language === "es" ? "Decálogo del Parrillero" : "Grill Master Commandments",
    modalDesc:
      language === "es"
        ? "10 mandamientos para un asado perfecto"
        : "10 commandments for a perfect BBQ",
    modalBtn:
      language === "es" ? "Entendido, ¡A la parrilla!" : "Got it, let's grill!",
    suggestedDetail: language === "es" ? "Detalle Sugerido" : "Suggested Detail",
    selectForDetail:
      language === "es"
        ? "Selecciona cortes para ver detalle."
        : "Select cuts to view details.",
    // ✅ Other section
    otherTitle: language === "es" ? "Otra" : "Other",
    otherHint:
      language === "es"
        ? "Escribe algo que falte y agrégalo a la lista"
        : "Write something missing and add it to the list",
    otherPlaceholder:
      language === "es"
        ? "Ej: servilletas, pebre, carbón extra..."
        : "Ex: napkins, sauce, extra charcoal...",
    add: language === "es" ? "Agregar" : "Add",
    otherListTitle: language === "es" ? "Otros" : "Other items",
    labels: {
      beef: language === "es" ? "Vacuno" : "Beef",
      pork: language === "es" ? "Cerdo" : "Pork",
      chicken: language === "es" ? "Pollo" : "Chicken",
      totalMeat: language === "es" ? "Total Carne" : "Total Meat",
      coal: language === "es" ? "Carbón" : "Charcoal",
      drinks: language === "es" ? "Bebestibles" : "Drinks",
      beer: language === "es" ? "Cervezas" : "Beers",
      bread: language === "es" ? "Pan" : "Bread",
      bags: language === "es" ? "bolsas" : "bags",
      units: language === "es" ? "unid." : "units",
      liters: "lts",
    },
  };

  const canAddOther = otherText.trim().length > 0;

  return (
    <div className="sticky top-24 flex flex-col gap-4 print:static print:block">
      {/* STEP 3 CARD */}
      <div className="bg-white rounded-xl p-5 shadow-[0_0_20px_rgba(236,19,30,0.15)] border-2 border-primary/40 ring-4 ring-primary/10 relative overflow-hidden z-20 print:shadow-none print:border print:border-gray-300 print:break-inside-avoid">
        {/* Step Badge */}
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider shadow-sm z-50 print:hidden">
          {t.step3}
        </div>

        {/* Header */}
        <div className="mb-4 pr-12">
          <h3 className="text-lg font-black tracking-tight mb-1 text-primary flex items-center gap-2">
            <ShoppingBag size={22} />
            {t.totals}
          </h3>
          <p className="text-sm text-text-sub">{t.review}</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Date Picker */}
          <div className="mb-2">
            <label className="text-xs font-bold text-text-sub uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar size={14} />
              {t.dateLabel}
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-surface-off border border-gray-200 rounded-lg px-3 py-3 text-text-main font-bold text-base focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-gray-50 transition-colors"
            />
          </div>

          {/* Big Number Grid */}
          <div className="grid grid-cols-2 gap-3">
            {results.totalBeefKg > 0 && (
              <SummaryCard label={t.labels.beef} value={results.totalBeefKg.toFixed(1)} unit="kg" />
            )}
            {results.totalPorkKg > 0 && (
              <SummaryCard label={t.labels.pork} value={results.totalPorkKg.toFixed(1)} unit="kg" />
            )}
            {results.totalChickenKg > 0 && (
              <SummaryCard label={t.labels.chicken} value={results.totalChickenKg.toFixed(1)} unit="kg" />
            )}
            {results.totalBeefKg === 0 &&
              results.totalPorkKg === 0 &&
              results.totalChickenKg === 0 && (
                <SummaryCard label={t.labels.totalMeat} value={results.totalMeatKg.toFixed(1)} unit="kg" />
              )}

            <SummaryCard label={t.labels.coal} value={results.coalBags} unit={t.labels.bags} />

            {results.drinksLiters > 0 && (
              <SummaryCard label={t.labels.drinks} value={results.drinksLiters.toFixed(0)} unit={t.labels.liters} />
            )}
            {results.totalBeerUnits > 0 && (
              <SummaryCard label={t.labels.beer} value={results.totalBeerUnits} unit={t.labels.units} />
            )}
            {results.breadUnits > 0 && (
              <SummaryCard label={t.labels.bread} value={results.breadUnits} unit={t.labels.units} />
            )}
          </div>

          {/* Details List */}
          <div className="flex flex-col gap-2 pt-2">
            <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider mb-2">
              {t.suggestedDetail}
            </h4>

            {results.meatDetails?.length > 0 ? (
              results.meatDetails.map((detail, idx) => (
                <div key={`${detail.name}-${idx}`} className="flex justify-between text-sm text-text-sub">
                  <span>{detail.name}</span>
                  <span className="font-bold text-text-main">{detail.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">{t.selectForDetail}</p>
            )}
          </div>

          {/* ✅ Other (custom) section */}
          <div className="mt-2 rounded-xl border border-gray-200 bg-surface-off p-3">
            <div className="mb-2">
              <h4 className="text-xs font-bold text-text-sub uppercase tracking-wider">{t.otherTitle}</h4>
              <p className="text-xs text-text-sub mt-0.5">{t.otherHint}</p>
            </div>

            {/* ✅ FIX: responsive layout (mobile column / sm row) + SaaS disabled */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addOtherItem();
                }}
                placeholder={t.otherPlaceholder}
                className="w-full flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-text-main font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />

              <button
                type="button"
                onClick={addOtherItem}
                disabled={!canAddOther}
                aria-disabled={!canAddOther}
                className={[
                  "w-full sm:w-auto px-3 py-2 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5",
                  canAddOther
                    ? "bg-primary text-white hover:shadow-md active:scale-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none",
                ].join(" ")}
                title={!canAddOther ? (language === "es" ? "Escribe algo primero" : "Type something first") : undefined}
              >
                <Plus size={16} />
                {t.add}
              </button>
            </div>

            {otherItems.length > 0 && (
              <div className="mt-3">
                <div className="text-[10px] uppercase font-bold text-text-sub mb-2">{t.otherListTitle}</div>
                <div className="flex flex-col gap-2">
                  {otherItems.map((it, idx) => (
                    <div
                      key={`${it}-${idx}`}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm font-semibold text-text-main">{it}</span>
                      <button
                        type="button"
                        onClick={() => removeOtherItem(idx)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        aria-label="remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-100 w-full my-1" />

          {/* Actions */}
          <button
            onClick={handleShareWhatsApp}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-14 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 print:hidden"
          >
            <WhatsAppIcon size={20} />
            <span className="truncate">{t.shareBtn}</span>
          </button>
        </div>
      </div>

      {/* Rotating Tip Card */}
      <div className="bg-secondary rounded-xl shadow-md p-6 text-white relative overflow-hidden group transition-all duration-500 hover:shadow-xl print:hidden">
        <div className="absolute -right-8 -top-8 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500 scale-150">
          <ThumbsUp size={140} strokeWidth={1.5} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <h4 className="font-black text-xl mb-4 flex items-center gap-2 uppercase tracking-wide text-white/90">
            <Lightbulb size={24} className="text-yellow-300" strokeWidth={2.5} />
            {t.tipTitle}
          </h4>

          <div className="min-h-[140px] flex flex-col justify-center">
            <h5
              key={currentTipIndex}
              className="font-black text-yellow-300 text-2xl sm:text-3xl mb-3 leading-tight animate-in fade-in slide-in-from-right-4 duration-500"
            >
              {currentTip.title}
            </h5>
            <p
              key={`${currentTipIndex}-text`}
              className="text-base sm:text-lg text-white/95 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-2 duration-700"
            >
              {currentTip.text}
            </p>
          </div>

          <button
            onClick={() => {
              track("open_tips_modal", { language });
              setShowAllTips(true);
            }}
            className="mt-4 flex items-center gap-2 text-base font-bold text-white/70 hover:text-white transition-colors self-start border-b-2 border-transparent hover:border-yellow-300 pb-0.5"
          >
            <List size={18} />
            {t.viewTips}
          </button>
        </div>
      </div>

      {/* Hire Me */}
      <div className="bg-[#181111] rounded-xl shadow-xl overflow-hidden border-2 border-yellow-500/30 group hover:border-yellow-500/60 transition-colors duration-300 print:hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#181111] via-transparent to-transparent z-10 opacity-60" />
          <img
            src="https://i.imgur.com/S0eiRmP.png"
            alt="Servicio de Asado"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-yellow-500 text-[#181111] text-xs font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
              {t.premium}
            </span>
          </div>
        </div>

        <div className="p-5 pt-0 relative z-20 -mt-10">
          <h4 className="font-black text-3xl text-white mb-2 italic leading-none uppercase drop-shadow-lg">
            {t.hireTitle}
          </h4>

          <p className="text-sm text-gray-200 mb-6 font-medium leading-relaxed drop-shadow-md bg-[#181111]/40 p-2 rounded backdrop-blur-sm border border-white/5">
            {t.hireDesc}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href={
                language === "es"
                  ? "https://wa.me/56954185418?text=Quiero%20que%20me%20hagas%20el%20asado"
                  : "https://wa.me/56954185418?text=I%20want%20you%20to%20do%20the%20BBQ"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_grill_master", { language })}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-[#25D366]/20 transition-all active:scale-95 w-full"
            >
              <WhatsAppIcon size={22} />
              {t.hireBtn}
            </a>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg border border-indigo-100 p-6 relative overflow-hidden group print:hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <MessageSquareText size={120} className="text-indigo-600 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white p-3 rounded-full shadow-md mb-3 text-indigo-600 ring-4 ring-indigo-100 animate-in zoom-in duration-500">
            <Star size={28} fill="currentColor" className="text-yellow-400" strokeWidth={1} />
          </div>

          <h4 className="text-xl font-black text-indigo-900 mb-2">{t.opinionTitle}</h4>
          <p className="text-sm text-indigo-700/80 mb-5 font-medium max-w-xs mx-auto">
            {t.opinionDesc}
          </p>

          <a
            href="https://forms.fillout.com/t/w5EfHMxGbEus"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("open_feedback_form", { language })}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageSquareText size={20} />
            {t.opinionBtn}
          </a>
        </div>
      </div>

      {/* All Tips Modal */}
      {showAllTips && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-surface-off rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-secondary p-2 rounded-lg">
                  <ThumbsUp size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-text-main">{t.modalTitle}</h2>
                  <p className="text-sm text-text-sub">{t.modalDesc}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAllTips(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-text-sub"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="overflow-y-auto p-6 scrollbar-hide">
              <div className="grid grid-cols-1 gap-4">
                {tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black text-sm group-hover:bg-secondary group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-main mb-1 text-base">{tip.title}</h3>
                      <p className="text-sm text-text-sub leading-relaxed">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-surface-off rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowAllTips(false)}
                className="px-6 py-2.5 bg-text-main text-white font-bold rounded-lg hover:bg-black transition-colors"
              >
                {t.modalBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit: string;
}) => (
  <div className="bg-surface-off p-3 rounded-lg border border-gray-100">
    <span className="text-[10px] uppercase font-bold text-text-sub block mb-1">{label}</span>
    <span className="text-xl font-bold text-text-main tracking-tight">
      {value} <span className="text-xs font-semibold text-text-sub ml-0.5">{unit}</span>
    </span>
  </div>
);

export default SummaryPanel;