export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    //'@nuxtjs/supabase',
  ],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK
    }
  },
  app: {
    head: {
      script: [
        { src: 'https://js.stripe.com/v3', defer: true }
      ]
    },
  },
})
