<template>
    <div id="app">
        <h2>demos</h2>
        <router-link to="/dialog/basic">dialog basic</router-link><br>
        <router-link to="/dialog/html-com">dialog vue components</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss" module>
</style>
