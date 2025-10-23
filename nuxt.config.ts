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
<<<<<<< Updated upstream
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/images/Logomark.svg" },
      ],
    },
  },

  // 👇 Add this block
  nitro: {
    preset: "vercel",
  },
});
=======
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo/Visa123logo.svg' }
      ]
    }
  }
})
>>>>>>> Stashed changes
