<template>
    <div style="margin-top: 20px;">
        <button class="button" @click="handleClick">展示$toast</button>
    </div>
</template>

<script>
export default {
    name: 'basic',
    data() {
        return {
            isDialogShow: false
        }
    },
    mounted() {
        this.$toastH5('这是一个toast的基本例子')
    },
    methods: {
        handleClick() {
            this.$toastH5({
                msg: '这是一个toast完整的例子',
                duration: 5000,
                zIndex: 50,
                onClose: function() {
                    console.log('enter close')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .button{
        font-size: .4rem;
    }
</style>
