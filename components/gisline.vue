<template>
</template>
<script>

export default {
    name: 'gisLine',
    props: ['path','color'],
    created () {
        this.$nextTick(() => {
            this.$parent.line(this.path,this.color);
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