# webproject
nuxt+vue

(1)npm i
(2)npm run dev

GIS
```vue
<gismap :center="[lon,lat]" 
        :level="10" 
        :cross="true" 
        :overview="true">
        <gismark :lon="lon" :lat="lat" :type="'poi'"></gismark>
        <gisline :path="lineData" :color="'0000FF'" />
</gismap>
```
