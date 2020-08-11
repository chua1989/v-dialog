<template>
    <svg :class="$style.svgDefaultClass" @click="click($event)">
        <use :xlink:href="`#${name}`"></use>
    </svg>
</template>

<script>
export default {
    name: 'icon',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        click(e) {
            // 把e传递出去，vue父组件用来做一些额外处理，比如阻止冒泡等
            // 不传递则无法实现父组件中的事件修饰符功能
            this.$emit('click', e);
        }
    }
}
</script>
<style lang="scss" module>
    .svg-default-class{
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        /*color: #fff;*/
    }
</style>
