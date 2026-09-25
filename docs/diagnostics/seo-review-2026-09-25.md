# Revisión SEO del 25 de septiembre de 2026

El tráfico de Google crece y las guías generan más clics de descarga. En las dos últimas ventanas de 14 días, la tasa de clic en descarga de las guías pasa del 0,835% al 1,717%. La mejora se concentra en el bloque de producto. El CTR de Google continúa bajo y el botón intermedio no alcanza el objetivo pendiente.

## Fuentes y alcance

- Search Console: `codeagentswarm.com-Performance-on-Search-2026-09-25.zip`, en Downloads. Contiene Chart, Queries, Pages, Countries, Devices, Search appearance y Filters. Search type: Web. Datos del 23 de junio al 22 de septiembre, 92 días. No incluye el 23, 24 o 25 de septiembre.
- Umami: API consultada el 25 de septiembre. Comparación principal: 26 de agosto a 8 de septiembre frente a 9 a 22 de septiembre, días completos UTC, 14 días por ventana y los mismos días de la semana. Consultados también 17 a 30 de agosto, 1 a 14 de septiembre y 23 a 24 de septiembre.
- Recalculada la línea base del 24 al 30 de agosto usando páginas vistas reales.
- Historial local de publicación: cambios de conversión el 31 de agosto, 5 y 12 de septiembre. El 12 también se corrigió el denominador del informe diario. Referencia: `docs/seo-operations.md`.
- Cálculos y respuestas originales de esta ejecución: `/tmp/cas-seo-20260925/`. No se incorporan credenciales ni registros individuales a Git.

Los días de Umami usan UTC; Search Console usa su propio corte diario. Se comparan tendencias entre fuentes, sin intentar reconciliar cada visita con un clic de Google. Las ventanas de Umami excluyen el incidente de bots del 3 de agosto y la caída del tracking del 10 de agosto. La serie diaria revisada no muestra un nuevo salto de tráfico que duplique su entorno comparable; esto no certifica la ausencia de bots.

## Google

| Métrica | 29 jul a 25 ago | 26 ago a 22 sep | Cambio |
| --- | ---: | ---: | ---: |
| Clics | 8.422 | 12.725 | +51,1% |
| Impresiones | 866.120 | 1.648.212 | +90,3% |
| CTR | 0,972% | 0,772% | -0,200 puntos |
| Posición media aproximada | 6,16 | 5,95 | Mejora |

En los últimos 14 días frente a los 14 anteriores, los clics crecen de 6.009 a 6.716 (+11,8%), las impresiones de 754.423 a 893.789 (+18,5%) y el CTR baja de 0,797% a 0,751%. La posición permanece prácticamente estable: 5,93 frente a 5,97. La última semana completa suma 3.508 clics frente a 3.208 (+9,4%). La meseta descrita el 8 de septiembre no caracteriza toda la evolución posterior.

El total de los 92 días es 25.678 clics y 3.010.235 impresiones. El CTR se calcula con los totales; la posición se aproxima ponderando las posiciones diarias redondeadas del CSV por sus impresiones.

Las impresiones crecen más que los clics. El export no permite atribuir esa diferencia a AI Overviews: la explicación anterior sobre respuestas sin clic queda como hipótesis, no como causa demostrada.

## Descargas desde la web

| Métrica de Umami | 26 ago a 8 sep | 9 a 22 sep | Cambio |
| --- | ---: | ---: | ---: |
| Visitantes del sitio | 13.276 | 14.092 | +6,1% |
| Páginas vistas del sitio | 15.931 | 16.953 | +6,4% |
| Páginas vistas de artículos | 13.775 | 15.144 | +9,9% |
| Clics de descarga desde guías | 115 | 260 | +126,1% |
| Clics por página vista de guía | 0,835% | 1,717% | +105,6% relativo |
| Clics con fuente home | 338 | 317 | -6,2% |
| Clics home + guías | 453 | 577 | +27,4% |

