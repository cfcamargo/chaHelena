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
  },

  supabase: {
    redirect : false
  },

  app: {
    head: {
      title : 'Chá de Bebe da Helena | Confirmar Presença',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta : [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'App Para confirma presença no chá de bebe da Helena' },
        { name: 'author', content: 'camargoDev Desenvolvimento de Software Junto Aos Papais, Vini e Gabi' },
        { name : 'title', content: 'Chá de Bebe da Helena' },
        { property: 'og:description', content: 'App Para confirma presença no chá de bebe da Helena' },
        { property: 'og:image', content: '/cover.jpg' },
        { property: 'og:url', content: 'https://chadebebedahelena.vercel.app/' },
        { property: 'og:type', content: 'website' },
      ],
      link : [
        { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }
      ]
    },
  }

})
