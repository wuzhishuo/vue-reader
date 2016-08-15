<template>
    <dl class="font-settings">
        <dt class="setting-name">字号</dt>
        <dd class="setting-options">
            <span class="setting-size">大</span>
            <span class="setting-size">小</span>
        </dd>
        <dt class="setting-name">背景</dt>
        <dd class="setting-options">
            <span class="setting-background"></span>
            <span class="setting-background"></span>
            <span class="setting-background"></span>
            <span class="setting-background"></span>
            <span class="setting-background"></span>
            <span class="center-help"></span>
        </dd>
    </dl>
</template>

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

    .setting-background:first-child {
        box-shadow: 0 0 0 2px #ff7800;
    }
</style>