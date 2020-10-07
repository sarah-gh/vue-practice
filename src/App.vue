<template>
<div id="app">
    <Nav />
    <router-view />
</div>
</template>

<script>
import Nav from './components/partials/Nav.vue';
export default {
    name: 'app',
    components: {
        Nav
    }
}
</script>

<style lang="scss">
// #app {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     text-align: center;
//     color: #2c3e50;
// }

h1 {
    padding: 0;
    margin-top: 0;
}

#app {
    width: 1024px;
    margin: auto;
}

#nav {
    padding: 30px;
    text-align: center;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
