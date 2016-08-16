<template>
    <div class="reader-footer">
        <div class="chapter-info-container">
            <a href="javascript:void(0)" class="pre-chapter">上一章</a>
            <span class="chapter-info">14/100</span>
            <a href="javascript:void(0)" class="next-chapter">下一章</a>
        </div>
        <div class="actions-footer">
            <a href="javascript:void(0)" class="action-item action-menu">
                <span class="action-icon icon-menu"></span> 目录
            </a>
            <a href="javascript:void(0)" class="action-item action-font" @click="showFontSettings">
                <span class="action-icon" :class="showFontSetting? 'icon-font-selected': 'icon-font'"></span> 字体
            </a>
            <a href="javascript:void(0)" class="action-item action-mode" @click="changeMode" v-show="mode=='day'">
                <span class="action-icon icon-moon"></span> 夜间
            </a>
            <a href="javascript:void(0)" class="action-item action-mode" @click="changeMode" v-else>
                <span class="action-icon icon-sun"></span> 白天
            </a>
            <a href="javascript:void(0)" class="action-item action-download">
                <span class="action-icon icon-download"></span> 下载
            </a>
        </div>
        <font-setting v-show="showFontSetting"></font-setting>
    </div>
</template>

<script>
    import FontSetting from './FontSetting.vue'

    export default {
        components: {
            FontSetting
        },
        props: {
            mode: String,
            default: 'day'
        },
        data() {
            return {
                showFontSetting: false
            }
        },
        methods: {
            showFontSettings: function() {
                this.showFontSetting = !this.showFontSetting;
            },
            changeMode: function() {
                this.$dispatch('modeTriggered');
            }
        },
        events: {
            'toolbarTriggered': function() {
                this.showFontSetting = false;
            }
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
            height: 15px;
            width: 22px;
            margin: 0 auto;
            margin-bottom: 8px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        .icon-menu {
            background-image: url('../assets/menu.png');
        }

        .icon-font {
            background-image: url('../assets/font.png');
        }

        .icon-font-selected {
            background-image: url('../assets/font-selected.png');
        }

        .icon-moon {
            background-image: url('../assets/moon.png');
        }

        .icon-sun {
            background-image: url('../assets/sun.png');
            width: 19px;
            height: 18px;
        }

        .icon-download {
            background-image: url('../assets/download.png');
        }
    }
</style>