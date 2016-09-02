import Vue from 'vue'
import Mocha from 'mocha'
import chai from 'chai'
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
import BottomToolbar from '../../../src/components/BottomToolbar.vue'
chai.use(sinonChai);
var expect = chai.expect;

describe('BottomToolbar',function(){
    var vm;
    before(function(){
        vm = new Vue({
            template: '<div><bottom-toolbar v-ref:component :mode="mode" :reading-chapter="readingChapter" :mode="mode" :chapter-total="chapterTotal" selected-background="selectedBackground"></bottom-tool-bar></div>',
            components: {BottomToolbar},
            data: {
                mode: 'day',
                readingChapter: 1,
                chapterTotal: 100,
                selectedBackground: '1'

            }
        }).$mount();
    })

    it('should show the correct chapter info',function(){
        expect(vm.$el.querySelector('.chapter-info').textContent).to.equal('1/100')
    })

    it('should dispath "requestNextChapter" when you click "下一章"',function(){
        const component = vm.$refs.component;

        let spy = sinon.spy();
        vm.$on('requestNextChapter',spy);

        component.getNextChapter();

        expect(spy).to.have.been.called;

    })

    it('should dispath "requestPreChapter" when you click "上一章"',function(){
        const component = vm.$refs.component;

        let spy = sinon.spy();
        vm.$on('requestPreChapter',spy);
        
        component.getPreChapter();

        expect(spy).to.have.been.called;
    })

    it('should set "showFontSetting" from false to true when you trigger method showFontSettings',function(){
        const component = vm.$refs.component;
        component.showFontSetting = false;

        component.showFontSettings();

        expect(component.showFontSetting).to.be.true;
    })

    it('should set "showFontSetting" from true to false when you trigger method showFontSettings',function(){
        const component = vm.$refs.component;
        component.showFontSetting = true;

        component.showFontSettings();

        expect(component.showFontSetting).to.be.false;
    })

    it('should dispath "modeTriggered" when click "白天" or "夜间"',function(){
        const component = vm.$refs.component;
        
        let spy = sinon.spy();
        vm.$on('modeTriggered',spy);
        component.changeMode();

        expect(spy).to.have.been.called;
    })

    it('should set "showFontSetting" to false when receive event "toolbarTriggered"',function(){
        const component = vm.$refs.component;

        vm.$broadcast('toolbarTriggered');

        expect(component.showFontSetting).to.be.false;
    })

});