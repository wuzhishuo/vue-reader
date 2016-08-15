<template>
    <div id="app">
        <reader-header></reader-header>
        <reader></reader>
        <reader-footer></reader-footer>
    </div>
</template>

<script> 
    import Reader from './components/Reader.vue'
    import ReaderHeader from './components/TopToolbar.vue'
    import ReaderFooter from './components/BottomToolbar.vue'

    export default {
        components: {
            Reader,
            ReaderHeader,
            ReaderFooter
        }
    }
</script>

<style>
    body {
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
</style>