<template>
    <div class="sampleDiv">
        <section id="sample" class="body" >  
            <div class="in">
                <el-row :gutter="10">
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <treeview ref="treeGroup" :custom="true" :source="{lists:lists}" :open="false" :checkbox="false" v-on:selected="selected">
                            <template slot="custom" slot-scope="props">
                                <!--<span :class="props.source.status?'':'status-lock'">{{props.source.status_msg}}</span>
                                <div class="edit-icons option-icon">
                                
                                </div>-->
                            </template>
                        </treeview>
                    </el-col>  
                    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                        <gismap :center="[121.549535,24.979819]" :level="10" :cross="true" :overview="true"></gismap>
                    </el-col>
                </el-row>
            </div>
        </section>    
    </div>
</template>
<script>
//import Vue from 'vue'
import {mapActions,mapGetters} from 'vuex'
//import { swiper, swiperSlide } from 'vue-awesome-swiper'
import treeview from '~/components/treeview.vue'
import gismap from '~/components/gismap.vue'
export default {
    components: {
        treeview,gismap
    },
    layout(content){     
      return layout
    },
    scrollToTop: true,
    data(){
        return {
            lists:[{name:'GIS',lists:[{name:''}]}],
            company:{info:''},
            color1:'#F9F7C4',
            color2:'#000000',
            title:this.$t('home.title')+'followTeK',
            className : {'0':'button--green','1':'button--grey'}
        }
    },
    head () {
        return {
            title: this.title,
            meta: [
            { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    created() {
        this.init()
    },
    methods:{
        ...mapActions([
            'MENU_LIST'
        ]),  
        init(){
            this['MENU_LIST']()
        },
        closeOnClick(){
            alert()
        },
        selected(){

        }
    },
    computed:{
        ...mapGetters([
            'menuList'
        ])  
    }
}
</script>
<style lang="scss"> 
#sample{
    background-attachment: scroll;
    background-attachment: scroll, scroll, scroll, fixed;
    background-color: #645862;
    background-position: bottom left, bottom right, top left,top center;
    background-repeat: no-repeat, no-repeat, repeat, no-repeat;
    background-image: url('/assets/light-bl.svg'), url('/assets/light-br.svg'),url('/assets/overlay.png'),url('/assets/banner.jpg') ;
    background-size: 25em,25em, 25em, auto;
    color: white;
    cursor: default;
    padding: 6em 0;
    text-align: center;
    .in{
        width:90%;
        height:500px;
        animation-fill-mode: forwards;
        background: rgba(52, 27, 43, 0.5);
        color: white;
        display: inline-block;
        //opacity: 0;
        padding: 3em;
        text-align: center;
    }
}
</style>