Se suman las cuatro plataformas de `download_app_guide_*` y `download_app_home_*` por separado. No se añaden los eventos legacy de CTA, los clics del simulador ni las solicitudes de instalador. La tasa de guías usa artículos concretos y excluye los índices. Las páginas vistas provienen de `metrics/expanded`, no de los visitantes por URL del endpoint básico. La suma de todas las URLs coincide con `stats.pageviews` en las cuatro ventanas principales.

Las guías representan el 89,3% de las páginas vistas recientes. El incremento absoluto de clics home + guías procede de las guías. No se calcula una tasa global de home usando visitantes de todo el sitio, ni sumando visitantes de URLs con fragmentos como si fueran personas distintas.

Son clics de descarga, no instalaciones confirmadas ni usuarios nuevos. Los detalles paginados devuelven 114 y 258 eventos frente a 115 y 260 en los agregados y propiedades; la diferencia de 1 y 2 registros no quedó explicada. En ese detalle se observan 97 y 223 identificadores de sesión con clic, respectivamente. Por tanto, las repeticiones no explican toda la mejora, aunque tampoco se atribuye cada sesión a una persona nueva.

Ejemplo de por qué no usar clics como personas: Kimi Windows ES registra 10 clics en una sola sesión. Se excluye como evidencia de alta conversión. Los 12 clics de Codex GUI corresponden a 12 sesiones observadas.

Los días 23 y 24 de septiembre, fuera del corte de Google, añaden 2.532 páginas vistas, 38 clics desde guías y 39 con fuente home. Se mantienen aparte de las ventanas comparables.

## Dónde aumentan los clics

| Posición del botón en las guías | Clics anteriores | Clics recientes | Tasa anterior | Tasa reciente |
| --- | ---: | ---: | ---: | ---: |
| Bloque de producto | 78 | 209 | 0,566% | 1,380% |
| Intermedio | 24 | 32 | 0,174% | 0,211% |
| Final | 13 | 19 | 0,094% | 0,125% |

El bloque de producto aporta el 80,4% de los clics recientes y 131 de los 145 clics adicionales. Esta concentración es compatible con los cambios de septiembre, pero no demuestra causalidad: hubo varias publicaciones y cambios en el tráfico. Conservar el bloque actual y medir la ventana completa del 13 al 26 de septiembre cuando estén disponibles esos días.

La comparación de 17 a 30 de agosto con 1 a 14 de septiembre no demuestra una mejora del cambio del 31 de agosto: 134/12.182 (1,100%) frente a 157/14.766 (1,063%). Son dos ventanas de 14 días con los mismos días de la semana en conjunto; la segunda contiene además los cambios del 5 y del 12. El denominador replica la selección de artículos del informe existente y excluye una página vista adicional a un ancla de artículo en la primera ventana.

La línea base original del 24 al 30 de agosto era 71 clics totales y 18 intermedios. La API devuelve **6.581 páginas vistas**, frente a las 6.034 registradas como tal en STATUS. Los valores corregidos son 1,079% total y 0,274% intermedio. Un objetivo de mejora del 20% del intermedio sería 0,328%, frente al antiguo 0,358%. El resultado reciente, 0,211%, no alcanza ninguno de los dos. La conversión total sí supera la línea base corregida.

## Dónde concentrar el trabajo

Datos de Umami del 9 al 22 de septiembre; los clics de estas páginas se contrastaron con filtros por URL real:

| Guía EN | Páginas vistas | Clics de descarga | Tasa |
| --- | ---: | ---: | ---: |
| Codex YOLO | 1.466 | 1 | 0,068% |
| Precios de Claude Code | 1.194 | 7 | 0,586% |
| OpenCode en Windows | 527 | 17 | 3,226% |
| Varias sesiones de Claude Code | 442 | 12 | 2,715% |
| Codex GUI | 154 | 12 | 7,792% |
| Claude Code dashboard | 74 | 8 | 10,811% |

Las muestras pequeñas de GUI/dashboard son señales para priorizar, no tasas garantizadas al aumentar el tráfico. Codex YOLO lidera los clics de Google en el export completo (3.028), pero aporta muy pocos clics directos de descarga recientes. Podría ayudar a conversiones posteriores en otras páginas; ese efecto no se midió.

