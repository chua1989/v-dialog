<template>
    <div v-if="visible" class="mask" :style="{zIndex: zIndex}">
        <div class="dialog">
            <div class="head" :style="{ backgroundColor: themeColor}">
                <div class="title">{{title}}</div>
                <slot name="header"></slot>
                <icon class="close" name="icon-x" @click="handleClose"></icon>
            </div>
            <div class="body">
                <slot name="body"></slot>
                <div class="content">{{msg}}</div>
            </div>
            <div class="foot">
                <slot name="foot"></slot>
                <input v-if="hasNo"
                       class="no"
                       :value="noText"
                       type="button"
                       @click="handleNo" >
                <input v-if="hasYes"
                       class="yes"
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
    name: 'tops-dialog',
    props: {
        title: {
            type: String,
            default: '消息提示'
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
        },
        isShow: {
            type: Boolean,
            default: false
        },
        // 主题颜色
        themeColor: {
            type: String,
            default: '#409eff'
        },
        zIndex: {
            type: Number,
            default: 100
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
        },
        handleNo() {
            this.visible = false;
            this.onNo();
        },
        handleYes() {
            this.visible = false;
            this.onYes();
        }
    }
}
</script>

<style lang="scss" scoped>
    .mask{
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
    .dialog{
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        width: 480px;
        border-radius: 12px;
        background-color: #fff;
        color: #646464;
        overflow: hidden;
        .head{
            width: 100%;
            height: 50px;
            padding: 14px 27px;
            color: #fff;
            font-size: 20px;
            text-align: left;
            box-sizing: border-box;
            &:before,
            &:after{
                display: block;
                content: '';
                clear: both;
            }
            .title{
                float: left;
                display: inline-block;
                font-size: 20px;
                line-height: 20px;
            }
            .close{
                float: right;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
            }
        }
        .body{
            font-size: 0;
            padding: 52px 27px;
            text-align: left;
            border-bottom: 02px solid #F1F1F1;
            .content{
                display: inline-block;
                white-space: pre-wrap;
                text-align: left;
                font-size: 16px;
            }
        }
        .foot{
            height: 70px;
            box-sizing: border-box;
            font-size: 0;
            padding: 15px 25px 15px 0;
            text-align: right;
            .no,
            .yes{
                padding: 10px 44px ;
                font-size: 16px;
                cursor: pointer;
                height: auto;
                text-indent: 0;
                border-radius: 20px;
                line-height: 16px;
                border: 2px solid transparent;
            }
            .no{
                padding: 10px 44px ;
                display: inline-block;
                box-sizing: border-box;
                margin-right: 20px;
                color: #646464;
                background: #fff;
                overflow: hidden;
                border: 02px solid #eee;
                &:hover{
                    border-color: #ddd;
                }
            }
            .yes{
                display: inline-block;
                color: #fff;
                overflow: hidden;
                &:hover{
                    opacity: .7;
                }
            }
        }
    }
</style>
