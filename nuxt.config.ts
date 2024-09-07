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
      DATABASE_URL: process.env.DATABASE_URL,
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
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      failOnError: false,
    },
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }
      const { pages } = await fetchRoutes();
      for (const page of pages) {
        //@ts-ignore
        nitroConfig.prerender.routes.push(`/item/${page.id}`);
      }
    },
  },
});

async function fetchRoutes() {
  const response = await fetch(
    'https://mocki.io/v1/02586b1c-16fa-4513-926f-ff45c9a4c0c0'
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.pages)) {
    throw new Error('Expected pages to be an array');
  }

  return data;
}
