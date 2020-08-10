// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // 缩进设置
        'indent': ['error', 4, { 'SwitchCase': 1, 'ObjectExpression': "first" }],
        // 函数括号前面不需要空格
        'space-before-function-paren': ['error', 'never'],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during dev
        'no-debugger': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
        'no-control-regex': 'off',
        'no-inner-declarations': 'off',
        'no-useless-escape': 'off',
        'no-new': 'off',
        // 控制全局变量是否可以被重写
        'no-global-assign': 'error',
        // 关闭强制不写“;”
        'semi': 'off'
    },
    'globals': {
        // 全局变量需要在这里定义，true 表示可以被重写，false 表示不可以被重写
        'Vue': false,
    }
}
