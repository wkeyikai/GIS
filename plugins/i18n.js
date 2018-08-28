import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
    console.log('i18n',store.state.locale)
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: store.state.locale,
        //fallbackLocale: 'en',
        messages: {
        'en': require('~/locales/en.json'),
        'tw': require('~/locales/tw.json'),
        'cht': require('~/locales/cht.json')
        }
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
        return `/${link}`
        }

        return `/${app.i18n.locale}/${link}`
    }
}
