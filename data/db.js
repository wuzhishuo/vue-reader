var Mock = require('mockjs')

var chapters = Mock.mock({
    'chapters':[{
        'id': 1,
        'chapter_id':1,
        'title':'第001章 @ctitle(5,15)',
        'contents|10-20':['@cparagraph']
    },{
        'id': 2,
        'chapter_id':2,
        'title':'第002章 @ctitle(5,15)',
        'contents|10-20':['@cparagraph']
    },{
        'id': 3,
        'chapter_id':3,
        'title':'第003章 @ctitle(5,15)',
        'contents|10-20':['@cparagraph']
    },{
        'id': 4,
        'chapter_id':4,
        'title':'第004章 @ctitle(5,15)',
        'contents|10-20':['@cparagraph']
    },{
        'id': 5,
        'chapter_id':5,
        'title':'第005章 @ctitle(5,15)',
        'contents|10-20':['@cparagraph']
    }]
})

module.exports = function() {
    return chapters;
}