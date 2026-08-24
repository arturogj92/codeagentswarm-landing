'use client'

import { useReportWebVitals } from 'next/web-vitals'

export default function WebVitals() {
  useReportWebVitals((metric) => {
    const send = () => window.umami?.track('web_vital', {
      metric: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      unit: metric.name === 'CLS' ? 'milli' : 'ms',
      rating: metric.rating,
    })

    if (window.umami) send()
    else window.setTimeout(send, 1000)
  })

  return null
}
