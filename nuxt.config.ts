// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Address Validation',
            script: [
                {
                    src: '/assets/js/preline/preline.js',
                    body: true,
                    defer: true,
                },
            ],
        },
    },
    css: [
        "~/assets/css/index.css",
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        'nuxt-icon',
        '@vueuse/nuxt',
    ],
});
