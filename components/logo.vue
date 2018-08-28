<template>
    <div class="logo_container">
        <img v-if="type=='img'" :style="`width:${data.width}px;height:${data.height}px`" src="/my_logo_400x400.jpeg"/>
        <span v-if="type=='font'"><font class="follow">FolloW</font><font class="tak">Tek</font></span>
    </div>
</template>
<script>
export default {
    props:{
        data: {
            default: {width:400,height:400},
            type: Object
        },
        type:{
            default: 'img',
            type: String
        }
    }, 
    name:'logo',
    data(){
        return {}
    },
    methods: {
        start() {
            this.loading = true
        },
        finish() {
            this.loading = false
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="scss">
    .logo_container{
        overflow: hidden;
        width:210px;
        height:70px;
        //background-color:rgb(0, 4, 255);
        //color:#ffffff;
        img{
            margin-top: -75px;
        }
        .follow{
            color:#ffffff;
        }
        .tek{
            color: #ff0000;
        }
    }
</style>