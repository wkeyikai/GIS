<template>
    <div class="fb_container">
        <icon name="facebook" class="facebook"></icon>
        <div class="fb-customerchat"
            page_id="524205321310851"
            minimized="true">
        </div>
    </div>
</template>
<script>

export default {
    props:['data'], 
    name:'FB',
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
    .fb_container{
        cursor: pointer;
        margin: 4px;
        background-color: #4267b2;
        color: #ffffff;
        padding: 6px;
        border-radius: 3px;
        width: 30px;
        display: inline-block;
        height: 30px;
        .facebook{
            width: 24px;
            height: 24px;
        }
    }
</style>