En Google, las oportunidades de CTR de los 92 días incluyen:

- Precios de Claude Code: 583.145 impresiones, 1.497 clics, CTR 0,26%, posición 7,08.
- Historial de Claude Code: 382.024 impresiones, 2.053 clics, CTR 0,54%, posición 5,23.
- Precios de Kimi: 177.675 impresiones, 768 clics, CTR 0,43%, posición 6,17.

El CSV incluye 1.000 consultas, que representan el 27,1% de los clics totales. Pages y Queries son acumulados de los 92 días: no tienen desglose diario ni cruce consulta/página. **La comparación exacta del CTR del clúster de precios antes y después del 1 de septiembre sigue sin resolverse con este export.** No se restan exports de tres meses con comienzos distintos. Tampoco se suman impresiones por página para sustituir el total de propiedad: Google documenta agregaciones diferentes en [la explicación del informe](https://support.google.com/webmasters/answer/7576553?hl=en).

Devin precios y SWE-2 benchmarks ya suman 155 y 171 clics de Google en EN, respectivamente. Pi vs OpenCode suma 59. Muse no aparece en este export; no permite juzgar su publicación reciente ni la disponibilidad de la app del 24 de septiembre.

El email móvil registra 8 confirmaciones de envío frente a 1.176 visualizaciones del panel (0,68%) en la ventana reciente. Seis confirmaciones proceden de guías y dos de home, todas en URLs EN. La exposición del formulario cambió el 12 de septiembre; no se compara su tasa con la anterior como si fuera la misma superficie. Una confirmación de envío no prueba recepción, apertura o activación.

## Decisiones

1. **Mantener el bloque de producto actual.** La subida de clics es amplia y sobrevive a la comprobación de repeticiones. Revisar la ventana completa posterior al 12 antes de volver a rediseñarlo.
2. **Priorizar las páginas existentes de GUI, dashboard, Windows y sesiones paralelas.** Revisar enlaces internos desde las páginas con más tráfico, especialmente Codex YOLO, hacia la guía que responda a una necesidad real del lector. No crear otro clúster duplicado.
3. **Revisar el botón intermedio y la propuesta de Codex YOLO.** El objetivo intermedio no está cumplido y el artículo más visitado apenas genera clics directos de descarga. Preparar un cambio concreto por página y medirlo sin alterar simultáneamente todos los CTA.
4. **Completar la medición del pricing con un export comparativo por página y consulta**, usando ventanas iguales anteriores y posteriores al 1 de septiembre. No declarar ganadores de snippets usando el CTR acumulado.

El diagnóstico se completó antes de preparar los cambios descritos en la siguiente sección.

## Implementación del 25 de septiembre

Cambios preparados en la rama `seo/conversion-september-25`. Se optimizan URLs existentes en EN y ES; no se crean páginas.

| Intención | URL EN existente | Decisión y motivo |
| --- | --- | --- |
| Comando YOLO, aprobaciones y sandbox | `/en/guides/codex-yolo-mode` | Optimizar respuesta, snippet y CTA. 1 clic de descarga / 1.466 vistas recientes; había instrucciones incorrectas sobre flags y seguridad. |
| Interfaz y descarga para Codex | `/en/guides/codex-gui` | Optimizar explicación, pasos iniciales y enlaces. 12 clics / 154 vistas; distinguir la app independiente y el acceso del proveedor. |
| Retomar y consultar conversaciones | `/en/guides/codex-cli-conversation-history` | Dar comandos concretos, corregir el alcance de `resume --all` y enlazar GUI/sesiones. |
| Historial de Claude Code | `/en/guides/claude-code-history-complete-guide` | Añadir enlaces contextuales al dashboard y las sesiones paralelas. Conservar el snippet revisado el 5 de septiembre. |
| Codex en Windows | `/en/guides/codex-cli-on-windows` | Reutilizar como destino desde GUI; no crear otra página de instalación. |
| Precios | Guías existentes | Mantener snippets hasta disponer del desglose temporal que falta. |

SEO MCP, consultado el 25 de septiembre (EE. UU.), devuelve `codex yolo mode` en el tramo inferior a 100, `codex gui` superior a 100 y `codex windows` superior a 1.000. Dificultad desconocida y sin fecha de actualización para esos términos: son señales orientativas, no estimaciones precisas. La prioridad se basa en Search Console y Umami. Las variantes GUI/CLI e instalación ya tienen destinos; no justifican nuevas URLs.

Correcciones contrastadas con Codex CLI 0.156.0 (`--help`, `resume --help`, sin ejecutar tareas) y la [referencia oficial de comandos](https://learn.chatgpt.com/docs/developer-commands?surface=cli): `--yolo` existe y omite aprobaciones y sandbox; el comando interactivo comprobado rechaza `--full-auto`, que la referencia de `exec` conserva como compatibilidad obsoleta. Se proponen opciones explícitas de sandbox y aprobaciones. Las [rutas oficiales](https://learn.chatgpt.com/docs/reference/troubleshooting) sitúan las transcripciones en `$CODEX_HOME/sessions`.

El código de CodeAgentSwarm confirma que Turbo Mode en el terminal Codex usa `--dangerously-bypass-approvals-and-sandbox`. Se eliminan las promesas de bloqueo automático de comandos destructivos. Se reutiliza una captura real de cuatro sesiones Codex en Chat y terminal.

El botón intermedio pasa a identificar la descarga: “Download CodeAgentSwarm” / “Descargar CodeAgentSwarm”. Se conservan su destino por plataforma, la atribución de Umami y los demás bloques de descarga. Se mantienen slugs, alternates y anclas existentes.

Revisión independiente de redacción: aprobada, sin problemas accionables en equivalencia EN/ES, enlaces, anclas y advertencias YOLO/Turbo.

### Medición después de publicar

Registrar el momento del despliegue y comparar dos ventanas completas de 14 días, excluyendo el día del cambio. Segmentar por guía, idioma, dispositivo y `position`. Medir clics directos / páginas vistas reales del artículo, y contrastar sesiones con clic para detectar repeticiones. Objetivo del intermedio: superar el 0,328% corregido. Vigilar por separado YOLO, GUI y los destinos enlazados; una subida simultánea no demuestra por sí sola que los enlaces la causaron. La atribución de visitas entre páginas necesitaría un análisis adicional.

Los cambios de contenido y etiqueta se entregan juntos: medirán el conjunto, sin atribuir causalidad aislada a cada edición. El bloque de producto permanece estable. Las tasas son clics de descarga, no instalaciones ni activación. El análisis comparativo de precios sigue pendiente de datos, no de una reescritura a ciegas.

### Validación de la implementación

- `npm run build`: correcto, 251 páginas estáticas generadas. Fue necesario habilitar red para descargar las fuentes de Google.
- `npm run lint`: sin errores; avisos preexistentes sobre imágenes y una dependencia de hook en componentes no modificados.
- `node --test components/seo-conversion-regressions.test.mjs`: 14/14 correctos. Incluye comandos útiles, destinos internos, alternates y estructura bilingüe.
- Comparación contra la base Git: las ocho guías mantienen todas sus anclas.
- Chromium headless contra la compilación de producción local: ocho URLs en 1440×1000 y 390×1000, 16 comprobaciones y 32 capturas. HTTP 200, canonical, hreflang, FAQ, etiquetas, destino del botón, ausencia de desbordamiento y anclas del índice correctos; sin errores JavaScript.
- Descarga Windows interceptada: conserva `download_app_guide_windows_x64`, `position: inline` y el slug de la guía. En móvil, el enlace conserva el destino localizado `#download`. API de releases simulada y llamadas externas interceptadas: no se enviaron eventos, emails ni descargas reales.
- Inspección visual de capturas representativas: texto y botones legibles, sin recortes en escritorio y móvil. Evidencia: [escritorio EN](seo-2026-09-25/desktop-inline.png), [móvil ES](seo-2026-09-25/mobile-inline-es.png).

Vista previa local: `http://127.0.0.1:3115/es/guias/modo-yolo-codex`. La validación local no acredita un despliegue en producción ni mejoras de ranking.
