<template>
    <div style="margin-top: 20px;">
        <button @click="handleClick">展示$toast</button>
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
        this.handleClick()
    },
    methods: {
        handleClick() {
            this.$toast('这是一个toast的基本例子')
            setTimeout(() => {
                this.$toast({
                    msg: '这是一个toast的基本例子',
                    type: 'warning'
                })
            }, 1000)
            setTimeout(() => {
                this.$toast({
                    msg: '这是一个toast的基本例子',
                    type: 'error'
                })
            }, 2000)
            setTimeout(() => {
                this.$toast({
                    msg: '这是一个toast的基本例子',
                    type: 'success'
                })
            }, 3000)
        },
        handleClose() {
            console.log('after component call close')
        }
    }
}
</script>
