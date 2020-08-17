<template>
    <div class="wraper">
        <h2>h5 demos</h2>
        <h3>dialog-h5</h3>
        <router-link to="/dialog-h5/basic">dialog-h5 basic</router-link><br>
        <router-link to="/dialog-h5/html-com">dialog-h5 vue components</router-link>
        <br>
        <h3>toast-h5</h3>
        <router-link to="/toast-h5/basic">toast-h5 basic</router-link><br>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss" >
    .wraper{
        font-size: .3rem;
    }
</style>
