<template>
    <div class="reader-content" :style="{color: customStyle.color,backgroundColor: customStyle.backgroundColor, fontSize: customStyle.fontSize + 'px' }" v-for="chapter in chapters">
        <div>
            <h4 class="chapter-title">{{chapter.title}}</h4>
            <p class="chapter-content" v-for="content in chapter.contents">{{content}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['chapters','customStyle']
    }
</script>

<style lang="sass">
    .reader-content { 
        padding: 10px;
        font-size: 14px;
        color: #555;
        max-width: 680px;
        margin: 0 auto;
        background: #f7eee5;

        .chapter-title {
            color: #736357;
            font-size: 20px;
            line-height: 31px;
            border-bottom: 1px solid #736357;
            margin: 0 0 15px 0;
        }

        .chapter-content {
            text-indent: 2em;
            margin: 0.5em;
            letter-spacing: 2px;
            line-height: 1.5;
        }
     }		
</style>