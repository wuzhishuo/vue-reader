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
                chapterTotal: 100,
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
                setTimeout(function(){

                    that.chapters.push({
                        chapter_id: that.lastChapter,
                        title: '压力的背后，正是生活的意义' + that.lastChapter,
                        contents: [
                            '我有一个朋友，出生在一个小县城。在小县城的价值观里，最好的前途当然是吃“皇粮”或当官。所以她顺从父母的意愿，考上了一所名牌大学，学政治学，又从千军万马中杀出重围，考上了某中央国家机关，当上了首都的公务员。',
                            '旁人眼中，这样的生活顺风顺水，没什么压力，她自己却觉得，每天写“切实加强”“大力推进”这类标准材料的生活，处处透着别扭。虽然她已经百般压抑，内心却总有个声音在提醒她，这不是她想要的生活，真正的生活在别处。声音有时很小，却怎么也没法忽略。于是几年后，她忍无可忍，顶着父母的压力，顺应内心，跳出别人眼中光明的生活，成为一位自由作家。',
                            '自由作家的压力是非常大的。收入不稳定，前途不明，需要跟各种编辑打交道，找活，还需要经常面对别人“你是不是找不到工作”的目光。我问她还好吗，她说很辛苦，而且经常焦虑。我问她：“那你后悔吗？”',
                            '她说：“不，再辛苦，也比以前快乐。”',
                            '《新周刊》策划过一期专题，叫作“逃离北上广”，引起了很多人的共鸣。大家都觉得在一线大城市，房价虚高，工作压力巨大，生活没一点幸福感，不如逃到二、三线城市去安放青春，过一种闲散的生活。可是没过多久，“逃离北上广”的口号变成了“逃回北上广”，因为大家发现，相比于小城市的沉闷和无聊，他们更愿意去忍受大城市的压力。你能从北京、上海地铁中拥挤的人流里看到压力，也能看到希望。',
                            '这几年，我遇到过很多人，从舒适安逸的生活中脱离出来，去勇敢地面对未知。从他们身上，我看到了，人面对压力，并非简单地趋利避害。他们身上有另一种东西，被人本主义心理学家归纳为人类“实现潜能和自我价值的冲动”。这种冲动，近乎本能，驱使着他们不断向前。而人的潜能，总是在挑战中，逐渐被发掘。',
                            '这个过程，无可避免地，伴随着压力。但他们并没有想从压力中逃开。',
                            '该怎么看待压力呢？我们以前的观点，压力是可怕的，是各种心理问题的罪魁祸首。压力会导致焦虑、抑郁、强迫、拖延、酗酒、离婚……因为所有的痛苦，都伴随着压力。而本书作者却要为压力平反，说真正有害的不是压力，而是“压力有害”的观点。作者的视角脱离开了压力的框架，谈思维模式，谈压力下的成长，谈投入、联结和人生意义。当她从生活本身来探讨压力时，总是能发现一些不一样的东西。'
                            ]
                    });
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
                },2000)
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

                this.chapters.push({
                    chapter_id: this.lastChapter,
                    title: '压力的背后，正是生活的意义' + this.lastChapter,
                    contents: [
                        '我有一个朋友，出生在一个小县城。在小县城的价值观里，最好的前途当然是吃“皇粮”或当官。所以她顺从父母的意愿，考上了一所名牌大学，学政治学，又从千军万马中杀出重围，考上了某中央国家机关，当上了首都的公务员。',
                        '旁人眼中，这样的生活顺风顺水，没什么压力，她自己却觉得，每天写“切实加强”“大力推进”这类标准材料的生活，处处透着别扭。虽然她已经百般压抑，内心却总有个声音在提醒她，这不是她想要的生活，真正的生活在别处。声音有时很小，却怎么也没法忽略。于是几年后，她忍无可忍，顶着父母的压力，顺应内心，跳出别人眼中光明的生活，成为一位自由作家。',
                        '自由作家的压力是非常大的。收入不稳定，前途不明，需要跟各种编辑打交道，找活，还需要经常面对别人“你是不是找不到工作”的目光。我问她还好吗，她说很辛苦，而且经常焦虑。我问她：“那你后悔吗？”',
                        '她说：“不，再辛苦，也比以前快乐。”',
                        '《新周刊》策划过一期专题，叫作“逃离北上广”，引起了很多人的共鸣。大家都觉得在一线大城市，房价虚高，工作压力巨大，生活没一点幸福感，不如逃到二、三线城市去安放青春，过一种闲散的生活。可是没过多久，“逃离北上广”的口号变成了“逃回北上广”，因为大家发现，相比于小城市的沉闷和无聊，他们更愿意去忍受大城市的压力。你能从北京、上海地铁中拥挤的人流里看到压力，也能看到希望。',
                        '这几年，我遇到过很多人，从舒适安逸的生活中脱离出来，去勇敢地面对未知。从他们身上，我看到了，人面对压力，并非简单地趋利避害。他们身上有另一种东西，被人本主义心理学家归纳为人类“实现潜能和自我价值的冲动”。这种冲动，近乎本能，驱使着他们不断向前。而人的潜能，总是在挑战中，逐渐被发掘。',
                        '这个过程，无可避免地，伴随着压力。但他们并没有想从压力中逃开。',
                        '该怎么看待压力呢？我们以前的观点，压力是可怕的，是各种心理问题的罪魁祸首。压力会导致焦虑、抑郁、强迫、拖延、酗酒、离婚……因为所有的痛苦，都伴随着压力。而本书作者却要为压力平反，说真正有害的不是压力，而是“压力有害”的观点。作者的视角脱离开了压力的框架，谈思维模式，谈压力下的成长，谈投入、联结和人生意义。当她从生活本身来探讨压力时，总是能发现一些不一样的东西。'
                        ]
                });

                this.readingChapter = this.lastChapter;
                localStorage.setItem('reading_chapter', this.readingChapter);

                var that = this;
                Vue.nextTick(function(){
                    if(that.readerScroll) {
                        that.readerScroll.refresh();
                        that.readerScroll.scrollTo(0,0);
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