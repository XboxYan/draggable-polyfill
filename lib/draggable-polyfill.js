/**
 * @description  draggable polyfill
 * @author       XboxYan
 * @email        yanwenbin1991@live.com
 * @license      MIT
 */

/**
 * draggable polyfill
 */
(function () {
    if ("setDragImage" in window.DataTransfer.prototype) {
        var cloneObj = null;
        var startX = 0;
        var startY = 0;
        var dragbox = null;
        HTMLElement.prototype.initDraggable = function () {
            this.init = true;
            this.addEventListener('dragstart', function (ev) {
                dragbox = this;
                var img = new Image();
                img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
                ev.dataTransfer.setDragImage(img, 0, 0);
                var rect = this.getBoundingClientRect();
                var left = rect.left;
                var top = rect.top;
                startX = ev.clientX - left;
                startY = ev.clientY - top;
                ev.dataTransfer.setData('dragData', JSON.stringify({
                    id:this.id,
                    offsetX:startX,
                    offsetY:startY,
                }));
                //ev.dataTransfer.effectAllowed = 'none';
                this.style.transition = 'none';
                cloneObj = this.cloneNode(true);
                document.body.appendChild(cloneObj);
                cloneObj.setAttribute('dragging', '');
                cloneObj.style = 'position:fixed;left:0;top:0;box-sizing:border-box;margin:0;width:' + this.offsetWidth + 'px;height:' + this.offsetHeight + 'px;z-index:999;pointer-events:none;transform:translate3d( ' + left + 'px ,' + top + 'px,0);transition:none';
            })
            this.addEventListener('dragend', function (ev) {
                if(cloneObj){
                    var rect = this.getBoundingClientRect();
                    var left = rect.left;
                    var top = rect.top;
                    var reset = cloneObj.animate(
                        [
                            { transform: cloneObj.style.transform},
                            { transform: 'translate3d('+left+'px,'+top+'px,0)' }
                        ],
                        {
                            duration: 150,
                            easing:"ease-in-out",
                        }
                    )
                    reset.onfinish = function(){
                        document.body.removeChild(cloneObj);
                        cloneObj = null;
                        dragbox.style.visibility = 'visible';
                    }
                }
            })
        };

        HTMLElement.prototype.initDrop = function () {
            this.init = true;
            let elemetnNode = null;
            this.addEventListener('dragover', function(ev) {
                ev.preventDefault();
            })
            this.addEventListener('drop', function(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                this.removeAttribute('over');
            })
            this.addEventListener('dragleave', function(ev) {
                ev.stopPropagation();
                if(elemetnNode===ev.target){
                    this.removeAttribute('over');
                }
            })
            this.addEventListener('dragenter', function(ev) {
                ev.stopPropagation();
                elemetnNode = ev.target;
                this.setAttribute('over','');
            })
        }

        document.addEventListener('dragover', function (ev) {
            if (cloneObj) {
                dragbox.style.visibility = 'hidden';
                cloneObj.style.transform = 'translate3d( ' + ~~(ev.clientX - startX) + 'px ,' + ~~(ev.clientY - startY) + 'px,0)';
            }
        })

        var observer = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutation) {
                var target = mutation.target;
                switch (mutation.type) {
                    case 'childList':
                        target.querySelectorAll(':scope [draggable=true],img').forEach(function(el){
                            if(!el.init){
                                el.initDraggable();
                            }
                        });
                        target.querySelectorAll(':scope [allowdrop]').forEach(function(el){
                            if(!el.init){
                                el.initDrop();
                            }
                        });
                        break;
                    default:
                        break;
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
})();
