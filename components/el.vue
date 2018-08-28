
<script>
export default {
    name:'el',
    render: function (createElement) {
        let cls = this.classes||[]
        return createElement(
        this.dom,   // tag name
        {
            attrs: { class: cls.join(" ")}
        },
        this.$slots.default // array of children
        )
    },
    props: {
        /*level: {
            type: Number,
            required: true
        },*/
        dom:{
            type: String,
            required: true
        },
        classes:{
            type: Array,
            required: true
        }
    }
}
</script>