<template>
    <div style="display: inline-block">
        <button @click="handleClick">展示dialog</button>
        <Dialog :isShow.sync="isDialogShow"
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
        ></Dialog>
    </div>
</template>

<script>
/* 组件形式 */
import { Dialog } from '../../dist'

export default {
    name: 'html-com',
    components: { Dialog },
    data() {
        return {
            isDialogShow: false
        }
    },
    methods: {
        handleClick() {
            this.isDialogShow = true
        },
        handleNo() {
            console.log('after no')
        },
        handleYes() {
            console.log('after yes')
        },
        handleClose() {
            console.log('after close')
        }
    }

}
</script>
<style lang="scss" scoped>

</style>
