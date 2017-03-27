'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.threeD
 * @description
 * # threeD
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('threeD', function () {

    var scope = this;

    scope.engine = null;
    scope.scene = null;
    scope.camera = null;
    scope.canvas = null;

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
        scope.camera.setTarget(new BABYLON.Vector3(0, 3, 0))

        // attach the camera to the canvas
        scope.camera.attachControl(scope.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scope.scene);

        BABYLON.SceneLoader.ImportMesh("cape", "models/", "test.babylon", scope.scene, function (newMeshes, particleSystems) {
            newMeshes.position.y = 12;
            console.log(newMeshes);
            console.log(particleSystems);
        });

        BABYLON.SceneLoader.ImportMesh("casque", "models/", "pilote2.babylon", scope.scene, function (newMeshes, particleSystems) {
            console.log(newMeshes);
            console.log(particleSystems);
        });


        // move the sphere upward 1/2 of its height
        // sphere.position.y = 1;

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scope.scene);

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

  });
