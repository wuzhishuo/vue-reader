<template>
    <div>
        <div :style="{color: customStyle.color,backgroundColor: customStyle.backgroundColor, fontSize: customStyle.fontSize + 'px' }">
            <div v-for="chapter in chapters" class="reader-content">
                <h4 class="chapter-title">{{chapter.title}}</h4>
                <p class="chapter-content" v-for="content in chapter.contents">{{content}}</p>
            </div>
        </div>
        <div class="loading" v-show="isLoading">正在加载中...</div>
    </div>
</template>

<script>
    export default {
        props: ['chapters','customStyle',"isLoading"]
    }
</script>

<style lang="sass">
    .reader-content {
        padding: 10px;
        max-width: 880px;
        margin: 0 auto;
        padding-bottom: 50px;

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

    .loading {
        font-size: 13px;
        text-align: center;
        color: #999;
        height: 20px;
        margin-top: -35px;
        line-height: 20px;
    }
</style>