export default defineNuxtConfig({
  pages: true,
  modules: [
    'nuxt-icon',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],
  runtimeConfig: {
    public: {
      stripePk: 'pk_test_omlXjzDjv5JiiZriL2q7XT3d00PisYvFQu',
    },
  },
  app: {
    head: {
      script: [{ src: 'https://js.stripe.com/v3', defer: true }],
    },
  },
  supabase: {
    redirect: false,
  },
  compatibilityDate: '2024-08-08',
  routeRules: {
    '/item/**': {
      prerender: true,
    },
  },
  hooks: {
    async 'prerender:routes'(ctx: any) {
      try {
        const { pages } = await fetch(
          'http://localhost:3000/api/get-page-products'
        ).then((res) => res.json());
        for (const page of pages) {
          ctx.routes.add(`/item/${page.id}`);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    },
  },
});
