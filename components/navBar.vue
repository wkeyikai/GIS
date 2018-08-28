<template>
    <div>
        <div><label class="label-toggle" @click="menuToggle"></label></div>
        <div>
        <nav>
            <!--:mode="show?'vertical':'horizontal'"-->
        <el-menu
        :background-color="show?'rgba(0,0,0,.0)':'rgba(0,0,0,1)'"
        :text-color="'#ffff00'" 
        :active-text-color="'#ffff00'"
        :default-active="'1'" 
        :collapse-transition="true"
        class="el-menu-demo" :class="show?'menu-rwd-close':'menu-rwd-open'"
        mode="horizontal" 
        :router="true"
        @select="handleSelect"
        >
            <!--<el-menu-item index="\">
                <lang width="80" ></lang>
            </el-menu-item>-->
            <el-menu-item v-for="(item,idx) in data" :key="item.name" :index="route+'/'+item.path">{{$t('menus.'+item.key)}}</el-menu-item>
        </el-menu>
        </nav>
        </div>
    <!-- <a v-for="(item,idx) in data" :href="item.path">{{item.name}}</a>      -->
    </div>
</template>
<script>
import lang from '~/components/lang.vue'
export default {
    components: {lang},
    props:['data','path'], 
    name:'navBar',
    data(){
        return {show:false}
    },
    methods: {
        menuToggle() {
            this.show = !this.show
        },
        handleSelect(){

        }
    },
    computed:{
        route(){
            return this.path==''?'':'/'+this.path
        }
    }
}
</script>

<style lang="scss"> 
$break: 768px;
nav{
    min-width: 450px;
    font-size: 14px;
    font-family: sans-serif;
}
/*@media screen and (min-width: $break) {

}*/
@media screen and (max-width: $break) {
    nav{
        min-width: 0px;
        ul{
            width:100%;
            li{
                width:100%;
            }
        }
    }
    .menu-rwd-close{
        width:100px;
        display: block;
        height: 0;
        list-style-type: none;
        opacity: 0;
        text-align: center;
        transition: all 1s ease;
        width: 100%;
        display: hidden;
    }
    .menu-rwd-open{
        top: 70px;
        width:100%;
        background-color:RGB(0,0,0,1);
    }
    .label-toggle {
        background: linear-gradient(to bottom, #ffffff 0%, #ffffff 20%, transparent 20%, transparent 40%, #ffffff 40%, #ffffff 60%, transparent 60%, transparent 80%, #ffffff 80%, #ffffff 100%);
        cursor: pointer;
        display: block;
        float: right;
        height: 17px;
        margin-top: 1em;
        width: 18px;
    }
    .no-line{
        text-decoration: none;
    } 
}
</style>