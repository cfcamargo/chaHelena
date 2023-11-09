// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: ['@nuxtjs/google-fonts','@pinia/nuxt', '@nuxtjs/supabase'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  googleFonts : {
    families: {
      "Ingrid+Darling": true
    }
  }

})
