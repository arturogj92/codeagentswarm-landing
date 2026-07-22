// Única fuente de verdad de las preguntas del FAQ de la home.
//
// La lista vivía duplicada a mano en dos sitios: el acordeón visible
// (components/FAQSection.tsx) y el schema FAQPage de JSON-LD
// (app/[locale]/page.tsx). Al añadir la pregunta de Kimi Code se actualizó solo
// el acordeón, así que la pregunta salía en pantalla pero no en los datos
// estructurados que lee Google. Importa `buildFaqItems` en los dos sitios para
// que no puedan volver a desincronizarse.

export const FAQ_ITEM_COUNT = 15

export type FaqItem = { q: string; a: string }

export function buildFaqItems(t: (key: string) => string): FaqItem[] {
  return Array.from({ length: FAQ_ITEM_COUNT }, (_, i) => ({
    q: t(`items.q${i + 1}`),
    a: t(`items.a${i + 1}`),
  }))
}
