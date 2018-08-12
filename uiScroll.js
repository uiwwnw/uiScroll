;(function(){
var option = {
    'class-innerWrap': 'uiScrollWrap'
};

var returnOpt = (function(opt, a){
    if(opt === undefined || opt[a] === undefined) {
        return option[a];
    } else {
        return opt[a];
    }
});

var app = (function(e, opt){
    var dom;
    var handle;

    handle = (function(){
        var start;
        var drag;
        var end;
        var speed;
        var sx = 0;
        var sy = 0;

        start = function(e){
            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;
        }

        drag = function(e){
            var x = -sx + e.touches[0].clientX;
            var y = -sy + e.touches[0].clientY;
            e.path[0].setAttribute('style', 'transform: translate(' + x + 'px, ' + y + 'px);');
        }
        end = function(){
            console.log('end');
        }

        return {
            start: start,
            drag: drag,
            end: end
        }
    }());

    dom = (function(){
        var el = document.querySelectorAll(e);
        var length = el.length;
        if(length === 0) return false;
        for(var i = 0; i < length; i++) {
            var innerWrap = document.createElement('div');
            var innerHtml = el[i].innerHTML;
            innerWrap.setAttribute('class', returnOpt(opt, 'class-innerWrap'));
            innerWrap.innerHTML = innerHtml;
            el[i].setAttribute('style', 'overflow: hidden;');
            el[i].innerHTML = '';
            el[i].appendChild(innerWrap);
            innerWrap.ontouchstart = handle.start;
            innerWrap.ontouchmove = handle.drag;
            innerWrap.ontouchend = handle.end;
        }
    }());
    
});
(window.uiScroll === undefined) && (window.uiScroll = app);
}());