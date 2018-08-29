# webproject+GIS
install nuxt+vue

(1)npm i
(2)npm run dev

use GIS
```vue
<template>
  <div>
    <gismap :center="[lon,lat]" 
            :level="10" 
            :cross="true" 
            :overview="true">
            <gismark :lon="lon" :lat="lat" :type="'poi'"></gismark>
            <gisline :path="lineData" :color="'0000FF'" />
    </gismap>
  </div>
</template>
<script>
import gismap from '~/components/gismap.vue'
import gisline from '~/components/gisline.vue'
import gismark from '~/components/gismark.vue'
export default {
    components: {
        treeview,gismap,gisline,gismark
    },
    layout(content){     
        return layout
    },
    data(){
        return {
            lon:0,
            lat:0,
            lineData:[],
        }
    }
}
</script>
```
