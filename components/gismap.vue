<template>
    <div ref="map">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'gisMap',
    props: ['center','level','cross','overview'],
    created () {
    },
    mounted() {
        this.map = new GIS.map(this.$refs.map)
        this.map.reMap(this.level||10)
        let poi = this.center||[121.549535,24.979819]
        this.map.setCenter(poi[0],poi[1]);
        this.map.mousewheel()
        this.cross&&this.map.tool(new GIS.tool.cross)
        this.overview&&this.map.tool(new GIS.tool.overview)
    },
    data () {
        return {
           map:null
        };
    },
    methods: {
        line(line,color){
            this.map.line({path: line, color: color})
        },
        mark(lon,lat,img,type){
            this.map.mark(lon,lat,img,type)
        },
        setCenter(lon,lat){
            this.map.setCenter(lon,lat);
        }
    },
    components: {
        //custom: customComponents
    }
}
</script>