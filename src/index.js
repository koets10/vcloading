
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vcloading = factory());
}(this, function() {
    'use strict';

    var vcData = {
        intval: 0,
        count: 0,
        animation: 0,
        opacity: 0
    };

    var setStyle = function(el, styleObj) {
        for (var key in styleObj) {
            el['style'][key] = styleObj[key];
        }
    };

    var prefixes = ['-moz-', '-ms-', '-webkit-', ''];
    var prefixStyle = function (key, value) {
        var len = prefixes.length;
        var result = {};
        for (var i = 0; i < len; i++) {
            result[prefixes[i] + key] = value;
        }
        return result;
    };

    var wrapper = document.createElement('div');
    var container = document.createElement('div');
    setStyle(container, {
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 10,
        left: 0
    });
    var bar = document.createElement('div');
    setStyle(bar, {
        height: '3px',
        'background-color': '#c00',
        width: '0%'
    });
    setStyle(bar, prefixStyle('box-shadow', '0 0 20px 0 #c00'));
    container.appendChild(bar);

    var animate = function (fn, time) {
        if (vcData.animation !== undefined) { clearTimeout(vcData.animation); }
        vcData.animation = setTimeout(fn, time);
    };

    var syncStyle = function () {
        bar.style.width = vcData.count + '%';
        bar.style.opacity = vcData.opacity;
    };

    var setCount = function (count) {
        vcData.count = count;
        syncStyle();
    };

    var setOpacity = function (opacity) {
        vcData.opacity = opacity;
        syncStyle();
    };

    var show = function() {
        animate(function () {
            setOpacity(1);
        }, 100);
    };

    var hide = function() {
        setOpacity(0);
        animate(function () {
            setCount(0);
            animate(function () {
                show();
            }, 500)
        }, 500)
    };

    var inserted = false;
    var isNaN = window.isNaN || Number.isNaN;
    return {
        start: function (options) {
            options = options || {};
            if (!inserted) {
                if (document.readyState === 'complete') {
                    document.body.appendChild(container);
                } else {
                    container.id = 'vcloading';
                    bar.id = 'vcloading-bar';
                    wrapper.appendChild(container);
                    document.write(wrapper.innerHTML);
                    container = document.getElementById('vcloading');
                    bar = document.getElementById('vcloading-bar');
                }
                inserted = true;
            }
            if (options.barColor) {
                bar.style.backgroundColor = options.barColor;
                setStyle(bar, prefixStyle('box-shadow', '0 0 20px 0 ' + options.barColor));
            }
            if (options.zIndex) {
                container.style.zIndex = options.zIndex;
            }
            show();
            clearInterval(vcData.intval);
            vcData.intval = setInterval(
                function() {
                    if (isNaN(vcData.count)) {
                        clearInterval(vcData.intval);
                        setCount(0);
                        hide();
                    } else {
                        vcData.remaining = 100 - vcData.count;
                        setCount(vcData.count + 0.15 * Math.pow(1 - Math.sqrt(vcData.remaining), 2));
                    }
                },
                200
            );
        },
        complete: function () {
            setCount(100);
            clearInterval(vcData.intval);
            setTimeout(function () {
                hide();
                setTimeout(function () {
                    setCount(0);
                }, 500);
            }, 1000);
        }
    }
}));
