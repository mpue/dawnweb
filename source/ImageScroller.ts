
import * as $ from "jquery";

export module Dawn {

    export class ImageScroller {

        private _imgDiv = $('<div id="scroller" class="scroller"></div>');
        private _images : JQuery[] = [];

        private _requestID : number = undefined;
        private _startTime : number = 0;
        private _currentTime : number = 0;

        private _mouseDownTime : number = 0;
        private _mouseUpTime : number = 0;

        private _startX = 0;
        private _startY = 0;
        private _endX = 0;
        private _offsetX = 0;           
        private _offsetY = 0;

        private _offset : number = 0;

        private _velocity : number = 0.1;
        
        private _mouseDown : boolean = false;

        constructor() {
            document.documentElement.style.overflow = "hidden";
            $("body").append(this._imgDiv);

            this._initListeners();
            
        }

        private _initListeners() {
            this._imgDiv.on("mousedown touchstart",(event) =>{
                this.stopAnimation();
                this._mouseDown = true;
                this._startX = event.clientX;
                this._startY = event.clientY;
                this._offsetX = document.getElementById('scroller').offsetLeft;
                this._offsetY = document.getElementById('scroller').offsetTop;
                event.preventDefault();
                event.stopPropagation();
                this._mouseDownTime = Date.now();
            });
            this._imgDiv.on("mouseup", (event) => {
                this._mouseDown = false;
                event.preventDefault();
                event.stopPropagation();
                this._mouseUpTime = Date.now();
                this._endX = event.clientX;
                this._velocity = -(this._endX - this._startX) / Math.abs(this._mouseDownTime - this._mouseUpTime);
                console.log(this._velocity);
                this.animate();
                this._currentTime = Date.now();
                this._startTime = this._currentTime;
            });

            
            this._imgDiv.on("mousemove", (event)=> {
                if (this._mouseDown) {

                    let width = $(window).width();
                    let left = this._offsetX + event.clientX - this._startX;

                    if (Math.abs(left) + width > this._images[0].width()) {
                        left = -(this._images[0].width() - width); 
                    }
                    if (left > 0) {
                        left = 0 ;
                    }

                    this._imgDiv.css("left", left + 'px');
                    // this._imgDiv.css("top", (this._offsetY + event.clientY - this._startY) + 'px');
                    //this._startY = 0;
                    this._offset = left;
                    event.preventDefault();
                    event.stopPropagation();
                }
            
            });
        

        }

        public addImage(image : string) {
            
            let img = $('<image id="rain' + this._images.length + 1 +'" src="'+image+'"/>'); 
            this._imgDiv.append(img);
            this._images.push(img);
            img.css("height", $(window).height());
        }

        public render(time : number) {
  
    
            
            let width = $(window).width();
            if (Math.abs(this._offset) + width > this._images[0].width()) {
                this._offset = -(this._images[0].width() - width); 
            }
            if (this._offset > 0) {
                this._offset = 0 ;
            }

            console.log(this._offset);

            this._offset-= this._velocity * 10;

            this._imgDiv.css("left", this._offset + "px");
        }
        
        public animate () {
            
            
            if (this._startTime === 0) {
                this._startTime = this._currentTime;
            }
            this.render(this._currentTime); 
            this._requestID = requestAnimationFrame(() => {
                this.animate();
            });
        }
        
        public stopAnimation () {
            if (this._requestID) {
                cancelAnimationFrame(this._requestID);
                this._requestID = undefined;
            } 
        }


    }



}