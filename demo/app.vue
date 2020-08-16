<template>
    <div id="app">
        <h2>demos</h2>
        <h3>dialog</h3>
        <router-link to="/dialog/basic">dialog basic</router-link><br>
        <router-link to="/dialog/html-com">dialog vue components</router-link>
        <br>
        <h3>toast</h3>
        <router-link to="/toast/basic">toast basic</router-link><br>
        <router-link to="/toast/only-one">toast only one</router-link>
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
