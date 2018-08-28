<template>
    <span class="lang_container">
        <el-select :style="`width:${width}px`"
            v-model="lang"
            filterable
            allow-create
            default-first-option
            @change="handleSelect"
            placeholder="">
            <el-option
            v-for="lang in langs"
            :key="lang.val"
            :label="lang.name"
            :value="lang.val">
            </el-option>
        </el-select>
    </span>
</template>
<script>
export default {
    props:{
        width:{
            default: '80',
            type: String
        }
    }, 
    name:'lang',
    data(){
        console.log(this.$i18n.locale)
        return {
            lang:this.$store.state.locale,
            langs:[{name:this.$t('links.tw'),val:'tw'},{name:this.$t('links.en'),val:'en'}],
        }
    },
    methods: {
        start() {
            this.loading = true
        },
        finish() {
            this.loading = false
        },
        handleSelect(key, keyPath) {
            this.$i18n.locale = key
            //console.log(this.$store.commit('SET_LANG', locale))
            this.$store.commit('SET_LANG', key)
            //window.localStorage.setItem('language', key)
            console.log(this.$t('home.title'),this.$store.state.locale)
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="scss">
    .lang_container{
        overflow: hidden;
    }
</style>