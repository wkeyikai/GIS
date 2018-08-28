import bodyParser from 'body-parser'
import session from 'express-session'
import nodeExternals from 'webpack-node-externals'
export default {
    head: {
        title: 'followtek',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', content: 'Auth Routes example' },
            { name:"msapplication-TileColor" ,content:"#dedded" },
            { name:"theme-color" ,content:"#dedded" }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon',sizes:"76x76", href: '/apple-touch-icon.png' },
            { rel: "icon",  type:"image/png",sizes:"16x16", href:"/favicon-16x16.png"},
            { rel: "manifest",  href:"/site.webmanifest"},
            { rel: "mask-icon",  href:"/safari-pinned-tab.svg" ,color:"#5bbad5"},

        ],
        script: [
            { src: '/js/fb-sdk.js' },
            { src: '/js/gis/gis.js'},
        ]
    },
    router: {
        middleware: ['layout','dns'],
    },
    /*
    ** Build configuration
    */
    build: {
        vendor: [
            'axios',
            'element-ui',
            'vue-awesome',
            //'vue-material',
            //'~/assets/gis.js'
        ],
        /*babel: {
        'plugins': [['component', [
            {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
            },
            'transform-async-to-generator',
            'transform-runtime'
        ]]],
        comments: true
        }, */ 
        /*
        ** Run ESLint on save
        */
        /*extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/
                })
            }
        }*/
        extend (config, { isServer }) {
            // ...
            if (isServer) {
                config.externals = [
                    nodeExternals({
                    // default value for `whitelist` is
                    // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
                    whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
                    }),
                    function (context, request, callback) {
                        callback()
                        /*if (/^vue2-google-maps($|\/)/.test(request)) {
                            callback(null, false)
                        } else {
                            callback()
                        }*/
                    }
                ]
            }
        }
    },
    render: {
        bundleRenderer: {
            shouldPreload: (file, type) => {
                return ['script', 'style', 'font'].includes(type)
            }
        }
    },
    /*
    ** Customize the progress bar color
    */
    //loading: { color: '#3B8070' },
    loading: '~/components/loading.vue',
    css:[
        '~/css/main.css',
        'element-ui/lib/theme-chalk/index.css' ,
        'swiper/dist/css/swiper.css',
        //'vue-material/dist/vue-material.min.css'
    ],
    plugins: [
        '~/plugins/i18n.js',
        {src: '~plugins/element-ui', ssr: true} ,
        {src:'~/plugins/vue-awesome-swiper.js', ssr: false},
        '~plugins/vue-awesome.js',
        //'~plugins/vue2-google-maps.js',
        '~plugins/axios.js',
        //{ src: '~/assets/gis.js',ssr:false},
        //{ src: '~/plugins/vue-material' }
    ],
    /*
    ** Add server middleware
    ** Nuxt.js uses `connect` module as server
    ** So most of express middleware works with nuxt.js server middleware
    */
    serverMiddleware: [
        // body-parser middleware
        /*bodyParser.json(),
        // session middleware
        session({
        secret: 'super-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
        }),      */
        // Api middleware
        // We add /api/login & /api/logout routes
        '~/api'
    ],
    /*env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
    },*/
   /* modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
        //['@nuxtjs/proxy', { pathRewrite: { '^/api' : '/api' } }],
    ],
    proxy: [
        'http://127.0.0.1:80/api'

        //{'/api': { target: 'http://127.0.0.1', ws: false }}
      
    ]*/
    //{'/api': 'http://127.0.0.1'}
}
