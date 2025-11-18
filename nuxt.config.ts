// nuxt.config.ts or nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  components: {
    global: true,
    dirs: ["~/components"],
  },

  app: {
    head: {
      title: "iVisa - Management System",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/logo/Visa123logo.svg" },
      ],
    },
  },

  // 👇 Add this block
  nitro: {
    preset: "vercel",
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5001",
      // apiBase: process.env.API_BASE_URL ?? 'http://localhost:5001',
    },
  },
});
