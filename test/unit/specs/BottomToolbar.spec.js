import Vue from 'vue'
import BottomToolbar from '../../../src/components/BottomToolbar.vue'
// import Mocha from 'mocha'
import {expect} from 'chai'

describe('BottomToolbar',function(){
    var vm;
    before(function(){
        vm = new Vue({
            template: '<div><bottom-toolbar :mode="mode" :reading-chapter="readingChapter" :mode="mode" :chapter-total="chapterTotal" selected-background="selectedBackground"></bottom-tool-bar></div>',
            components: {BottomToolbar},
            data: {
                mode: 'day',
                readingChapter: 1,
                chapterTotal: 100,
                selectedBackground: '1'

            }
        }).$mount();
    })

    it('should have a mode prop',function(){
        expect(vm.$el.querySelector('.chapter-info').textContent).to.be.a('string')
    })
});