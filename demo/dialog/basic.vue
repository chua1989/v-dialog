<template>
    <div style="margin-top: 20px;">
        <button @click="handleClick">展示dialog</button>
    </div>
</template>

<script>
export default {
    name: 'baisc',
    mounted() {
        this.handleClick()
    },
    methods: {
        handleClick() {
            this.$dialog({
                title: '提示',
                msg: '这是一个dialog的基本例子，通过函数直接调用',
                hasNo: true,
                hasYes: true,
                noText: '取消',
                yesText: '确定',
                themeColor: '#00C2B3',
                zIndex: 50,
                onNo: () => {
                    console.log('after no')
                },
                onYes: () => {
                    console.log('after yes')
                },
                onClose: () => {
                    console.log('after close')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
