<template>
    <div class="reader-header">
        <a href="javascript:void(0)" class="reader-back">
            <span class="back-icon"></span>返回
        </a>
        <a href="javascript:void(0)" class="reader-more"></a>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .reader-header {
        position: absolute;
        top: 0;
        height: 50px;
        width: 100%;
        line-height: 50px;
        color: #fff;
        background: rgba(0,0,0,.9);
        font-size: 13px;
        z-index: 99999;
    }

    .reader-back, .reader-more {
        position: absolute;
        color: inherit;
        text-decoration: none;
    }

    .reader-back {
        left: 15px;
    }

    .back-icon {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        background: url('../assets/back.png');
        background-repeat: no-repeat;
        background-size: contain;
        vertical-align: middle;
    }

    .reader-more {
        right: 15px;
    }

    .reader-more::after {
        content: '';
        display: block;
        width: 24px;
        height: 6px;
        margin-top: 22px;
        background: url('../assets/more.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>