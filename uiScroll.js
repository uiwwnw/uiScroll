; (function () {
    var root = this;
    var uiScroll;
   
    uiScroll = (function (e, opt) {
        var makeDom = false;
        var binding = false;
        var util;
        var handle;
        var dom;
        var option = {
            'class-innerWrap': 'uiScrollWrap',
            'smooth': true,
            'body-scroll': true,
            'scroll-x': false,
            'scroll-y': true
        };

        for(var i in opt) {
            option[i] = opt[i];
        };

        util = {
            done: function(e, u) {
                // console.log(u.yv);
                function _() {
                    e.setAttribute('style', 'transform: translate(' + u.ix + 'px, ' + Number(u.iy + u.vy) + 'px);');
                    
                    if (u.iy > 0 || u.iy - u.wh < -u.h) {
                        u.iy = Math.floor(u.iy - (u.iy / 10));
                        requestAnimationFrame(_);
                    } else if (u.vy !== 0) {
                        requestAnimationFrame(_);
                    };
                    
                }
                requestAnimationFrame(_);
            },
            ing: function(e, u) {
                u.vx = u.sx - u.ex;
                u.vy = u.sy - u.ey;
                function _(){
                    if (u.vy !== 0) {
                        var f = 1;
                        if (u.vy < 0) {
                            f = -1;
                        }
                        u.vy = Math.floor(Math.abs(u.vy) - (Math.abs(u.vy) / 50));
                        console.log(u.vy);
                        u.vy *= f;
                        requestAnimationFrame(_);
                    }
                };
                e.setAttribute('style', 'transform: translate(' + u.ix + 'px, ' + u.iy + 'px);');
                requestAnimationFrame(_);
            }
        };

        handle = (function () {
            var start;
            var drag;
            var end;
            var u = {};
            u.sx = 0;
            u.sy = 0;
            u.ix = 0;
            u.iy = 0;
            u.ex = 0;
            u.ey = 0;

            start = function (e) {
                (option['scroll-x']) && (u.sx = e.touches[0].screenX, u.fx = e.touches[0].screenX - u.ix, u.w = e.target.offsetWidth, u.ww = e.path[1].offsetWidth);
                (option['scroll-y']) && (u.sy = e.touches[0].screenY, u.fy = e.touches[0].screenY - u.iy, u.h = e.target.offsetHeight, u.wh = e.path[1].offsetHeight);
            }

            drag = function (e) {
                if (binding) 
                (option['scroll-x']) && (u.ix = e.touches[0].screenX - u.fx, u.ex = e.touches[0].screenX);
                (option['scroll-y']) && (u.iy = e.touches[0].screenY - u.fy, u.ey = e.touches[0].screenY);
                util.ing(this, u);
            }
            end = function(e){
                // (option['scroll-x']) && (u.xv = u.sx - u.ex);
                // (option['scroll-y']) && (u.yv = u.sy - u.ey);
                util.done(this, u);
            }

            return {
                start: start,
                drag: drag,
                end: end
            }
        }());

        dom = (function () {
            var el = document.querySelectorAll(e);
            var length = el.length;
            if (length === 0) return false;
            //option
            (!option["body-scroll"]) && (document.querySelector('html').setAttribute('style', 'overflow: hidden'));

            for (var i = 0; i < length; i++) {
                var innerWrap = document.createElement('div');
                var innerHtml = el[i].innerHTML;
                innerWrap.setAttribute('class', option['class-innerWrap']);
                innerWrap.setAttribute('style', 'position: absolute; top:0;');
                innerWrap.innerHTML = innerHtml;
                el[i].setAttribute('style', 'overflow: hidden; position:relative;');
                el[i].innerHTML = '';
                el[i].appendChild(innerWrap);
                innerWrap.ontouchstart = handle.start;
                innerWrap.ontouchmove = handle.drag;
                innerWrap.ontouchend = handle.end;
            }
            makeDom = true;
            binding = true;
        });

        var toggle = function(){
            binding=!binding;
        }

        var init = (function() {
            dom();
        }());

        return {
            handle: handle,
            dom: dom,
            toggle: toggle
        }
    });

    if(typeof exports !== 'undefined') {
        uiScroll = exports;
    } else {
        root.uiScroll = uiScroll;
    };
}());