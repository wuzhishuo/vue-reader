<template>
    <div class="reader-footer">
        <div class="chapter-info-container">
            <a href="#" class="pre-chapter">上一章</a>
            <span class="chapter-info">14/100</span>
            <a href="#" class="next-chapter">下一章</a>
        </div>
        <div class="actions-footer">
            <a href="#" class="action-item action-menu">
                <span class="action-icon icon-menu"></span> 目录
            </a>
            <a href="#" class="action-item action-font">
                <span class="action-icon icon-font"></span> 字体
            </a>
            <a href="#" class="action-item action-mode">
                <span class="action-icon icon-moon"></span> 夜间
            </a>
            <a href="#" class="action-item action-download">
                <span class="action-icon icon-download"></span> 下载
            </a>
        </div>
    </div>
    <font-setting></font-setting>
</template>

<script>
    import FontSetting from './FontSetting.vue'

    export default {
        components: {
            FontSetting
        }
    }
</script>

<style lang="sass">
    .reader-footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        background: rgba(0, 0, 0, .9);
        color: #fff;
        font-size: 13px;
    }
    
    .chapter-info-container {
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid #333;

        .chapter-info {
            margin: 0 50px;
        }
        .pre-chapter,
        .next-chapter {
            position: absolute;
            width: 50px;
        }
        .pre-chapter {
            left: 15px;
        }
        .next-chapter {
            right: 15px;
        }
    }
    
    .actions-footer {
        height: 70px;
        .action-item {
            width: 25%;
            float: left;
            margin-top: 20px;
            text-align: center;
        }
        .action-icon {
            display: block;
            height: 13px;
            width: 18px;
            margin: 0 auto;
            margin-bottom: 8px;
            background-repeat: no-repeat;
            background-size: contain;
        }

        .icon-menu {
            background-image: url('../assets/menu.png');
        }

        .icon-font {
            background-image: url('../assets/font.png');
        }

        .icon-moon {
            background-image: url('../assets/moon.png');
        }

        .icon-download {
            background-image: url('../assets/download.png');
        }
    }
</style>