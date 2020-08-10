<template>
    <div></div>
</template>

<script>
export default {
    name: 'demo',
    mounted() {
        this.$dialog({
            title: '提示',
            msg: '确定要重新学习？',
            hasNo: true,
            hasYes: true,
            yesText: '确定',
            noText: '取消',
            themeColor: '#00C2B3',
            zIndex: 50,
            onClose: () => {
                console.log('after close')
            },
            onNo: () => {
                console.log('after no')
            },
            onYes: () => {
                console.log('after yes')
            }
        })
    }
}
</script>
<style lang="scss" scoped>

</style>
