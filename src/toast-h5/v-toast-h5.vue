<template>
    <div v-if="visible" class="v-dialog-h5-toast-wrapper" :style="{zIndex: zIndex}">
        <div class="v-dialog-h5-toast">
            {{ msg }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-toast-h5',
    props: {
        // 消息文字
        msg: {
            type: String,
            default: ''
        },
        // 显示时长，毫秒
        duration: {
            type: Number,
            default: 3000
        },
        isShow: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 101
        },
        // 关闭后的回调
        onClose: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            closed: false, // 用来判断消息框是否关闭
            timer: null, // 计时器
            visible: this.isShow // 是否显示
        }
    },
    mounted() {
        this.startTimer()
    },
    watch: {
        isShow(newVal) {
            this.visible = newVal
        },
        visible(newVal) {
            // el-dialog的update:visible事件或手动更改dialogVisible都会进入该监听
            // 更改props的visible属性
            this.$emit('update:isShow', newVal)
        }
    },
    methods: {
        // 该函数主要用在接口调用toast时避免数据泄露。正常的组件调用是不必要调用的
        handleAfterLeave() {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        },
        handleClose() {
            this.visible = false;
            this.onClose && this.onClose();
        },
        startTimer() {
            this.timer = setTimeout(() => {
                this.handleClose()
                clearTimeout(this.timer);
            }, this.duration)
        }
    }
}
</script>

<style lang="scss" >
    .v-dialog-h5-toast-wrapper{
        position: fixed;
        width: 100%;/* 必须设置，否则内部toast的max-width失效 */
        left: 50vw;
        bottom: 50vh;
        z-index: 100;

        .v-dialog-h5-toast {
            /*
            如果外面不哦那个wrapper包裹，会导致max-width失效，toast宽度最多也就50%。
            推测为left这类位置偏移属性导致浏览器认为节点的（最大宽度 = 父元素宽度 - 偏移宽度）导致
            position: fixed;
            left: 50vw;
            bottom: 30vh;
            */
            display: inline-block;
            box-sizing: border-box;
            transform: translate(-50%, 0);
            min-width: 40vw;
            max-width: 90vw;
            text-align: center;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 18px;
            line-height: 26px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
        }
    }
</style>
