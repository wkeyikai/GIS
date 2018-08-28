<template>
    <div >
        <div v-if="homeList.length" v-swiper:mySwiper="swiperOption" class="swiper-contain"  @someSwiperEvent="callback">                  
            <div class="swiper-wrapper my-wrapper" >
                <div class="swiper-slide" v-for="(item, index ) in homeList" :key="item.name" :name="item">
                    <!--v-bind:style="{ 'background-image': `url(${item.path}.jpg)` }
                    style="{ backgroundImage: 'url(' + require(@/assets/img/${page.image}) + ')' }"-->
                    <!--< :style="{ 'background-image': `url(home-bg-${item}.jpg)` }">-->
                    <div class="home-base" 
                        :style="{
                                backgroundImage: `url('${item.path}')`, 
                                backgroundPosition:index%2==0?`center 100px`:`center bottom 100px`}">
                        <!--<img class="home-base" :src="require(`~/assets/home-bg-${item}.jpg`)"/>-->
                        <transition name="slideleft">
                            <el-aside v-show="true" :class="['aside-bottom','aside-top','aside-bottom'][index]" :width="asideWidth" :height="asideHeight"><div class="content"><h1>{{item.content}}</h1></div></el-aside>
                        </transition>
                    </div>            
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
    <!--<section class="container">
        <div>
        <app-logo/>
        <h1 class="title">
            DEMO
        </h1>
        <h2 class="subtitle">
            Nuxt.js project
        </h2>
        <nuxt-link to="/about">about</nuxt-link>
        </div>
    </section>-->
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    components: {
    },
    layout(content){
        return  'sample'//content.store.state.layout.list[0].name
    },
    scrollToTop: true,
    data(){
        let me = this
        return {
            loading:false,
            slideStatus:[false,false,false],
            asideWidth:'100%',
            asideHeight:'500px',
            swiperOption: {
                direction:'vertical',
                /*effect : 'fade',
                fade: {
                    crossFade: false,
                },*/
                clickable :true,
                //preloadImages:true,
                slidesPerView: 'auto',
                //slidesPerView: 1,
                loop: true,
                centeredSlides: true,
                paginationClickable: true,
                mousewheel: true,
                autoHeight: true, //高度随内容变化
                //initialSlide: 0,
                spaceBetween: 0,
                //height:'100%',
                //speed:1000,
                pagination: {
                    el: '.swiper-pagination',
                    //dynamicBullets: true
                },
                on: {
                    slideChange(data) {
                        //console.log('obj',this.realIndex)
                        me.slideToggle(this.realIndex,true)
                        //console.log('onSlideChangeEnd', this);
                    },
                    slideChangeTransitionEnd: function(obj){
                        //console.log('obj',obj)
                        me.slideToggle(this.realIndex,true)
                        //console.log(this.realIndex)
                        //this.swiperRealIndex
                        //console.log('>>',me.swiperRealIndex);
                    },
                    tap() {
                        //console.log('onTap', this);
                    }
                }
            },
            homeList:[],
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
    async mounted(){
        setTimeout(() => {
            this.homeList = this.homeData.list 
        }, 100)
    },
    methods:{
        ...mapActions([
            'HOME_DATA'
        ]), 
        async init(){
            await this['HOME_DATA']()
        },
        callback(data){
            console.log('callback',data)
        },
        slideToggle(index,status){
            this.slideStatus[index] = status
            //console.log(this.slideStatus[index])
        }
    },
    computed:{
        ...mapGetters([
            'homeData'
        ])
    }
}
</script>

<style lang="scss">
.swiper-contain{
    h1{
        font-size: 42px;
        line-height: 1.4285714286; 
    }
    /*background: -webkit-linear-gradient(#1E90FF,#BBFFEE);
    background: -o-linear-gradient(#1E90FF,#BBFFEE);
    background: -moz-linear-gradient(#1E90FF,#BBFFEE);
    background: linear-gradient(#1E90FF,#BBFFEE);*/
    /*background: -webkit-linear-gradient(#ffff00,#000000);
    background: -o-linear-gradient(#ffff00,#000000);
    background: -moz-linear-gradient(#ffff00,#000000);
    background: linear-gradient(#ffff00,#000000);*/
    margin:0px;
    padding:0px;
    z-index:0;
    /*width:100%;
    height:100%;*/
    %home-base{
        min-height: 100vh;
        height:100vh;
        width:100%;
        min-height: 100vh;
        background-repeat:no-repeat;    
    }
    
    .home-base{
        /*.el-aside {
            background-color: #000000;
            .content{
                border: 1px #ffffff solid;
            }
        }*/
        .aside-bottom{
            position:absolute;
            top:500px;
            height: 300px;
            background-color: rgba(0, 0, 0, .6);
            color: #ffffff;
        }
        .aside-top{
            position:absolute;
            top:100px;
            height: 300px;
            background-color: rgba(0, 0, 0, .6);
            color: #ffffff;
        }
        background-size: 1024px ;
        //width: 1024px;
        //height: 300px;
        //background-position: center center;
        @extend  %home-base;
    }
    .swiper-wrapper{
        height: 100vh;
    }
    .swiper-pagination {
        right: 15px;
        bottom: 50%;
        height: 50px;
    }
    .swiper-pagination-bullet{
        width:20px;
        height:20px;
        //background-color: rgba(255,255,255,0);
        border: 2px solid #fff;
        display:block;
        margin:7px 0px 7px 0px;
    }
    .swiper-pagination-bullet-active{
        width:20px;
        height:20px;
        background-color: rgba(0, 0, 0, 0.8);
    }
    .slideleft-enter-active,
    .slideleft-leave-active {
        transition: all .8s;
    }
    
    .slideleft-enter,
    .slideleft-leave-to {
        /* transform: translateY(0); */
        opacity: 0;
    }
}
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
