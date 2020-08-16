<template>
    <div style="margin-top: 20px;">
        <button @click="handleClick">展示$dialog</button>
        <button @click="handleComClick">展示v-dialog组件</button>
        <v-dialog :isShow.sync="isDialogShow"
                 title="提示"
                 msg="这是一个dialog组件实现的对话框"
                 :hasNo="true"
                 :hasYes="true"
                 noText="取消"
                 yesText="确定"
                 themeColor="#00C2B3"
                 :zIndex="50"
                  @onNo="handleNo"
                  @onYes="handleYes"
                  @onClose="handleClose"
        ></v-dialog>
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
        this.$dialog('这是一个dialog的基本例子，通过函数直接调用')
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
                    console.log('after function call no')
                },
                onYes: () => {
                    console.log('after function call yes')
                },
                onClose: () => {
                    console.log('after function call close')
                }
            })
        },
        handleComClick() {
            this.isDialogShow = true
        },
        handleNo() {
            console.log('after component call no')
        },
        handleYes() {
            console.log('after component call yes')
        },
        handleClose() {
            console.log('after component call close')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
