<template>
    <div class="tree-layout">
        <ul :class="padding==0?'default':'tree tree-branch-children'">
            <li :class="padding==0?'default':'tree-branch'">
                <div 
                    v-if="parent" 
                    :disabled="source.isLock" 
                    :class="(padding==20?'default':'tree-branch-header') +' '+ (source.hiLight?'hover':(hover?'hover':''))" 
                    @click="selected(source)" 
                    @mouseover="mouseover"
                    @mouseout="mouseout"
                >
                    <span class="tree-branch-name">
                        <input 
                            v-if="checkbox" 
                            type="checkbox" 
                            v-model="source.isSelect"
                            :disabled="source.isLock"
                            @change="check(source)"
                        />
                        <span class="icon" @click="change(source)">
                            <i v-if="(source.lists||[]).length==0" class="blankicon"></i>
                            <i v-else-if="isOpen" class="glyphicon glyphicon-menu-right el-icon-arrow-right rotate90"></i>
                            <i v-else class="glyphicon glyphicon-menu-right el-icon-arrow-right"></i>
                        </span>
                        <span class="tree-label"><slot name="tree-label" :vm="this" :source="source">{{source.name}}</slot></span>
                    </span>
                    <!--<div class="tree-option" v-if="custom">
                        <slot name="custom" :vm="this" :source="source"></slot>
                    
                    </div>-->
                </div>
                <treeview ref="tree"
                    :key="this"
                    :custom="custom"
                    v-show="isOpen||!parent" 
                    v-if="source.lists&&source.lists.length>0"
                    style="position:relative;" 
                    v-for="(item,index) in source.lists"
                    :level="padding+20" class="treeview"
                    :source="item"
                    :parent="source"
                    :open="isOpen"
                    :checkbox="checkbox"
                    v-on:selected="selected"
                >
                    <template slot="tree-label" slot-scope="props">
                        <slot name="tree-label" :vm="props.vm" :source="props.source">{{props.source.name}}</slot>
                    </template>
                    <template slot="custom" slot-scope="props" v-if="custom">
                        <slot name="custom" :vm="props.vm" :source="props.source"></slot>
                    </template>
                </treeview>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
    name: 'treeview',
    props: ['source', 'open', 'item', 'parent', 'level', 'checkbox','custom'],
    created () {
        //this.source.hiLight =false
        // this.source.forEach(function (val) {
        //     val.hiLight = false
        //     return val
        // });
        this.treeData = this.source;
        //console.log('slots:',this.$slot);
        //this.$watch('treeData.isSelect', this.checkTrigger);
    },
    data () {
        return {
            isOpen: this.open,
            treeData: [],
            treeList: [],
            padding: this.level || 0,
            show: false,
            hover: false,
            //vm:this
        };
    },
    methods: {
        toggle(status){
            /*this.$children.forEach(function (val) {
                val.setToggle(status);
            });*/
            this.isOpen = status;
            if (!this.$refs.tree){
                return;
            }
            this.$refs.tree.forEach(function (val) {
                val.toggle(status);
            });
        },
        selected(source) {
            this.setHover()
            if (!this._events.selected){
                return;
            }
            source.hiLight = true
            this.source.hiLight = true
            this.$emit('selected',source)
        },
        change(source) {
            //console.log(source.open);
            this.isOpen = !this.isOpen;
            //source.open = !source.open;
        },
        check(item) {
            var me = this;
            var select = item.isSelect;
            if (item.lists.length) {
                item.lists.forEach(function (val, idx) {
                    val.isSelect = select;
                    //item.lists[idx].isSelect = select;
                    me.check(item.lists[idx]);
                });
            }
        },
        mouseover(){
            this.hover = true;
        },
        mouseout(){
            this.hover = false;
        },
        getData (id) {
            var trueArr = [];
            var falseArr = [];
            var dataStatus_array = function (data) {
                if (data.lists) {
                    data.lists.forEach(function (val) {
                        dataStatus_array(val);
                        (val.isSelect ? trueArr : falseArr).push(val[id]);
                    });
                }
            }
            dataStatus_array(this.source);
            var data = [trueArr, falseArr];
            return data;
        },
        setHover () {
            var dataStatus_array = function (data) {
                console.log('data: ', data)
                if (data.lists) {
                    data.lists.forEach(function (val) {
                        dataStatus_array(val);
                        val.hiLight = false;
                    });
                }
            }
            dataStatus_array(this.source);
            this.source.hiLight = false;
        },
        setToggle (toggle) {//tmp
            this.isOpen = toggle;
            //console.log('tree',this.$refs.tree);
            if(!this.$refs.tree){
                return;
            }
            this.$refs.tree.forEach(function (val) {
                val.setToggle(toggle);
            });
        },
        checkTrigger () {
            var setData = function (data) {
                data = data || [];
                if (data.length) {
                    data.list = data.map(function (val, i) {
                        val.isSelect = val.isSelect || setData(val.list);
                        return val.isSelect;
                    })
                }
                return data.isSelect;
            }
            var data = JSON.parse(JSON.stringify(this.source));
            this.parent.isSelect = setData(data);
        }
    },
    mounted() {
        //var name = this.treeData.name;
        //this.customComponents = { template: '<div>test</div>' }
        //customComponents = { template: '<div>456</div>' };
        //console.log(this.$refs['custom']);
        //this.$refs['custom'].innerHTML = this.custom;
        /*this.$refs['custom'].firstChild.addEventListener('click', function(event) {
                                      event.target.value= name;
          event.preventDefault();
          console.log('clicked: ', event.target,name);
        })    */
    },
    components: {
        //custom: customComponents
    }
}
</script>
<style lang="scss"> 
$font_normal: 14px;
$border-color: #ddd;
//$second-color:#3496de;
$second-color:#ddd;
$cus_focus:rgba(#c2e7ff, 0.3);
$box-border: 1px solid $border-color;
ol, ul {

	list-style: none;

}
ol, ul, li{
    margin: 0;

	padding: 0;

	border: 0;

	font-size: 100%;

	font: inherit;

	vertical-align: baseline;

	font-family: 'Microsoft JhengHei', 'arial', sans-serif;
}
@mixin vertical-inline($v) {

    display: inline-block;

    vertical-align: $v;

}
.tree-layout {

    $active-height: 32px;

    padding: 10px 0;

    //min-height: 500px;

    //height: 500px;

    overflow-x: hidden;



    .widget-main {

        padding: 20px;

    }



    /* 樹狀 */
    .tree {

        position: relative;

        margin: auto;

        padding: 0 0 0 9px;

        // overflow-x: hidden;

        // overflow-y: auto

    }

    .tree .tree {

        padding: 0;

        //overflow: visible;

    }

    .tree .tree:before {

        display: none;

    }

    .tree .tree-branch-name {

        cursor: pointer;

        position: relative;

        z-index: 3;

        .glyphicon {

            color: $second-color;

            font-size: 13px;

            font-weight: bold;

            position: relative;

            left: -1px;

        }

    }

    .tree .tree-branch {

        width: auto;

        min-height: 20px;

        cursor: pointer;

    }

    .tree .tree-branch .tree-branch-header {

        position: relative;

        height: 20px;

        line-height: 20px;

        border-radius: 0;

    }

    .tree .default {

        position: relative;

        height: 24px;

        line-height: 24px;

        border-radius: 0;

        padding: 5px;

        -webkit-box-sizing: content-box;

        -moz-box-sizing: content-box;

        box-sizing: content-box;

        overflow-y: hidden;

    }

    .tree .default:hover {

        background-color: $cus_focus;

    }

    .tree .tree-branch .tree-branch-header {

        padding: 5px;

        //color: #4D6878;

        -webkit-box-sizing: content-box;

        -moz-box-sizing: content-box;

        box-sizing: content-box;

    }

    .tree .tree-branch .tree-branch-header:hover {

        background-color: $cus_focus;

    }

    .tree .hover {

        background-color: $cus_focus;

    }

    .tree .tree-option.hover {

        background-color: transparent;

    }
    text-align: left;
    .tree .tree-branch .tree-branch-header::before {

        display: inline-block;

        content: "";

        position: absolute;

        top: 14px;

        left: -9px;

        width: 13px;

        height: 0;

        border-top: 1px dotted #67B2DD;

        z-index: 1;

    }

    /*.hover.tree .tree-branch > .tree-branch-header > .tree-branch-name > .tree-label {

        margin-left: 2px;

    }*/

    .tree .tree-branch:last-child:after {

        display: inline-block;

        content: "";

        position: absolute;

        z-index: 1;

        top: 15px;

        bottom: 0;

        left: -10px;

    }

    .tree .tree-branch .tree-branch-children, .tree .tree-branch .tree-branch-children.tree {

        margin: 0 0 0 23px;

        padding: 0;

        position: relative;

    }

    .tree .tree-branch .tree-branch-children::before {

        display: inline-block;

        content: "";

        position: absolute;

        z-index: 1;

        top: -16px;

        bottom: 16px;

        left: -10px;

        border: 1px dotted #67B2DD;

        border-width: 0 0 0 1px;

    }

    .tree .tree-branch {

        position: relative;

        list-style: none;

        margin: 1px 0;

    }

    .tree .tree-selected {

        color: #6398B0;

    }

    .edit-icons {

        display: inline-block;

    }

}



// 樹狀標題

.tree-title_bg_none {

    margin: 6px 10px;

    padding-bottom: 5px;

    font-size: $font_normal;

    border-bottom: $box-border;

    display: flex;

    justify-content: space-between;

    span {

        line-height: 28px;

    }

}



// 樹狀操作

.tree-option {

    padding: 3.5px;

    background-color: transparent;

    position: absolute;

    right: 17px;

    top: 50%;

    transform: translateY(-50%);

    width: 260px;

    > span {

        @include vertical-inline(middle);

        margin-right: 20px;

        width: calc(50% - 23px);

    }

    .gray{

        color: #aaa;

    }

}

//extend

.edit-tree {

    height: 385px;

}
</style>