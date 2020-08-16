<template>
    <transition name="toast-move" @after-leave="handleAfterLeave">
        <div v-if="visible" class="v-dialog-toast-wrapper" :style="{top: `${top}px`, zIndex: zIndex}">
            <div :class="['v-dialog-toast', toastClass]" ref="toast">
                <icon v-if="type === 'info'" name="icon-circle-info"></icon>
                <icon v-else-if="type === 'success'" name="icon-circle-correct"></icon>
                <icon v-else-if="type === 'error'" name="icon-circle-error"></icon>
                <icon v-else-if="type === 'warning'" name="icon-circle-warning"></icon>
                {{ msg }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'v-toast',
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
        type: {
            type: String,
            default: 'info' // error/success/warning/info
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
        let classes = {
            error: 'v-dialog-error',
            success: 'v-dialog-success',
            warning: 'v-dialog-warning',
            info: 'v-dialog-info',
            default: 'v-dialog-info'
        }
        return {
            timer: null, // 计时器
            visible: this.isShow, // 是否显示
            top: 20, // toast框距离顶部的高度，单位px,再toast.js中设置
            toastClass: classes[this.type] || classes.default
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
<!-- 动画必须是全局的 -->
<style lang="scss" scoped>
    .toast-move-enter-active,
    .toast-move-leave-active {
        transition: all .5s;
    }
    .toast-move-enter,
    .toast-move-leave-to{
        transform: translate(0, -100%);
        opacity: 0;
    }
</style>
<style lang="scss">
    @import "Assets/css/color.scss";
    $backgroundWeight: 10%;
    .v-dialog-info {
        color: $ui-info;
        background-color: mix($ui-info, $ui-white, $backgroundWeight);
    }
    .v-dialog-success {
        color: $ui-green;
        background-color: mix($ui-green, $ui-white, $backgroundWeight);
    }
    .v-dialog-warning {
        color: $ui-yellow;
        background-color: mix($ui-yellow, $ui-white, $backgroundWeight);
    }
    .v-dialog-error {
        color: $ui-red;
        background-color: mix($ui-red, $ui-white, $backgroundWeight);
    }

    .v-dialog-toast-wrapper{
        position: fixed;
        width: 100%;/* 必须设置，否则内部toast的max-width失效 */
        text-align: center;
        z-index: 101; /* 比dialog高一点 */
        transition: opacity 0.3s, transform .4s, top 0.4s;
        user-select: none;
        .v-dialog-toast {
            display: inline-block;
            text-align: left;
            min-width: 130px;
            max-width: 80vw;
            font-size: 16px;
            line-height: 16px;
            padding: 20px 30px;
            border-radius: 10px;
        }
    }
</style>
