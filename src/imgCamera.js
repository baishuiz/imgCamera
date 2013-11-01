;(function(){
    
    function ImagePlus(imgDom){
        if (!imgDom) {
            throw Error("nedd img Element");
            //return false;
        }
        
        var oldDuration = document.defaultView.getComputedStyle(imgDom,null)["transition"];
        imgDom.style.transition = "none";
        var imgModel = {
            width : imgDom.clientWidth,
            height : imgDom.clientHeight,
            top : imgDom.offsetTop,
            left : imgDom.offsetLeft,
            scaleX : 1,
            scaleY : 1,
            url : imgDom.getAttribute('src')
        };
        imgDom.style.transition = oldDuration;

        var STRETCH_TYPE = {
            CUT     : 2,
            AUTO    : 4,
            SCALING : 8
        };


        function wrapImg(imgElement){
            var scene = document.createElement('div');
            imgElement.parentNode.insertBefore(scene, imgElement);
            scene.appendChild(imgElement);
            scene.style.position = 'relative';
            scene.style.width = imgModel.width + "px";
            scene.style.height = imgModel.height + "px";
            scene.style.overflow = "hidden";
            return scene;
        }
        
        
        this.stretch = STRETCH_TYPE.AUTO; //默认变比填充图像
        this.picture = imgDom;
        this.scene = wrapImg(imgDom);
        

        this.setURL = function(url){
            _url =  url;
            this.picture.src = _url;
        };
        
        
        this.setSize = function(scaleX,scaleY){
            imgModel.scaleX = scaleX || imgModel.scaleX;
            imgModel.scaleY = scaleY || imgModel.scaleY;
            imgDom.style.width = imgModel.width * scaleX + "px";
            imgDom.style.height = imgModel.height * scaleY + "px";
        };
        
        
        this.translateTo = function(cameraModel){
            var img = this.picture;
            var clipStr = 'rect(' + [
                                        cameraModel.y * imgModel.scaleY + 'px',
                                        cameraModel.x * imgModel.scaleX + cameraModel.width+'px',
                                        cameraModel.y * imgModel.scaleY + cameraModel.height + 'px',
                                        cameraModel.x * imgModel.scaleX + 'px'
                                    ].join(',')+')'; 
             
            img.style.clip = clipStr;
            img.style.position = 'absolute';
            img.style.left = imgModel.left  - cameraModel.x * imgModel.scaleX +'px';
            img.style.top  = imgModel.top  - cameraModel.y * imgModel.scaleY + 'px';
          
        };
        
    }

    var getCamera = function(img){
        var camera = new ImagePlus(img);
        return camera;
    };
    window.imgCamera = getCamera;
}());


window.onload = function(){


var img = document.getElementById("img");
camera = imgCamera(img);
camera.setSize(2,2);
 camera.translateTo({x:455,y:252,width:100,height:100});
//camera.zoomTo(x,y,w,h);
//camera.zoomBy(x,y,w,h);
//camera.translateTo(x,y,w,h);
//camera.translateBy(x,y,w,h);
}