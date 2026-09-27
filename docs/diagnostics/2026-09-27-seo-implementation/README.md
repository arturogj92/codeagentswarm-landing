# Implementación SEO del 27 de septiembre de 2026

Base: `f5ec209` (`origin/master` local al empezar). Este documento recoge los cambios y la validación previos a la publicación autorizada por Arturo. Las notas de investigación anteriores se conservan localmente en el worktree de Astra.

## Cambios aplicados

1. **Agent Teams, seis páginas EN/ES.** Corregidos descripción, introducción, comparación, CTA y FAQ que confundían equipos con subagentes y atribuían un contexto compartido. Las dos comparativas incluyen activación en shell y PowerShell, estado experimental, limitaciones y enlace al coordinador. El JSON-LD deriva de las mismas FAQ. Se mantienen H1, metaTitle, slug y alternateSlug de todas las páginas editadas.
2. **Siguiente lectura editorial: siete parejas, 14 páginas.** `relatedSlug` en los metadatos permite una elección local por intención. Se conserva el fallback por agente cuando no hay destino válido y se impiden recomendaciones a otro idioma o a la misma guía. Los enlaces contextuales nuevos siguen a la respuesta inicial; se reutilizan los enlaces que ya existían. No se añade instrumentación: `guide_related_click` ya registra origen y destino.
3. **Lectura sin hidratación.** Cabeceras, secciones, tarjetas del índice y recomendaciones se renderizan visibles. Las FAQ usan `details/summary` y el índice de contenidos usa enlaces a fragmentos; ambos funcionan sin JS. El logo y los enlaces de navegación también parten visibles.
4. **Correcciones puntuales de comparativas.** La guía general y Vibe Kanban actualizan las afirmaciones de inactividad con evidencia de la rama principal. Conductor conserva sus hechos de terceros fechados y su intención comparativa; se elimina el recuento obsoleto de siete agentes de CodeAgentSwarm, sin inventar un nuevo límite.

| Origen EN (con equivalente ES) | Siguiente lectura |
| --- | --- |
| claude-code-agent-teams-vs-codeagentswarm | ai-coding-agent-coordinator |
| claude-code-agent-swarm | claude-code-dashboard |
| ai-cli-agent-swarm | git-worktrees-for-ai-coding-agents |
| run-multiple-claude-code-sessions | claude-code-gui |
| codex-agent-swarm | codex-gui |
| git-worktrees-for-ai-coding-agents | auto-kanban-ai-coding-agents |
| auto-kanban-ai-coding-agents | ai-coding-agent-coordinator |

## Evidencia y límites

- [Documentación oficial de Agent Teams](https://code.claude.com/docs/en/agent-teams): sesiones/contextos independientes, líder, tareas, mensajes, activación experimental. La guía distingue contexto propio de cuota de cuenta.
- Se ejecutó `node scripts/competitor-refresh.mjs` contra la API pública. Los cambios de estrellas se tratan como variación de una instantánea histórica, no como justificación para reescribir cada comparativa.
- Se verificaron aparte los commits de la rama principal: [Vibe Kanban, corrección del router del 19 de septiembre](https://github.com/BloopAI/vibe-kanban/commit/d5cbb5380fa0b32e98ef9b8d987f63decce4be3a) y [opcode, edición del README del 18 de septiembre](https://github.com/winfunc/opcode/commit/d1ca30a3c0c39fff01fde2f86c2d5af6a1db658b). La segunda no prueba mantenimiento funcional. Datos de respuesta guardados en `competitor-default-branches.json`.
- [Conductor](https://www.conductor.build/), [precios](https://www.conductor.build/pricing) y [documentación](https://www.conductor.build/docs) contrastados; la muestra no justificó cambiar precios o reorientar el título. No se renuevan en bloque fechas de verificación de terceros.
- La lectura sin JS corrige un problema comprobado de presentación. No demuestra una mejora de posición ni que Google estuviera bloqueado.

## Validación

- `node --test components/seo-conversion-regressions.test.mjs`: 15 pruebas correctas, incluidas elección editorial, fallback, idioma y autorreferencias.
- `npm run build -- --no-lint`: compilación de producción y comprobación de tipos correctas, 257 páginas generadas. El build normal encontró un conflicto de ESLint entre el worktree y su directorio padre; por eso lint se ejecutó aparte con `./node_modules/.bin/eslint --no-eslintrc --config .eslintrc.json components/guides content/guides`: 0 errores, 3 advertencias preexistentes sobre imágenes.
- `node scripts/check-seo-editorial.mjs`: 200 guías, alternates recíprocos, enlaces/fragmentos internos, 14 recomendaciones y seis páginas con paridad FAQ/JSON-LD y canonical correctos.
- `node scripts/check-product-discovery.mjs`: 10 páginas de producto/home/about EN/ES, FAQ, schema, indexabilidad, sitemap y enlaces correctos.
- Checks de release: `check-release-agents.mjs`, `check-pi-seo.mjs`, `check-devin-seo.mjs` y `check-muse-seo.mjs` correctos.
- Comparación adicional con la base Git: las 20 guías editadas conservan slug, idioma, H1, metaTitle y alternateSlug.
- Navegador local: 48 comprobaciones correctas (8 rutas, EN/ES, 1440 y 390 px, JS normal, JS desactivado y chunks bloqueados), sin errores de hidratación en modo normal. Se comprueba texto visible, ausencia de desbordamiento horizontal, FAQ nativa y navegación por fragmentos en escritorio. Resultados y capturas junto a este documento. No se enviaron eventos a analítica de producción; se bloquearon servicios externos.

## Medición al desplegar

Registrar commit y fecha/hora real del despliegue. El 27 de septiembre de este documento es fecha de implementación, no de publicación.

- Corrección factual: comprobar en producción las seis páginas y su JSON-LD; controlar consultas de marca y no marca por separado. No usar el CTR agregado como evidencia de que falla la intención Agent Teams.
- Enlaces: usar `guide_related_click` por `from/to`, vistas del destino y clicks de descarga por pageview, con numeradores y denominadores. Comparar 28 días completos previos y posteriores cuando existan, excluyendo el día parcial de despliegue. Son observaciones, no un ensayo causal.
- Comparativas: seguir sus consultas visibles y páginas, sin interpretar las consultas omitidas del export como demanda inexistente ni los datos de Search Console como volumen total de mercado.
- Los exports global y por página obtenidos durante el debate no sustituyen la comparación temporal de las revisiones del 1, 5, 12 y 24 de septiembre. Esa medición sigue pendiente; por eso no se reescriben snippets de precios/historial, no se fusionan páginas ni se amplía aquí el piloto a pricing.
- No se añaden hubs, nuevas URLs, schema para asistentes ni cambios de CDN. La línea base de asistentes permanece separada del SEO clásico.
