<template>
    <div v-if="visible" class="v-dialog-h5-mask" :style="{zIndex: zIndex}">
        <div class="v-dialog-h5-dialog">
            <div class="v-dialog-h5-head">
                <slot name="header"></slot>
                <icon class="v-dialog-h5-close" name="icon-x" @click="handleClose"></icon>
            </div>
            <div class="v-dialog-h5-body">
                <div class="v-dialog-h5-content">{{msg}}</div>
                <slot name="body"></slot>
            </div>
            <div class="v-dialog-h5-foot">
                <slot name="foot"></slot>
                <input v-if="hasNo"
                       class="v-dialog-h5-no"
                       :value="noText"
                       type="button"
                       @click="handleNo" >
                <input v-if="hasYes"
                       class="v-dialog-h5-yes"
                       :style="{
                           backgroundColor: themeColor,
                           borderColor: themeColor
                       }"
                       :value="yesText"
                       type="button"
                       autofocus
                       @click="handleYes" >
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'v-dialog-h5',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        msg: {
            type: String,
            default: ''
        },
        hasNo: {
            type: Boolean,
            default: false
        },
        hasYes: {
            type: Boolean,
            default: true
        },
        noText: {
            type: String,
            default: '取消'
        },
        yesText: {
            type: String,
            default: '确定'
        },
        // 主题颜色
        themeColor: {
            type: String,
            default: '#409eff'
        },
        zIndex: {
            type: Number,
            default: 100
        },
        onNo: {
            type: Function,
            default: () => {}
        },
        onYes: {
            type: Function,
            default: () => {}
        },
        onClose: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            visible: this.isShow // 是否显示
        }
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
    mounted() {
        // 让“确定”按钮获焦
        this.$nextTick(() => {
            // 没有作用，待解决？？？？？？？
            // this.$refs.yesBtn.focus();
        });
    },
    methods: {
        handleClose() {
            this.visible = false;
            this.onClose();
            this.$emit('onClose')
        },
        handleNo() {
            this.visible = false;
            this.onNo();
            this.$emit('onNo')
        },
        handleYes() {
            this.visible = false;
            this.onYes();
            this.$emit('onYes')
        }
    }
}
</script>

<style lang="scss">
    .v-dialog-h5-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;

        &:after{
            content: "";
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
        }
    }
    .v-dialog-h5-dialog {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        width: 5.60rem;
        border-radius: .12rem;
        background-color: #fff;
        color: #646464;
        .v-dialog-h5-head {
            padding: .22rem .26rem;

            &:before,
            &:after{
                display: block;
                content: '';
                clear: both;
            }
            .v-dialog-h5-close {
                float: right;
                font-size: .30rem;
                color: #979797;
            }
        }
        .v-dialog-h5-body {
            font-size: 0;
            padding: .42rem .44rem .22rem;
            text-align: center;
            .v-dialog-h5-content {
                display: inline-block;
                white-space: pre-wrap;
                text-align: left;
                font-size: .36rem;
            }
        }
        .v-dialog-h5-foot {
            font-size: 0;
            padding: .40rem;
            text-align: center;
            .v-dialog-h5-no,
            .v-dialog-h5-yes {
                padding: .15rem .70rem;
                font-size: .30rem;
                cursor: pointer;
                height: auto;
                text-indent: 0;
                border: 2px solid transparent;

                outline-style: none; /*取消focus外边框 */
                -webkit-user-select: auto; /*webkit浏览器*/
                outline: none;
                -webkit-appearance: none; /*去除系统默认的样式,比如iphone上的上边框*/
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
            }
            .v-dialog-h5-no {
                display: inline-block;
                box-sizing: border-box;
                margin-right: .32rem;
                border-radius: .12rem;
                color: #646464;
                background: #FFFFFF;
                overflow: hidden;
                border: .02rem solid #F1F1F1;
            }
            .v-dialog-h5-yes {
                display: inline-block;
                border-radius: .12rem;
                color: #FFFFFF;
                overflow: hidden;
            }
        }
    }
    @media (min-width: 560px) {
        .v-dialog-h5-dialog {
            width: 4.00rem;
            .head .v-dialog-h5-close {
                font-size: .20rem;
            }
            .body .v-dialog-h5-content {
                font-size: .16rem;
            }
            .v-dialog-h5-foot {
                padding: .20rem;
                .v-dialog-h5-no,
                .v-dialog-h5-yes {
                    padding: .09rem .30rem;
                    font-size: .16rem;
                    border-radius: .08rem;
                }
            }
        }
        .no-sound-icon {
            width: 2.00rem;
        }
    }
</style>
