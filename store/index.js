import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
//import config from '/config.js'

Vue.use(Vuex)
const state = {
    locales: ['en', 'tw','cht'],
    locale: 'tw',
    menuList: {},
    aboutData: {},
    prodectData:{},
    homeData:{},
    dnsHost:''//'0.0.0.0'
}

//console.log(state.dnsHost);
let googleKey = '1Q9DiF065lJV-kQWfqtVoBu3YBfdCp1JQifgvaaKVW_Y'
let googleUrl = 'https://spreadsheets.google.com/feeds/cells/{key}/{index}/public/values?alt=json'.replace('{key}',googleKey)
let config = {
    api:{
        support:{
            type:'get',
            google:true,
            //show:true,
            url:googleUrl.replace('{index}',3)
        },
        layout:{
            type:'get',
            google:true,
            //show:true,
            url:googleUrl.replace('{index}',2)
        },
        menuList:{
            type:'get',
            //show:true,
            google:true,
            //url:'/api/menuList'
            url:googleUrl.replace('{index}',1)
        },
        aboutData:{
            type:'post',
            url:'/api/aboutData'
        },
        prodectData:{
            type:'post',
            url:'/api/prodectData'
        },
        homeData:{
            type:'post',
            url:'/api/homeData'
        }
    }
}
let axiosTranform = async (api)=>{
    /*let apiServer =(url)=>{
        console.log('>>',state.dnsHost+url);
        return state.dnsHost+url
    }*/
    //apiServer(api.url)
    let response = await axios[api.type](api.google?api.url:api.url)
    return response
}
let googleToJSON =(response)=>{
    let keys = response.data.feed.entry.filter((val)=>{return val.gs$cell.row==1}).map((val)=>{return val.gs$cell.$t})
    let datas =response.data.feed.entry.splice(keys.length,response.data.feed.entry.length)
    let jsonData =[]
    datas.forEach((val)=>{
        let row = val.gs$cell.row-2
        let col = val.gs$cell.col-1
        jsonData[row] = jsonData[row]||{}
        jsonData[row][keys[col]] = val.gs$cell.$t
    })
    return {data:{list:jsonData}}
}
//'aBa'.replace(/[A-Z]/g,'_$1')
let actionsMethods={},mutationsMethods={},gettersMethods={}
let d = config.api
for(var k in d) {
    let key = k.replace(/([A-Z])/g,'_$1')
    let keyUpper = key.toUpperCase() 
    let keyLower = key.toLowerCase()
    state[k] =[]
    actionsMethods[keyUpper] = ((obj,keyLower)=>{
        return async ({ commit, dispatch, state })=>{
            let response = await axiosTranform(obj)
            response = obj.google?googleToJSON(response):response
            commit(keyLower,response.data)
        }
    })(d[k],keyLower)

    mutationsMethods[keyLower] = ((k,keyLower)=>{
        return (state, payload)=>{
            state[k] =  payload
        }
    })(k,keyLower)
    //menuList: state => state.menuList,
    gettersMethods[k] = ((k)=>{
        return state =>state[k]
    })(k)
}

let actions = actionsMethods
/*{
    async MENU_LIST({ commit, dispatch, state }){//, { type='' }) {
        //commit('MENU_LIST_DATA', { type })
        try {                                          
        //const response = await axios.post(apiServer+'/api/menuList')

        commit('menu_list',response.data.list)

        }catch(error){
        if (error.response && error.response.status === 401) {
            throw new Error('Bad credentials')
        }
        throw error
        }
        //return response.data.list
        //fetch('data/menu.json')
        //.then(r => r.json())
        //.then(json => {
            //commit('MENU_LIST',ax.get('menu.json'))
        //})
    },
}*/
let mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    SET_DNS_HOST(state,host){
        state.dnsHost = host
    },
    ...mutationsMethods
    /*menu_list(state, payload){
        state.menuList =  payload
    }*/
}                     
let getters =gettersMethods
/*{
    //gettersMethods
    menuList: state => state.menuList
}*/
let list ={
    state,
    actions,
    mutations,
    getters
}
export default function(){
    //export function createStore () {
    return new Vuex.Store({ 
        // root
        /*getters,
        modules: {
        list
        }, /
        strict: true    */
        state,
        actions,
        mutations,
        getters
    })
}