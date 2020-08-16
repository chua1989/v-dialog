<template>
    <div style="margin-top: 20px;">
        <button @click="handleClick">展示$toast, 只展示一个</button>
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
            this.$toast({
                id: 'only-one',
                msg: '这是一个toast的基本例子',
                duration: 3000,
                type: 'info',
                zIndex: 50,
                onClose: () => {
                    console.log('after function call close')
                }
            })
        },
        handleClose() {
            console.log('after component call close')
        }
    }
}
</script>
