<template>
    <div id="app" :style="{backgroundColor: readerStyle.backgroundColor}">
        <reader :chapters="chapters" :custom-style="readerStyle" :is-loading="isLoading"></reader>
        <reader-header v-show="showToolbar"></reader-header>
        <reader-footer v-show="showToolbar" :mode="mode" :chapter-total="chapterTotal" :reading-chapter="readingChapter" :selected-background="selectedBackground"></reader-footer>
        <div class="toolbar-trigger" @click="triggerToolbar"></div>
    </div>
</template>

<script> 
    import Vue from 'vue'
    import Reader from './components/Reader.vue'
    import ReaderHeader from './components/TopToolbar.vue'
    import ReaderFooter from './components/BottomToolbar.vue'

    var IScroll = require('IScroll');

    const Background = {
        '1': {
            bg: '#f7eee5',
            color: '#333'
        },
        '2': {
            bg: '#e9dfc7',
            color: '#333'
        },
        '3': {
            bg: '#a4a4a4',
            color: '#333'
        },
        '4': {
            bg: '#cdefce',
            color: '#333'
        },
        '5': {
            bg: '#283548',
            color: '#7685a2'
        },
        'night': {
            bg: '#0f1410',
            color: '#4e534f'
        }
    }

    const largestFontSize = 20;
    var defaultMode = localStorage.getItem('mode') ? localStorage.getItem('mode') : 'day';
    var selectedBackground = localStorage.getItem('background')? localStorage.getItem('background') : '1';

    var defaultBackground;
    if(defaultMode === 'day') {
       defaultBackground = selectedBackground;
    } else {
        defaultBackground = 'night';
    }

    var defaultFontSize = localStorage.getItem('font_size')? localStorage.getItem('font_size'): 14;
    var readingChapter = localStorage.getItem('reading_chapter')? parseInt(localStorage.getItem('reading_chapter')): 1;

    export default {
        data() {
            return {
                showToolbar: false,
                chapters: [],
                chapterTotal: 5,
                readingChapter: readingChapter,
                lastChapter: readingChapter-1, //目前取到的最大章节
                readerStyle: {
                    backgroundColor: Background[defaultBackground].bg,
                    fontSize: defaultFontSize,
                    color: Background[defaultBackground].color
                },
                selectedBackground: selectedBackground,
                mode: defaultMode,
                readerScroll: null,
                isLoading: false
            }
        },
        ready: function() {
            this.readerScroll = new IScroll('#app',{
                mouseWheel: true
            });

            this.getNextChapter(true);
     
            var that = this;
            this.readerScroll.on('scrollEnd',function(){
                if(this.y <= (this.maxScrollY + 50)){
                    that.getNextChapter();                    
                }
            });
        },
        methods: {
            triggerToolbar: function() {
                this.showToolbar = !this.showToolbar;
                this.$broadcast('toolbarTriggered');
            },
            getNextChapter: function(isClearCache) {
                if(this.isLoading) {
                    return;
                }
                if(this.lastChapter === this.chapterTotal) {
                    return;
                }

                this.isLoading = true;

                this.lastChapter += 1;

                if(isClearCache) {
                    this.chapters.length = 0;
                } 

                var that = this;

                fetch('/api/chapters/' + this.lastChapter)
                .then(function(response){
                    if(response.ok) {
                        response.json().then(function(data){
                            that.chapters.push(data);
                            that.readingChapter = that.lastChapter;
                            localStorage.setItem('reading_chapter', that.readingChapter);
                            
                            that.isLoading = false;

                            Vue.nextTick(function(){
                                if(that.readerScroll) {
                                    var maxScrollY = that.readerScroll.maxScrollY;
                                    that.readerScroll.refresh();
                                    that.readerScroll.scrollTo(0,maxScrollY-50);
                                }
                                if(isClearCache) {
                                    that.readerScroll.scrollTo(0,0);
                                }
                            });
                        })
                    }
                });
            },
            getPreChapter: function() {
                if(this.isLoading) {
                    return;
                }

                if(this.lastChapter == 1) {
                    return;
                }

                this.lastChapter -= 1;
                this.chapters.length = 0;
                var that = this;

                fetch('/api/chapters/' + this.lastChapter)
                .then(function(response){
                    if(response.ok) {
                        response.json().then(function(data){
                            that.readingChapter = that.lastChapter;
                            localStorage.setItem('reading_chapter', that.readingChapter);

                            Vue.nextTick(function(){
                                if(that.readerScroll) {
                                    that.readerScroll.refresh();
                                    that.readerScroll.scrollTo(0,0);
                                }
                            });
                        })
                    }
                })
            }
        },
        events: {
            'largerFontSize': function() {
                if(this.readerStyle.fontSize < largestFontSize) {
                    this.readerStyle.fontSize = this.readerStyle.fontSize + 1; 
                    localStorage.setItem('font_size', this.readerStyle.fontSize);

                    var that = this;
                    Vue.nextTick(function(){
                        if(that.readerScroll) {
                            that.readerScroll.refresh();
                        }
                    });              
                }
            },
            'smallerFontSize': function() {
                this.readerStyle.fontSize = this.readerStyle.fontSize - 1;
                localStorage.setItem('font_size', this.readerStyle.fontSize);
                

                var that = this;
                Vue.nextTick(function(){ 
                    if(that.readerScroll) { 
                        that.readerScroll.refresh();
                     } 
                });
            },
            'backgroundColorChanged': function(bg) {
                if(Background[bg] && this.mode === 'day') {
                    this.readerStyle.backgroundColor = Background[bg].bg;
                    this.readerStyle.color = Background[bg].color;
                }

                this.selectedBackground = bg;
                localStorage.setItem('background',bg);
            },
            'modeTriggered': function() {
                if(this.mode === 'night') {
                    this.mode = 'day';
                    this.readerStyle.backgroundColor = Background[this.selectedBackground].bg;
                    this.readerStyle.color = Background[this.selectedBackground].color;
                } else {
                    this.mode = 'night';
                    this.readerStyle.backgroundColor = Background.night.bg;
                    this.readerStyle.color = Background.night.color;
                }

                localStorage.setItem('mode', this.mode);
            },
            'requestNextChapter': function() {
                this.getNextChapter(true);
            },
            'requestPreChapter': function() {
                this.getPreChapter();
            }
        },
        components: {
            Reader,
            ReaderHeader,
            ReaderFooter
        }
    }
</script>

<style>
    html,body,#app{
        height: 100%;
    }

    /*html,#app {
        overflow-y: scroll;
    }*/

    #app {
        position: relative;
    }

    body {
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .toolbar-trigger {
        position: absolute;
        width: 100%;
        height: 40%;
        top: 30%;
        background: transparent;
        z-index: 99999;
    }
</style>