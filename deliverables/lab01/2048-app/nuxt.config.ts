export default defineNuxtConfig({
  compatibilityDate: '2026-01-28',
  devtools: { enabled: true },
  ssr: false,
  alias: {
    '~': '/',
    '#components': './components'
  }
})
