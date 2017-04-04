'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.threeD
 * @description
 * # threeD
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('threeD', ['$rootScope', '$q', 'creation', function ($rootScope, $q, creation) {

    var scope = this;

    scope.engine = null;
    scope.scene = null;
    scope.camera = null;
    scope.canvas = null;
    scope.models = [];
    scope.preview2D = null;
    scope.watermark = "Costume généré avec l'application DesignMyHero";

    scope.initialize = function(canvas)
    {
        scope.canvas = canvas;
        scope.engine = new BABYLON.Engine(canvas, true);
    };

    scope.createScene = function() {
        // create a basic BJS Scene object
        scope.scene = new BABYLON.Scene(scope.engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        // scope.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-12), scope.scene);
        scope.camera = new BABYLON.ArcRotateCamera("camera1", 0, 5.0, 12, new BABYLON.Vector3(0, 10, 0), scope.scene);
        scope.camera.setTarget(new BABYLON.Vector3(0, 3, 0));
        scope.camera.upperRadiusLimit = 20;
        scope.camera.lowerRadiusLimit = 5;

        // attach the camera to the canvas
        scope.camera.attachControl(scope.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scope.scene);

        // Move the light with the camera
        scope.scene.registerBeforeRender(function () {
            light.position = scope.camera.position;
        });

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scope.scene);

        // scope.scene.clearColor = new BABYLON.Color4(0,0,0,0.-1);

        //http://stackoverflow.com/questions/29671689/how-to-select-one-mesh-and-not-all-the-mesh-clicked-in-babylonjs
        // var mat = new BABYLON.StandardMaterial("mat", scope.scene);
        // mat.diffuseColor = BABYLON.Color3.Blue();
        //
        // scope.scene.onPointerMove = function (evt, pickingInfo) {
        //     //pickingInfo doesn'T work for some reason, must debug!
        //     var pickResult = scope.scene.pick(scope.scene.pointerX, scope.scene.pointerY);
        //     scope.scene.meshes.forEach(function (m) {
        //         m.material = null;
        //     });
        //     if (pickResult.pickedMesh) {
        //         pickResult.pickedMesh.material = mat;
        //     }
        // };

        // return the created scene
        return scope.scene;
    };

    scope.render = function (){
        scope.engine.runRenderLoop(function(){
            scope.scene.render();
            scope.scene.activeCamera.alpha += .001;
        });
    };

    scope.resize = function()
    {
        window.addEventListener('resize', function(){
        scope.engine.resize();
        });
    };

    $rootScope.$on('show-model', function (event, model) {
        var loader = new BABYLON.AssetsManager(scope.scene);
        // var newMesh = loader.addMeshTask("", "", "", model._links.model.href);

        BABYLON.SceneLoader.ImportMesh("", "", model._links.model.href, scope.scene, function (newMeshes, particleSystems) {
            var element = {};

            scope.removeModel(model.category.name);

            element.product = model;
            element.meshes = newMeshes[0];
            scope.models.push(element);
            creation.currentCreation.products.push(model.id);

            console.log(scope.models);
            console.log(creation.currentCreation);
        });
    });

    scope.removeModel = function(type){

        scope.models.forEach(function (element, index, array) {
            console.log(element);
            if(element.product.category.name == type)
            {
                element.meshes.dispose();
                array.splice(index, 1);
                creation.currentCreation.products.splice(index, 1);
            }
        });
    };

    scope.toBlob = function () {
        if (scope.canvas.toBlob) {
            scope.canvas.toBlob(
                function (blob) {
                    scope.preview2D = window.URL.createObjectURL(blob)  ;
                    console.log(blob);
                    // Do something with the blob object,
                    // e.g. creating a multipart form for file uploads:
                    // var formData = new FormData();
                    // formData.append('file', blob, fileName);
                    /* ... */
                },
                'image/png'
            );
        }
    };

    scope.createScreenshot3D = function (engine, size, callback, camera) {
        var camera = camera || new BABYLON.ArcRotateCamera("screenshot", 0, 0, 0, new BABYLON.Vector3(0, 2, 0), scope.scene);
        camera.setPosition(new BABYLON.Vector3(0, 3, -7));

            engine.scenes[0].activeCamera = camera;

            var size = size || {
                    width: 512,
                    height: 512
                };

            // this.engine.shadowGenerator.getShadowMap().render();
            var texture = new BABYLON.RenderTargetTexture("screenShot", size, scope.engine.scenes[0], true, false);
            texture.renderList = scope.engine.scenes[0].meshes;
            texture.onAfterRender = function() {
                // Read the contents of the framebuffer
                var numberOfChannelsByLine = size.width * 4;
                var halfHeight = size.height / 2;
                //Reading datas from WebGL
                var data = scope.engine.readPixels(0, 0, size.width, size.height);

                for (var i = 0; i < halfHeight; i++) {
                    for (var j = 0; j < numberOfChannelsByLine; j++) {
                        var currentCell = j + i * numberOfChannelsByLine;
                        var targetLine = size.height - i - 1;
                        var targetCell = j + targetLine * numberOfChannelsByLine;

                        var temp = data[currentCell];
                        data[currentCell] = data[targetCell];
                        data[targetCell] = temp;
                    }
                }

                // Create a temporary canvas to draw the result using the pixel array.
                this.tempCanvas = this.tempCanvas || document.createElement("canvas");
                this.tempCanvas.width = size.width;
                this.tempCanvas.height = size.height;

                var context = this.tempCanvas.getContext("2d");
                var imageData = context.createImageData(size.width, size.height);
                imageData.data.set(data);
                context.putImageData(imageData, 0, 0);

                // WATERMARK
                context.fillStyle = "rgba(183, 72, 72, 1)";
                context.font = "20px Arial";
                context.fillText(scope.watermark, 40, size.height - 20);

                //WATERMARK LOGO
                var img = document.getElementById("logo-nav");
                context.drawImage(img, 20, 20, 50,50);

                // Finally create the canvas used has image.
                var ssCanvas = document.createElement("canvas");
                ssCanvas.width = size.width;
                ssCanvas.height = size.height;

                var ssContext = ssCanvas.getContext("2d");
                ssContext.drawImage(this.tempCanvas, 0, 0, size.width, size.height);

                callback(ssCanvas);
            }.bind(this);

            engine.scenes[0].incrementRenderId();

            texture.render(true);
            texture.dispose();

            texture = null;

            engine.scenes[0].activeCamera = scope.camera;
    };

    scope.getScreenshotURL = function () {
        var deffered = $q.defer();

       scope.createScreenshot3D(scope.engine, null, function(ssCanvas) {
            scope.screenshot = ssCanvas.toDataURL();
            // document.getElementById('preview2D').src = scope.screenshot;
           deffered.resolve(scope.screenshot);
        }.bind(scope));

        return deffered.promise;
    };

}]);
