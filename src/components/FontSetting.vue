<template>
    <dl class="font-settings">
        <dt class="setting-name">字号</dt>
        <dd class="setting-options">
            <span class="setting-size" @click="largerFontSize">大</span>
            <span class="setting-size" @click="smallerFontSize">小</span>
        </dd>
        <dt class="setting-name">背景</dt>
        <dd class="setting-options">
            <span class="setting-background" :class="background =='1'? 'selected': ''" data-bg="1" @click="changeBackground('1')"></span>
            <span class="setting-background" :class="background =='2'? 'selected': ''" data-bg="2" @click="changeBackground('2')"></span>
            <span class="setting-background" :class="background =='3'? 'selected': ''" data-bg="3" @click="changeBackground('3')"></span>
            <span class="setting-background" :class="background =='4'? 'selected': ''" data-bg="4" @click="changeBackground('4')"></span>
            <span class="setting-background" :class="background =='5'? 'selected': ''" data-bg="5" @click="changeBackground('5')"></span>
            <span class="center-help"></span>
        </dd>
    </dl>
</template>

<script>

    export default {
        data() {
            return {
                background: '1'
            }
        },
        methods: {
            changeBackground: function(bg) {
                this.background = bg;
                this.$dispatch('backgroundColorChanged',bg);
            },

            largerFontSize: function() {
                this.$dispatch('largerFontSize');
            },
            smallerFontSize: function() {
                this.$dispatch('smallerFontSize');
            }
        }
    }
</script>

<style lang="sass">
    .font-settings {
        position: fixed;
        bottom: 70px;
        background: rgba(0,0,0,.9);
        color: #fff;
        width: 100%;
        padding-top: 15px;
    }
    
    .setting-name,.setting-options {
        height: 56px;
        line-height: 56px;
    }

    .setting-name {
        float: left;
        margin-left: 20px;
    }

    .setting-options {
        display: block;
        margin-left: 70px;
    }

    .setting-size {
        padding: 5px 40px;
        border: 1px solid #8c8c8c;
        border-radius: 16px;
        margin-right: 5px;
    }

    .setting-background {
        width: 30px;
        height: 30px;
        display: inline-block;
        border-radius: 15px;
        background: #f7eee5;
        margin-right: 10px;
    }

    .setting-background,.center-help {
        display: inline-block;
        vertical-align: middle;
    }

    .setting-background.selected{
        box-shadow: 0 0 0 2px #ff7800;
    }

    .setting-background[data-bg="1"] {
        background: #f7eee5;
    }

    .setting-background[data-bg="2"] {
        background: #e9dfc7;
    }

    .setting-background[data-bg="3"] {
        background: #a4a4a4;
    }

    .setting-background[data-bg="4"] {
        background: #cdefce;
    }

    .setting-background[data-bg="5"] {
        background: #283548;
    }
</style>