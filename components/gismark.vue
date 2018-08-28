<template>
</template>
<script>

export default {
    name: 'gisMark',
    props: ['lon','lat','imgSrc','type'],
    created () {
        this.$nextTick(() => {
            this.$parent.mark(this.lon,this.lat,this.imgSrc,this.type);
        })
    },
    mounted() {
        
    },
    data () {
        return {}
    },
    methods: {
       
    },
    components: {
        //custom: customComponents
    }
}
</script>